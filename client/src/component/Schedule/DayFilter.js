import React from "react";

function DayFilter({ selectedDay, setSelectedDay }) {
    const days = ["ALL", "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    return (
        <div
            className="bg-[#F8F7F2] w-full flex justify-evenly py-3 px-3 rounded-lg"
            style={{
                filter: 'drop-shadow(1.5px 1.5px 1.5px rgba(0, 0, 0, 0.4))',
            }}
        >
            {days.map((day, index) => (
                <h1
                    key={index}
                    className={`p-1 px-10 font-pop font-black hover:scale-125 hover:text-[#263F54] transition duration-300 ease-in-out hover:underline hover:cursor-pointer active:scale-110 ${
                        selectedDay === index ? "text-green-500 underline" : ""
                    }`}
                    onClick={() => setSelectedDay(index)}
                >
                    {day}
                </h1>
            ))}
        </div>
    );
}

export default DayFilter;