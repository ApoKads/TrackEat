import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import FoodTable from './FoodTable';
import axios from 'axios';

function SectionCard({ section, updateSection, deleteSection, handleAddFood, handleDeleteFood,onDelete }) {
    const navigate = useNavigate();
    const [isEditingSection, setIsEditingSection] = useState(false); // State untuk mode edit
    const [sectionName, setSectionName] = useState(section.name); // State untuk menyimpan nama section
    const [sectionTime, setSectionTime] = useState(section.time); // State untuk menyimpan waktu section
    const [fontSize, setFontSize] = useState('text-4xl sm:text-5xl md:text-6xl -top-5 md:-top-8');
    // const [spacing,setSpacing ] = useState('-top-5 md:-top-8');

    // Fungsi untuk mengubah nama section
    const handleSectionNameChange = (e) => {
        const newName = e.target.value;
        if (newName.length <= 24) { // Batasi panjang karakter maksimal 24
            setSectionName(newName);
        }
    };
    // Fungsi untuk menyimpan perubahan nama section
    const saveSectionName = () => {
        let newName = sectionName.trim(); // Hilangkan spasi di awal dan akhir
        if (newName === "") {
            newName = "Section Name"; // Set default jika kosong
            setSectionName(newName); // Update state
        }
        updateSection(section.id, { name: newName }); // Panggil fungsi updateSection dari parent
        setIsEditingSection(false); // Nonaktifkan mode edit
    };

    // Fungsi untuk handle tombol Enter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (sectionName.trim() === "") {
                setSectionName("Section Name"); // Set default jika kosong
            }
            saveSectionName(); // Simpan perubahan saat tombol Enter ditekan
        }
    };

    // const handleAddFood = () =>{
    //     // navigate('')
    // }
    const handleTimeChange = (e) => {
        const newTime = e.target.value;
        setSectionTime(newTime); // Update state waktu
        updateSection(section.id, { time: newTime }); // Panggil fungsi updateSection dari parent
    };

    // Hitung total nutrisi
    const totalCalories = section.foods.reduce((sum, food) => sum + food.calories, 0).toFixed(2);
    const totalCarbs = section.foods.reduce((sum, food) => sum + food.carbs, 0).toFixed(2);
    const totalFat = section.foods.reduce((sum, food) => sum + food.fat, 0).toFixed(2);
    const totalProtein = section.foods.reduce((sum, food) => sum + food.protein, 0).toFixed(2);

    useEffect(() => {
        if (sectionName.length > 20) {
            setFontSize('text-3xl sm:text-4xl md:text-5xl -top-4 md:-top-6'); // Ukuran font lebih kecil untuk 20+ karakter
        } else if (sectionName.length > 12) {
            setFontSize('text-4xl sm:text-4xl md:text-5xl -top-4 md:-top-6'); // Ukuran font lebih kecil untuk 20+ karakter
            // 20 karakter
        } else {
        setFontSize('text-4xl sm:text-5xl md:text-6xl -top-5 md:-top-8');
        }
    }, [sectionName]);

    return (
        <div className='w-full flex gap-4 justify-center flex-col md:flex-row px-1 sm:px-4 md:px-0'>
            <div className='w-full md:w-[80%] lg:w-[60%] relative transition duration-300 ease-in-out'>
                <div
                    className='bg-[#F8F7F2] w-full h-full rounded-3xl drop-shadow-sm shadow-md py-4 pl-4 pr-2 sm:p-4 sm:px-6 relative'
                    style={{
                        boxShadow: 'inset 1.25px 1.25px 1.25px rgba(0, 0, 0, 0.05)', // Inner shadow
                        filter: 'drop-shadow(2px 2px 0px rgb(0 0 0 / 0.1))',
                    }}
                >
                    <div
                     className='absolute  right-0 -top-2 sm:-right-2 rounded-full w-10 h-10 sm:w-12 sm:h-12 bg-red-500 flex justify-center items-center text-white font-bold hover:scale-105 transition duration-300 ease-in-out hover:cursor-pointer active:scale-95'
                     onClick={()=>{onDelete(section.id)}}
                    >
                    <i class="fa-solid fa-x"></i>
                    </div>
                    {/* Bagian nama section */}
                    {isEditingSection ? (
                        // Tampilkan input box jika sedang dalam mode edit
                        <input
                            type="text"
                            value={sectionName}
                            onChange={handleSectionNameChange}
                            onBlur={saveSectionName} // Simpan perubahan saat input kehilangan fokus
                            onKeyDown={handleKeyDown} // Handle tombol Enter
                            autoFocus // Fokus otomatis ke input saat muncul
                            className={`font-pop font-base w-4/5 text-[#263F54] absolute ${fontSize} bg-transparent border-none outline-none`}
                            style={{
                                filter: 'drop-shadow(0px 4px 4px rgb(0 0 0 / 0.25))',
                            }}
                        />
                    ) : (
                        // Tampilkan teks biasa jika tidak dalam mode edit
                        <h1
                            className={`font-pop font-base text-[#263F54] absolute ${fontSize} cursor-pointer`}
                            style={{
                                filter: 'drop-shadow(0px 4px 4px rgb(0 0 0 / 0.25))',
                            }}
                            onClick={() => setIsEditingSection(true)} // Aktifkan mode edit saat diklik
                        >
                            {sectionName}
                            <i class="fa-solid fa-pen-to-square text-sm absolute"></i>

                        </h1>
                    )}

                    <div className='flex flex-col mt-10 gap-3 sm:px-8 '>
                        {/* Header tabel */}
                        <div className='grid  grid-cols-[20%,15%,15%,15%,15%,1fr] sm:grid-cols-[25%,15%,15%,15%,15%,1fr] gap-2'>
                            <h1 className='flex justify-start items-end font-pop font-bold text-base'>Food</h1>
                            <div className='flex flex-col justify-center items-center text-sm sm:text-xl'>
                                <h1 className='font-pop font-medium'>Calories</h1>
                                <h2 className='-mt-2 text-gray-600'>kcal</h2>
                            </div>
                            <div className='flex flex-col justify-center items-center text-sm sm:text-xl'>
                                <h1 className='font-pop font-medium'>Carbs</h1>
                                <h2 className='-mt-2 text-gray-600'>gr</h2>
                            </div>
                            <div className='flex flex-col justify-center items-center text-sm sm:text-xl'>
                                <h1 className='font-pop font-medium'>Fat</h1>
                                <h2 className='-mt-2 text-gray-600'>gr</h2>
                            </div>
                            <div className='flex flex-col justify-center items-center text-sm sm:text-xl'>
                                <h1 className='font-pop font-medium'>Protein</h1>
                                <h2 className='-mt-2 text-gray-600'>gr</h2>
                            </div>
                        </div>
                        <hr className='border-gray-600 border-[1px] mb-2' />

                        {/* Daftar makanan */}
                        {section.foods.map((food, index) => (
                            <FoodTable key={index} food={food} sectionId={section.id} handleDeleteFood={handleDeleteFood} />
                        ))}

                        {/* Tombol Add Food */}
                        <div className='w-full flex justify-center items-center mt-2'>

                            <div
                                className='w-full sm:w-40 bg-white justify-center items-center gap-2 flex py-2 rounded-xl hover:cursor-pointer hover:scale-105 duration-300 transition ease-in-out'
                                style={{
                                    boxShadow: 'inset 1.25px 1.25px 1.25px rgba(0, 0, 0, 0.1)', // Inner shadow
                                    filter: 'drop-shadow(2px 2px 0px rgb(0 0 0 / 0.1))',
                                }}
                                onClick={handleAddFood}
                                >
                                Add Food<i class="fa-solid fa-plus"></i>
                            </div>
                        </div>

                        <hr className='border-gray-600 border-[1px]' />

                        {/* Total nutrisi */}
                        <div className='grid grid-cols-[20%,15%,15%,15%,15%,1fr] gap-2 sm:grid-cols-[25%,15%,15%,15%,15%,1fr] mt-2'>
                            <h1 className='flex justify-start items-end font-pop font-bold text-base'>Total</h1>
                            <div className='flex flex-col justify-center items-center'>
                                <h1 className='font-pop font-normal text-sm sm:text-xl'>{totalCalories}</h1>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <h1 className='font-pop font-normal text-sm sm:text-xl'>{totalCarbs}</h1>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <h1 className='font-pop font-normal text-sm sm:text-xl'>{totalFat}</h1>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <h1 className='font-pop font-normal text-sm sm:text-xl'>{totalProtein}</h1>
                            </div>
                        </div>

                        {/* Pilih waktu */}
                        <div className='w-full flex justify-end items-center'>
                            <div className='mt-4 relative'>
                                <label htmlFor="time-input" className='font-pop font-medium text-lg'>Pilih Waktu:</label>
                                <div className='relative inline-block'>
                                    <input
                                        id="time-input"
                                        type="time"
                                        value={sectionTime}
                                        onChange={handleTimeChange}
                                        className='ml-2 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#263F54] no-spinner'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SectionCard;