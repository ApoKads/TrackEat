import React,{useState} from "react";
import TombolGender from "./TombolGender";
function GenderSection(props)
{
    const [showError, setShowError] = useState(false);
    const thisNext = () => {
            
            if(!props.Age || !props.selectedSex)
            {
                setShowError(true)
                return;
            }
            setShowError(false)
            props.onNext()
          };


    return <div class="w-full h-[60vh] up-6 rounded-t-3xl sm:w-[400px] text-center shadow-lg relative overflow-hidden bg-[#FAF6EF] flex flex-col  gap-2">

    <div class="w-full h-10 bg-lime-400"></div>
    <div className="flex flex-col gap-1 ">
        <h2 class="text-2xl font-bold text-black">Please fill in the form below</h2>
        <p class="text-md text-gray-600 px-2">
        These data will be used to calculate your calorie needs!
        </p>
    </div>

    <div className="w-full p-4 flex flex-col gap-2 justify-center">
        <div class="text-lg text-left font-bold text-black">Select Sex</div>
        <TombolGender selectedSex={props.selectedSex} setSelectedSex={props.setSelectedSex}/>
        <div class="text-lg text-left font-bold text-black ">Age</div>
        <input 
            id="Age" 
            type="number" 
            placeholder="Age" 
            class="border border-gray-300 px-4 py-2 block w-full rounded-lg focus:ring focus:ring-lime-400 text-gray-800"
            value={props.Age}  // Gunakan props.firstName
            onChange={(e) => props.setAge(e.target.value)}
            />
    </div>

    <div class={`p-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400 w-3/4 self-center text-center ${showError ? 'block' : 'hidden'}`} role="alert">
  <span class="font-medium">Attention!</span> All of the area must be filled.
</div>

{/*  */}
    <div class="flex justify-between items-end flex-1 p-4">
        <button 
            id="backButton1" 
            class="h-12 bg-white text-gray-800 px-6 py-2 rounded-2xl border font-bold border-gray-300 shadow-md hover:bg-gray-100"
            onClick={props.onPrev}
            >
            BACK
        </button>
        <button 
            id="nextButton1" 
            class="h-12 bg-[#A8CE3A] text-white px-6 py-2 rounded-2xl font-bold shadow-md hover:bg-[#96b835]"
            onClick={thisNext}
            >
            NEXT
        </button>
    </div>
</div>
}

export default GenderSection;