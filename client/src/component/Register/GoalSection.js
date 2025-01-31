import React ,{useState} from "react";
import TombolGoal from "./TombolGoal";
function GoalSection(props)
{
    const [showError, setShowError] = useState(false);
        const thisNext = () => {
            if(!props.WeightOption)
            {
                setShowError(true)
                return;
            }
            setShowError(false)
            props.onNext()
          };
    
        return <div class="w-full h-[60vh] up-6 rounded-t-3xl sm:w-[400px] text-center shadow-lg relative overflow-hidden bg-[#FAF6EF] flex flex-col  gap-2">
    
        <div class="w-full h-10 bg-lime-400"></div>
        <div className="flex flex-col gap-1">
            <h2 class="text-2xl font-bold text-black">Mind to share your goal with us?</h2>
            <p class="text-lg text-gray-600">
                This will help us a lot to calculate and track your health!
            </p>
        </div>
    
        <div className="w-full p-4 flex flex-col gap-2 justify-center">
            <div class="font-bold text-black mb-4 text-center">Select from the Options Below:</div>
        <TombolGoal WeightOption={props.WeightOption} setWeightOption={props.setWeightOption}/>
            
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

export default GoalSection;
