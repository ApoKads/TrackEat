import React from "react";

const TombolGoal = ({ WeightOption, setWeightOption }) => {
    return (
      <div className="flex justify-evenly w-full">
        {/* Gain Button */}
        <button
          className={`px-6 py-2 rounded-lg w-28 flex flex-wrap items-center justify-center font-bold transition-all duration-300 ${
            WeightOption === "Gain"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-200 text-black hover:bg-blue-300"
          }`}
          onClick={(e) => {
            e.preventDefault(); // Prevent form submission
            setWeightOption("Gain");
          }}
        >
          Gain Weight
        </button>
  
        {/* Maintain Button */}
        <button
          className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 w-28 flex flex-wrap items-center justify-center ${
            WeightOption === "Maintain"
              ? "bg-ourPink text-white shadow-md"
              : "bg-gray-200 text-black hover:bg-pink-300"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setWeightOption("Maintain");
          }}
        >
          Maintain Weight
        </button>
        {/* Maintain Button */}

        <button
          className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 w-28 flex flex-wrap items-center justify-center ${
            WeightOption === "Lose"
              ? "bg-ourOrange text-white shadow-md"
              : "bg-gray-200 text-black hover:bg-orange-400"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setWeightOption("Lose");
          }}
        >
          Lose Weight
        </button>
      </div>
    );
  };

  export default TombolGoal;