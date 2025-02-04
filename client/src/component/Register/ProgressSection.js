import React, {useState} from "react";
import TombolProgress from "./TombolProgress";
function ProgressSection(props)
{
    const [showError, setShowError] = useState(false);
    const thisNext = () => {
            
            if(!props.ProgressOption)
            {
                setShowError(true)
                return;
            }
            setShowError(false)
            props.onNext()
          };


    return <div className="w-full h-[60vh] up-6 rounded-t-3xl sm:w-[400px] text-center shadow-lg relative overflow-hidden bg-[#FAF6EF] flex flex-col  gap-2">

    <div className="w-full h-10 bg-lime-400"></div>
    <div className="flex flex-col gap-1 ">
        <h2 className="text-2xl font-bold text-black">Which one would you prefer?</h2>
        <p className="text-md text-gray-600 px-2">
        These options are the best recommendation for you to reach your goal!
        </p>
    </div>

    <div className="w-full p-4 flex flex-col gap-2 justify-center">
        <div className="text-lg text-center font-bold text-black">Select Your Preferences</div>
        <TombolProgress ProgressOption={props.ProgressOption} setProgressOption={props.setProgressOption}/>
        
    </div>

    <div className={`p-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400 w-3/4 self-center text-center ${showError ? 'block' : 'hidden'}`} role="alert">
  <span className="font-medium">Attention!</span> All of the area must be filled.
</div>

{/*  */}
    <div className="flex justify-between items-end flex-1 p-4">
        <button 
            id="backButton1" 
            className="h-12 bg-white text-gray-800 px-6 py-2 rounded-2xl border font-bold border-gray-300 shadow-md hover:bg-gray-100"
            onClick={props.onPrev}
            >
            BACK
        </button>
        <button 
            id="nextButton1" 
            className="h-12 bg-[#A8CE3A] text-white px-6 py-2 rounded-2xl font-bold shadow-md hover:bg-[#96b835]"
            onClick={thisNext}
            >
            NEXT
        </button>
    </div>
</div>
}

export default ProgressSection;