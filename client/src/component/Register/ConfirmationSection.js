import React ,{useState} from "react";

function ConfirmationSection(props)
{
    
    return <div className="w-full h-[24rem] up-6 rounded-t-3xl sm:w-[400px] text-center shadow-lg relative overflow-hidden bg-[#FAF6EF] flex flex-col justify-between  gap-2" id="step1">


    <div className="w-full h-10 bg-lime-400"></div>
    <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-black mb-4">Reach your goal within</h2>
        <p className="text-3xl text-gray-600 mb-4">
        {props.month} Months
        </p>
        <div className="text-center font-bold text-black mb-4">We have calculated and this is the best recommendation for you to reach your goal!</div>
    </div>

    <div className="w-full p-4 flex flex-col gap-2 justify-center">

    </div>
{/*  */}
    <div className="flex justify-between items-end  p-4">
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
            onClick={props.onNext}
            >
            NEXT
        </button>
    </div>
</div>
}

export default ConfirmationSection
