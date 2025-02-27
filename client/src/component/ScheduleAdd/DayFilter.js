import React from "react";

function DayFilter({ selectedDays, handleDaySelect }) {
    const days = ["ALL", "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    return (
        <div
            className="bg-[#F8F7F2] w-full flex justify-evenly h-12 items-center rounded-lg"
            style={{
                filter: 'drop-shadow(1.5px 1.5px 1.5px rgba(0, 0, 0, 0.4))',
            }}
        >
            {days.map((day, index) => (
                <h1
                    key={index}
                    className={`font-pop font-bold text-sm sm:font-black hover:scale-110 h-full flex justify-center items-center w-full  transition duration-300 ease-in-out hover:underline hover:cursor-pointer active:scale-105 ${
                        selectedDays.includes(index) ? "bg-green-500 underline text-white" : ""
                    }`}
                    onClick={() => handleDaySelect(index)}
                >
                    {day}
                </h1>
            ))}
        </div>
    );
}

export default DayFilter;