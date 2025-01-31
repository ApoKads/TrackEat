import React from "react";

const TombolActivity = ({ ActivityOption, setActivityOption }) => {
    return (
      <div className="flex flex-col justify-evenly w-full gap-4">
        {/* Gain Button */}
        <button
          className={`px-6 py-2 rounded-lg w-full flex items-center justify-center font-bold transition-all duration-300 ${
            ActivityOption === "Passive"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-200 text-black hover:bg-blue-300"
          }`}
          onClick={(e) => {
            e.preventDefault(); // Prevent form submission
            setActivityOption("Passive");
          }}
        >
          Passive
        </button>
  
        {/* Maintain Button */}
        <button
          className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 w-full flex flex-wrap items-center justify-center ${
            ActivityOption === "Lightly Active"
              ? "bg-ourPink text-white shadow-md"
              : "bg-gray-200 text-black hover:bg-pink-300"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setActivityOption("Lightly Active");
          }}
        >
          Lightly Active
        </button>
        {/* Maintain Button */}

        <button
          className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 w-full flex flex-wrap items-center justify-center ${
            ActivityOption === "Moderately Active"
              ? "bg-ourOrange text-white shadow-md"
              : "bg-gray-200 text-black hover:bg-orange-400"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setActivityOption("Moderately Active");
          }}
        >
          Moderately Active
        </button>

        <button
          className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 w-full flex flex-wrap items-center justify-center ${
            ActivityOption === "Intensely Active"
              ? "bg-ourLime text-white shadow-md"
              : "bg-gray-200 text-black hover:bg-lime-400"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setActivityOption("Intensely Active");
          }}
        >
          Intensely Active
        </button>
      </div>
    );
  };

  export default TombolActivity;