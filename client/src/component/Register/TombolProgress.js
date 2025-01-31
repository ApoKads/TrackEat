import React from "react";

const TombolProgress = ({ ProgressOption, setProgressOption }) => {
    return (
      <div className="flex gap-4 w-full justify-evenly">
        {/* Male Button */}
        <button
          className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 ${
            ProgressOption === "0.25"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-200 text-black hover:bg-blue-300"
          }`}
          onClick={(e) => {
            e.preventDefault(); // Prevent form submission
            setProgressOption("0.25");
          }}
        >
          0.25kg per week
        </button>
  
        {/* Female Button */}
        <button
          className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 ${
            ProgressOption === "0.5"
              ? "bg-pink-500 text-white shadow-md"
              : "bg-gray-200 text-black hover:bg-pink-300"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setProgressOption("0.5");
          }}
        >
          0.5kg per week
        </button>
      </div>
    );
  };

  export default TombolProgress;