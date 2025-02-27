import React, { useState } from "react";

function DayOption() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State untuk mengontrol tampilan dropdown

    // Fungsi untuk membuka/tutup dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div
            className="bg-[#F8F7F2] w-full flex justify-between h-14 sm:px-5 rounded-lg items-center"
            style={{
                filter: 'drop-shadow(1.5px 1.5px 1.5px rgba(0, 0, 0, 0.4))',
            }}
        >
            <div className="w-96 h-10 relative">
                {/* Tombol untuk membuka/tutup dropdown */}
                <div
                    className="w-full h-full p-2 rounded-lg bg-white flex items-center justify-between relative z-10 cursor-pointer"
                    style={{
                        filter: 'drop-shadow(1.5px 1.5px 1.5px rgba(0, 0, 0, 0.4))',
                    }}
                    onClick={toggleDropdown} // Panggil fungsi toggleDropdown saat diklik
                >
                    <p className="font-pop font-bold text-[#B9B9B9] z-10">Select days to be scheduled</p>
                    <i className={`fa-solid fa-caret-down ${isDropdownOpen ? "rotate-180" : ""} transition-transform duration-300`}></i>
                </div>

                {/* Dropdown content */}
                {isDropdownOpen && (
                    <div
                        className="absolute bg-[#F8F7F2] top-[85%] left-0 w-full  py-6 -z-10 flex flex-col "
                        style={{
                            filter: 'drop-shadow(1.5px 1.5px 1.5px rgba(0, 0, 0, 0.4))',
                        }}
                    >
                        {/* Isi dropdown */}
                        <div className="bg-green-500">
                            <div className="font-pop font-medium text-lg my-1 text-white p-2 flex justify-between items-center pr-6">
                                <h1>Monday</h1>
                                <i class="fa-solid fa-check"></i>
                            </div>
                            <hr className="border-green-500 "/>
                        </div>
                        <div className="bg-green-500">
                            <div className="font-pop font-medium text-lg my-1 text-white p-2 flex justify-between items-center pr-6">
                                <h1>Monday</h1>
                                <i class="fa-solid fa-check"></i>
                            </div>
                            <hr className="border-green-500 "/>
                        </div>
                        <div className="bg-green-500">
                            <div className="font-pop font-medium text-lg my-1 text-white p-2 flex justify-between items-center pr-6">
                                <h1>Monday</h1>
                                <i class="fa-solid fa-check"></i>
                            </div>
                            <hr className="border-green-500 "/>
                        </div>
                        <div className="bg-green-500">
                            <div className="font-pop font-medium text-lg my-1 text-white p-2 flex justify-between items-center pr-6">
                                <h1>Monday</h1>
                                <i class="fa-solid fa-check"></i>
                            </div>
                            <hr className="border-green-500 "/>
                        </div>
                        <div className="bg-green-500">
                            <div className="font-pop font-medium text-lg my-1 text-white p-2 flex justify-between items-center pr-6">
                                <h1>Monday</h1>
                                <i class="fa-solid fa-check"></i>
                            </div>
                            <hr className="border-green-500 "/>
                        </div>
                        <div className="bg-green-500">
                            <div className="font-pop font-medium text-lg my-1 text-white p-2 flex justify-between items-center pr-6">
                                <h1>Monday</h1>
                                <i class="fa-solid fa-check"></i>
                            </div>
                            <hr className="border-green-500 "/>
                        </div>

                        

                    </div>
                )}
            </div>

            <div>
                Label
            </div>
        </div>
    );
}

export default DayOption;