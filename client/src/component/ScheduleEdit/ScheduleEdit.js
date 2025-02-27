import React, { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Header from "../Navbar/header";
import SectionCard from "./SectionCard";
import Step2 from './Step2/Step2';
import DayFilter from "./DayFilter";
import axios from 'axios';
import ErrorMessage from "./ErrorMessage";

function ScheduleEdit() {
    const navigate  = useNavigate();
    const { id } = useParams();
    const [isSaving, setIsSaving] = useState(false);
    const [isEditingTitle, setIsEditingTitle] = useState(false); // Mode edit judul
    const [scheduleName, setScheduleName] = useState("Schedule Name"); // State untuk menyimpan nama schedule

    const [step,setStep] = useState(1);
    const [selectedSectionId, setSelectedSectionId] = useState(0); 
    const [selectedDays, setSelectedDays] = useState([]); // State untuk menyimpan hari yang dipilih

    const [description, setDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // State untuk menyimpan pesan error
    const [showError, setShowError] = useState(false); // State untuk menampilkan atau menyembunyikan pesan error
    const [sections, setSections] = useState([]); // State untuk menyimpan kumpulan section
    const [loading, setLoading] = useState(true); // State untuk menangani loading
    const [isActive,setIsActive] = useState(true);
    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`/schedule/detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data;

                // Set state dengan data dari backend
                setScheduleName(data.name);
                setDescription(data.description || "");
                setSelectedDays([
                    data.monday ? 1 : 0,
                    data.tuesday ? 2 : 0,
                    data.wednesday ? 3 : 0,
                    data.thursday ? 4 : 0,
                    data.friday ? 5 : 0,
                    data.saturday ? 6 : 0,
                    data.sunday ? 7 : 0,
                ].filter(day => day !== 0)); // Filter hari yang aktif
                setSections(data.sections);
                setIsActive(data.active)
            } catch (error) {
                console.error('Error fetching schedule data:', error);
                setErrorMessage('Failed to fetch schedule data. Please try again.');
                setShowError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchSchedule();
    }, [id]);

    const handleDeleteSection = (sectionId) => {
        console.log('test')
        const updatedSections = sections.filter((section) => section.id !== sectionId); // Hapus section berdasarkan ID
        setSections(updatedSections); // Update state sections
    };
    // Fungsi untuk menambahkan section baru
    const addSection = () => {
        const newSection = {
            id:sections.length+1,
            name: `Section Name`, // Nama section baru
            active: false, // Status active
            time: "08:00", // Waktu default
            foods: [] // Daftar makanan kosong
        };
        setSections([...sections, newSection]); // Tambahkan section baru ke array sections
    };

    // Fungsi untuk menambahkan makanan ke section tertentu
    const addFoodToSection = (sectionId, food) => {
        const updatedSections = sections.map((section) => {
            if (section.id === sectionId) {
                return {
                    ...section,
                    foods: [...section.foods, food] // Tambahkan makanan baru ke array foods
                };
            }  
            return section;
        });
        // console.log(food)
        setSections(updatedSections); // Update state sections
    };

     // Fungsi untuk menghapus makanan dari section tertentu
    const handleDeleteFood = (sectionId, foodId) => {
        const updatedSections = sections.map((section) => {
            if (section.id === sectionId) {
                return {
                    ...section,
                    foods: section.foods.filter((food) => food.id !== foodId), // Hapus makanan berdasarkan foodId
                };
            }
            return section;
        });
        setSections(updatedSections); // Update state sections
    };

    // Fungsi untuk mengubah nama section
    const updateSection = (sectionId, updatedData) => {
        const updatedSections = sections.map((section) => {
            if (section.id === sectionId) {
                return { ...section, ...updatedData }; // Update section dengan data baru
            }
            return section;
        });
        setSections(updatedSections); // Update state sections
    };

    // Fungsi untuk menghapus section
    const deleteSection = (sectionId) => {
        const updatedSections = sections.filter((section) => section.id !== sectionId); // Hapus section berdasarkan ID
        setSections(updatedSections); // Update state sections
    };

    const handleAddFood = (sectionId) => {
        setSelectedSectionId(sectionId); // Simpan ID section yang dipilih
        setStep(2); // Pindah ke step 2
    };

    const handleBack = () =>{
        if(step === 2) setStep(1)
    }

     // Fungsi untuk menangani pemilihan hari
     const handleDaySelect = (dayIndex) => {
        const allDays = [0, 1, 2, 3, 4, 5, 6,7]; // Indeks untuk hari MON (1) hingga SUN (6)
        const isAllSelected = selectedDays.length === 8; // Cek apakah semua hari sudah dipilih

        if (dayIndex === 0) {
            // Jika "ALL" diklik
            if (isAllSelected) {
                // Jika semua hari sudah dipilih, hapus semua
                setSelectedDays([]);
            } else {
                // Jika belum, tambahkan semua hari
                setSelectedDays(allDays);
            }
        } else {
            // Jika hari biasa diklik
            if (selectedDays.includes(dayIndex)) {
                // Jika hari sudah dipilih, hapus dari daftar
                setSelectedDays(selectedDays.filter((day) => day !== dayIndex));
            } else {
                // Jika hari belum dipilih, tambahkan ke daftar
                setSelectedDays([...selectedDays, dayIndex]);
            }
        }
    };

    // Fungsi untuk menangani perubahan deskripsi
    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        if (value.length <= 1024) {
            setDescription(value); // Update deskripsi jika tidak melebihi 255 karakter
        }
    };

    const handleSave = async () => {
        // Validasi judul
        if (!scheduleName.trim()) {
            setErrorMessage("Judul schedule harus diisi!");
            setShowError(true);
            return;
        }
    
        // Validasi deskripsi
        if (!description.trim()) {
            setErrorMessage("Deskripsi schedule harus diisi!");
            setShowError(true);
            return;
        }
    
        // Validasi hari yang dipilih
        if (selectedDays.length === 0) {
            setErrorMessage("Pilih minimal 1 hari!");
            setShowError(true);
            return;
        }
    
        // Validasi section
        if (sections.length === 0) {
            setErrorMessage("Tambah minimal 1 section!");
            setShowError(true);
            return;
        }
    
        // Validasi setiap section memiliki minimal 1 makanan
        for (const section of sections) {
            if (section.foods.length === 0) {
                setErrorMessage(`Section "${section.name}" harus memiliki minimal 1 makanan!`);
                setShowError(true);
                return;
            }
        }
    
        // Validasi waktu section tidak boleh sama
        const sectionTimes = sections.map((section) => section.time);
        const hasDuplicateTimes = new Set(sectionTimes).size !== sectionTimes.length;
        if (hasDuplicateTimes) {
            setErrorMessage("Waktu section tidak boleh sama!");
            setShowError(true);
            return;
        }
    
        setIsSaving(true); // Aktifkan loading
        // Jika semua validasi berhasil, kirim data ke backend
        try {
            const token = localStorage.getItem("token");
            const scheduleId = id; // ID schedule yang sedang diedit
    
            // Jika schedule aktif, hapus event dari Google Calendar terlebih dahulu
            if (isActive) {
                const removeMealResponse = await axios.delete(
                    '/calendar/remove-meal', // Endpoint untuk menghapus event dari Google Calendar
                    {
                        data: {
                            scheduleId: scheduleId, // ID schedule yang akan dihapus
                            token: token // Token untuk autentikasi
                        },
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                console.log('Remove meal from calendar response:', removeMealResponse.data);
            }
    
            // Hapus semua section yang ada
            await axios.delete(
                `/section/${scheduleId}`, // Endpoint untuk menghapus semua section
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
    
            // Tambahkan ulang semua section dan makanan
            for (const section of sections) {
                // Tambahkan section baru
                const sectionResponse = await axios.post(
                    `/section/${scheduleId}/`, // Endpoint untuk menambahkan section
                    {
                        name: section.name,
                        time: section.time,
                        active: true, // Set active ke true
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                const sectionId = sectionResponse.data.id;
    
                // Tambahkan makanan ke section
                for (const food of section.foods) {
                    await axios.post(
                        `/section/${sectionId}/foods`, // Endpoint untuk menambahkan makanan ke section
                        {
                            foodId: food.id,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                }
            }
    
            // Update informasi schedule
            const updateResponse = await axios.put(
                `/schedule/${scheduleId}`, // Endpoint untuk update schedule
                {
                    name: scheduleName,
                    description: description,
                    monday: selectedDays.includes(1),
                    tuesday: selectedDays.includes(2),
                    wednesday: selectedDays.includes(3),
                    thursday: selectedDays.includes(4),
                    friday: selectedDays.includes(5),
                    saturday: selectedDays.includes(6),
                    sunday: selectedDays.includes(7),
                    active: false, // Set active ke false
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
    
            if (updateResponse.status === 200) {
                alert("Schedule berhasil diperbarui!");
                navigate('/meal-schedule');
            }
        } catch (error) {
            console.error("Error saving schedule:", error);
            setErrorMessage("Gagal menyimpan schedule. Silakan coba lagi.");
            setShowError(true);
        }
        finally {
            setIsSaving(false); // Matikan loading
        }
    };

    const handleScheduleNameChange = (e) => {
        const newName = e.target.value;
        if (newName.length <= 24) { // Batasi panjang karakter maksimal 24
            setScheduleName(newName);
        }
    };

    const saveScheduleName = () => {
        let newName = scheduleName.trim(); // Hilangkan spasi di awal dan akhir
        if (newName === "") {
            newName = "Schedule Name"; // Set default jika kosong
            setScheduleName(newName); // Update state
        }
        setIsEditingTitle(false); // Nonaktifkan mode edit
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (scheduleName.trim() === "") {
                setScheduleName("Section Name"); // Set default jika kosong
            }
            saveScheduleName(); // Simpan perubahan saat tombol Enter ditekan
        }
    };


    return (
        <div>
            <Header />
            {step===2&&(<button onClick={handleBack} className="w-20 mb-5 mt-5 ml-5 bg-gray-200 px-4 py-2 rounded-lg shadow-md text-lg font-semibold hover:bg-gray-300 transition-transform transform hover:scale-105 active:scale-95">Back</button>
                )}
            {step===1 &&(
            <div className="relative">
                 {showError && (
                    <ErrorMessage
                        message={errorMessage}
                        onClose={() => setShowError(false)}
                    />
                )}
                <div className="flex flex-col w-full justify-center items-center sm:mt-10">
                    {isEditingTitle ? (
                        // Tampilkan input box jika sedang dalam mode edit
                        <input
                            type="text"
                            value={scheduleName}
                            onChange={handleScheduleNameChange}
                            onBlur={saveScheduleName}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            className="w-[90%] text-6xl md:text-8xl font-pop font-black text-[#263F54] drop-shadow mt-20 md:mt-10 mb-20 text-center bg-transparent border-none outline-none"
                        />
                    ) : (
                        // Tampilkan teks biasa jika tidak dalam mode edit
                        <div className="relative mt-20 md:mt-10">
                            <h1
                                className="text-6xl md:text-8xl font-pop font-black text-[#263F54] drop-shadow  text-center cursor-pointer relative"
                                onClick={() => setIsEditingTitle(true)}
                                >
                                {scheduleName}
                                <i class="fa-solid fa-pen-to-square text-sm absolute"></i>
                            </h1>
                        </div>
                        
                    )}
                </div>

                <div className="mt-16"></div>
                <div className="w-full flex justify-center items-center p-3">
                    <div className="w-full md:w-[80%] flex justify-center items-center flex-col gap-6">
                        <div className="w-full">
                            <h1 className="font-pop font-semibold sm:font-bold text-2xl text-[#263F54]">
                                Select the days this schedule should be active:
                            </h1>
                        </div>
                        <DayFilter
                        selectedDays={selectedDays}
                        handleDaySelect={handleDaySelect}
                        />
                        {/* <DayOption></DayOption> */}

                        <div className="w-full mt-10 sm:mt-16">
                            <h1 className="font-pop font-semibold sm:font-bold text-2xl text-[#263F54]">
                                Enter a brief description for this schedule:
                            </h1>
                        </div>
                        <div className="w-full">
                                <textarea
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    maxLength={1024}
                                    className="w-full p-3 border h-52 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#263F54] resize-none"
                                    rows={4}
                                    placeholder="Enter a brief description..."
                                />
                                <p className="text-right text-sm text-gray-500 mt-1">
                                    {description.length}/1024 characters
                                </p>
                        </div>

                    </div>
                    
                </div>
                
                <div className="mb-24"></div>
                <div className="flex flex-col gap-8 md:gap-16">
                    {sections.map((section) => (
                        <SectionCard
                        key={section.id}
                        section={section}
                        updateSection={updateSection}
                        deleteSection={deleteSection}
                        handleAddFood={() => handleAddFood(section.id)}
                        handleDeleteFood={handleDeleteFood}
                        onDelete={handleDeleteSection}
                        />
                        
                        ))}
                </div>

                {/* Tombol untuk menambahkan section baru */}
                <div className="flex justify-center mt-10">
                    <button
                        onClick={addSection}
                        className="bg-[#263F54] text-white px-6 py-2 rounded-md hover:bg-[#1E2E3F] transition duration-300"
                    >
                        + Add Section
                    </button>
                </div>

                <div className="w-full justify-center items-center flex">
                    <div className="sm:w-[80%] w-full flex justify-end items-center px-8">
                        <button
                            className="mt-10 py-2 px-5 sm:py-3 sm:px-8 rounded-3xl text-base bg-[#2cd24d] font-pop sm:text-xl font-semibold tracking-wider text-white hover:scale-105 hover:brightness-95 transition duration-300 ease-in-out active:scale-100 flex items-center justify-center"
                            onClick={handleSave}
                            disabled={isSaving} // Nonaktifkan tombol saat loading
                        >
                            {isSaving ? (
                                <i className="fa-solid fa-spinner fa-spin mr-2"></i> // Spinner saat loading
                            ) : null}
                            {isSaving ? "Saving..." : "Save"}
                        </button>
                    </div>
                </div>
            </div>
            )}   

            {step===2 &&
            <Step2 
            addFoodToSection={(food) => addFoodToSection(selectedSectionId, food)}
            handleBack={handleBack}
            
            />}
        </div>
    );
}

export default ScheduleEdit;