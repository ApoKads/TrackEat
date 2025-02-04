import React, { useState } from "react";

function MeasureGoalSection(props) {
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const thisNext = () => {
        if (!props.goal) {
            setErrorMessage("All of the area must be filled.");
            setShowError(true);
            return;
        }

        if (props.WeightOption === "Gain" && Number(props.goal) <= Number(props.weight)) {
            setErrorMessage("Your goal weight must be greater than your current weight for weight gain.");
            setShowError(true);
            return;
        }

        if (props.WeightOption === "Lose" && Number(props.goal) >= Number(props.weight)) {
            setErrorMessage("Your goal weight must be less than your current weight for weight loss.");
            setShowError(true);
            return;
        }

        // Jika validasi lolos, lanjutkan ke langkah berikutnya
        setShowError(false);
        props.onNext();
    };

    return (
        <div className="w-full h-[60vh] up-6 rounded-t-3xl sm:w-[400px] text-center shadow-lg relative overflow-hidden bg-[#FAF6EF] flex flex-col gap-2" id="step1">
            <div className="w-full h-10 bg-lime-400"></div>
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-black">Please Fill in the Form Below</h2>
                <p className="text-lg text-gray-600 px-2">
                    These data will be used to calculate how much calories you need!
                </p>
            </div>

            <div className="w-full p-4 flex flex-col gap-2 justify-center">
                <div className="text-left font-bold text-black mb-2">Your Weight Goal:</div>
                <label className="sr-only" htmlFor="weight">Weight (in kg)</label>
                <input 
                    id="weight" 
                    type="number" 
                    placeholder="Weight (in kg)" 
                    className="border border-gray-300 px-4 py-2 block w-full rounded-lg focus:ring focus:ring-lime-400 text-gray-800"
                    value={props.goal}
                    onChange={(e) => props.setGoal(e.target.value)} 
                />
            </div>

            {/* Pesan error */}
            {showError && (
                <div className="p-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400 w-3/4 self-center text-center" role="alert">
                    <span className="font-medium">Attention!</span> {errorMessage}
                </div>
            )}

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
    );
}

export default MeasureGoalSection;
