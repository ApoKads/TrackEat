import React,{useState,useEffect} from "react";
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
import {jwtDecode} from "jwt-decode";
function Sections()
{
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
  
    const [id] = useState(getUserId)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [selectedSex, setSelectedSex] = useState("");
    const [Age, setAge] = useState(0);
    const [WeightOption,setWeightOption] = useState("");
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [ActivityOption,setActivityOption] = useState("");
    const [ProgressOption,setProgressOption] = useState("");
    const [goal,setGoal] = useState(0);
    const navigate = useNavigate();

    const [step,setStep] = useState(0);



  const handleSubmit = async () => {
    try {
        // Kirim data ke backend, termasuk userId
        const response = await axios.post("/user/update", {
            id, // Gunakan userId yang didapat dari token
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
        });

        console.log("Response:", response.data);
        alert("User data updated successfully!");
        navigate("/home"); // Redirect setelah update sukses
    } catch (error) {
        console.error("Error updating user data:", error);
        alert("Failed to update user data. Please try again.");
    }
};
    const handleNext = () => {
      if(step===7)
        {
          handleSubmit();
          // navigate("/home");
        }
        setStep(step + 1); // Pindah ke step selanjutnya
      };

      const handlePrev = () => {
        if(step===0) return;
        setStep(step - 1); // Pindah ke step selanjutnya
      };
    useEffect(() => {
        console.log('id: ',id)
        console.log('Name: ',firstName,lastName)
        console.log('Gender: ',selectedSex)
        console.log('Age: ',Age)
        console.log('WeightOpt: ',WeightOption)
        console.log('Weight :',weight,' Height:',height);
        console.log('ActivityOption: ',ActivityOption);
        console.log('Progress Option: ',ProgressOption);
        console.log('Goal:',goal)
      });

      const fetchUserData = async () => {
        try {
          const response = await axios.get(`/user/info`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
    
          const userData = response.data.data;
    
          // Jika first_name sudah ada, redirect ke /home
          if (userData.first_name) {
            navigate("/home");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
    
      // Panggil fetchUserData saat komponen dimuat
      useEffect(() => {
        fetchUserData();
      }, []);
    
    return <div className="min-h-screen flex items-center justify-center h-[100vh]">
        {step === 0 && ( // Gunakan conditional rendering dengan operator &&
          <NameSection
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            onNext={handleNext} // Kirim fungsi handleNext ke NameSection
            onPrev={handlePrev} // Kirim fungsi handleNext ke NameSection
          />

          
        )}
        {step === 1 && ( // Contoh conditional rendering untuk step selanjutnya
          // <GenderSection/>
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
          setWeightOption = {setWeightOption}
          onNext={handleNext}
          onPrev={handlePrev}
          />
        )}

        {step === 3 && (
          <MeasurementSection
          weight ={weight}
          setWeight = {setWeight}
          height = {height}
          setHeight = {setHeight}
          WeightOption ={WeightOption}
          onNext ={handleNext}
          onPrev ={handlePrev}
          />
        )}
        {step === 4 && (
          <MeasureGoalSection
          weight ={weight}
          setWeight = {setWeight}
          goal = {goal}
          setGoal = {setGoal}
          WeightOption ={WeightOption}
          onNext ={handleNext}
          onPrev ={handlePrev}
          />
        )}

        {step === 5 && (

          <ActivitySection
          ActivityOption = {ActivityOption}
          setActivityOption = {setActivityOption}
          onNext = {handleNext}
          onPrev = {handlePrev}
        />
        )}

        {step === 6 && (
          <ProgressSection
          ProgressOption={ProgressOption}
          setProgressOption = {setProgressOption}
          onNext = {handleNext}
          onPrev = {handlePrev}
        />
        )}
        {step === 7 && (
          <ConfirmationSection
          onNext = {handleNext}
          onPrev = {handlePrev}
          />
        )}

    </div>
}

export default Sections;