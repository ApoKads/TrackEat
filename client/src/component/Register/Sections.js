import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import MeasurementSection from "./MeasurementSection";
import NameSection from "./NameSection";
import GoalSection from "./GoalSection";
import GenderSection from "./GenderSection";
import ProtectedRoute from "../ProtectedRoute";
import ActivitySection from "./ActivitySection";
import ProgressSection from "./ProgressSection";
import ConfirmationSection from "./ConfirmationSection";

function Sections()
{
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [selectedSex, setSelectedSex] = useState("");
    const [Age, setAge] = useState(0);
    const [WeightOption,setWeightOption] = useState("");
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [ActivityOption,setActivityOption] = useState("");
    const [ProgressOption,setProgressOption] = useState("");
    const navigate = useNavigate();

    const [step,setStep] = useState(0);

    const handleNext = () => {
      if(step===6)navigate("/about-us")
        setStep(step + 1); // Pindah ke step selanjutnya
      };

      const handlePrev = () => {
        if(step===0) return;
        setStep(step - 1); // Pindah ke step selanjutnya
      };
    useEffect(() => {
        console.log('Name: ',firstName,lastName)
        console.log('Gender: ',selectedSex)
        console.log('Age: ',Age)
        console.log('Goal: ',WeightOption)
        console.log('Weight :',weight,' Height:',height);
        console.log('ActivityOption: ',ActivityOption);
        console.log('Progress Option: ',ProgressOption);
      });

    
    return <div className="min-h-screen flex items-center justify-center h-[100vh]">
        <ProtectedRoute>
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
          onNext ={handleNext}
          onPrev ={handlePrev}
          />
        )}

        {step===4 && (

          <ActivitySection
          ActivityOption = {ActivityOption}
          setActivityOption = {setActivityOption}
          onNext = {handleNext}
          onPrev = {handlePrev}
        />
        )}

        {step === 5 && (
          <ProgressSection
          ProgressOption={ProgressOption}
          setProgressOption = {setProgressOption}
          onNext = {handleNext}
          onPrev = {handlePrev}
        />
        )}
        {step === 6 && (
          <ConfirmationSection
          onNext = {handleNext}
          onPrev = {handlePrev}
          />
        )}
        </ProtectedRoute>

    </div>
}

export default Sections;