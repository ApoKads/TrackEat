import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MeasurementSection from "./MeasurementSection";
import NameSection from "./NameSection";
import GoalSection from "./GoalSection";
import GenderSection from "./GenderSection";
import ProtectedRoute from "../Route/ProtectedRoute";
import ActivitySection from "./ActivitySection";
import ProgressSection from "./ProgressSection";
import ConfirmationSection from "./ConfirmationSection";
import MeasureGoalSection from "./MeasureGoalSection";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function Sections() {
  const getUserId = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.id;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  const [id] = useState(getUserId());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedSex, setSelectedSex] = useState("");
  const [Age, setAge] = useState(0);
  const [WeightOption, setWeightOption] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [ActivityOption, setActivityOption] = useState("");
  const [ProgressOption, setProgressOption] = useState("");
  const [goal, setGoal] = useState(0);
  const [dailyCalories, setDailyCalories] = useState(0);
  const navigate = useNavigate();

  const [step, setStep] = useState(0);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/user/update", {
        id,
        firstName,
        lastName,
        selectedSex,
        Age,
        WeightOption,
        weight,
        height,
        ActivityOption,
        ProgressOption,
        goal,
        dailyCalories,
      });

      console.log("Response:", response.data);
      alert("User data updated successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Failed to update user data. Please try again.");
    }
  };

  const handleNext = () => {
    if (step === 7) {
      handleSubmit();
    } else if (step === 6) {
      // Hitung kalori harian sebelum pindah ke Step 7
      calculateDailyCalories();
      setStep(step + 1);
    } else {
      // Skip Step 4 dan Step 6 jika WeightOption adalah "Maintain"
      if (WeightOption === "Maintain") {
        if (step === 3) {
          setStep(5); // Langsung ke Step 5 (ActivitySection)
        } else if (step === 5) {
          setStep(7); // Langsung ke Step 7 (ConfirmationSection)
        } else {
          setStep(step + 1);
        }
      } else {
        setStep(step + 1);
      }
    }
  };

  const handlePrev = () => {
    if (step === 0) return;
    // Skip Step 4 dan Step 6 jika WeightOption adalah "Maintain"
    if (WeightOption === "Maintain") {
      if (step === 5) {
        setStep(3); // Kembali ke Step 3 (MeasurementSection)
      } else if (step === 7) {
        setStep(5); // Kembali ke Step 5 (ActivitySection)
      } else {
        setStep(step - 1);
      }
    } else {
      setStep(step - 1);
    }
  };

  const calculateDailyCalories = () => {
    let BMR;
    if (selectedSex === "Male") {
      BMR = 66.5 + 13.7 * weight + 5 * height - 6.8 * Age;
    } else {
      BMR = 655 + 9.6 * weight + 1.8 * height - 4.7 * Age;
    }

    let activityFactor;
    switch (ActivityOption) {
      case "Passive":
        activityFactor = 1.2;
        break;
      case "Lightly Active":
        activityFactor = 1.375;
        break;
      case "Moderately Active":
        activityFactor = 1.55;
        break;
      case "Intensely Active":
        activityFactor = 1.725;
        break;
      default:
        activityFactor = 1.2;
    }
    const TDEE = BMR * activityFactor;

    let calorieAdjustment = 0;
    if (WeightOption !== "Maintain") {
      switch (ProgressOption) {
        case "0.25":
          calorieAdjustment = WeightOption === "Gain" ? 275 : -275;
          break;
        case "0.5":
          calorieAdjustment = WeightOption === "Gain" ? 550 : -550;
          break;
        default:
          calorieAdjustment = 0;
      }
    }

    const dailyCalories = TDEE + calorieAdjustment;
    setDailyCalories(dailyCalories);
  };

  useEffect(() => {
    // Jika WeightOption adalah "Maintain", set goal sama dengan weight
    if (WeightOption === "Maintain") {
      setGoal(weight);
    }
  }, [WeightOption, weight]);

  useEffect(() => {
    console.log("id: ", id);
    console.log("Name: ", firstName, lastName);
    console.log("Gender: ", selectedSex);
    console.log("Age: ", Age);
    console.log("WeightOpt: ", WeightOption);
    console.log("Weight :", weight, " Height:", height);
    console.log("ActivityOption: ", ActivityOption);
    console.log("Progress Option: ", ProgressOption);
    console.log("Goal:", goal);
    console.log("Daily Calories:", dailyCalories);
  });

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/user/info`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const userData = response.data.data;

      if (userData.first_name) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center h-[100vh]">
      {step === 0 && (
        <NameSection
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
      {step === 1 && (
        <GenderSection
          Age={Age}
          setAge={setAge}
          selectedSex={selectedSex}
          setSelectedSex={setSelectedSex}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
      {step === 2 && (
        <GoalSection
          WeightOption={WeightOption}
          setWeightOption={setWeightOption}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
      {step === 3 && (
        <MeasurementSection
          weight={weight}
          setWeight={setWeight}
          height={height}
          setHeight={setHeight}
          WeightOption={WeightOption}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
      {step === 4 && WeightOption !== "Maintain" && (
        <MeasureGoalSection
          weight={weight}
          setWeight={setWeight}
          goal={goal}
          setGoal={setGoal}
          WeightOption={WeightOption}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
      {step === 5 && (
        <ActivitySection
          ActivityOption={ActivityOption}
          setActivityOption={setActivityOption}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
      {step === 6 && WeightOption !== "Maintain" && (
        <ProgressSection
          ProgressOption={ProgressOption}
          setProgressOption={setProgressOption}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
      {step === 7 && (
        <ConfirmationSection
          onNext={handleNext}
          onPrev={handlePrev}
          dailyCalories={dailyCalories}
        />
      )}
    </div>
  );
}

export default Sections;