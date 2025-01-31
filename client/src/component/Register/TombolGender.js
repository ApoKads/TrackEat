import React from "react";

const TombolGender = ({ selectedSex, setSelectedSex }) => {
    return (
      <div className="flex gap-4 w-full">
        {/* Male Button */}
        <button
          className={`px-6 py-2 rounded-lg w-32 font-bold transition-all duration-300 ${
            selectedSex === "Male"
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-200 text-black hover:bg-blue-300"
          }`}
          onClick={(e) => {
            e.preventDefault(); // Prevent form submission
            setSelectedSex("Male");
          }}
        >
          Male
        </button>
  
        {/* Female Button */}
        <button
          className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 w-32 ${
            selectedSex === "Female"
              ? "bg-pink-500 text-white shadow-md"
              : "bg-gray-200 text-black hover:bg-pink-300"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setSelectedSex("Female");
          }}
        >
          Female
        </button>
      </div>
    );
  };

  export default TombolGender;