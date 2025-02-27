import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleCard from './ScheduleCard';
import Header from '../Navbar/header';
import DayFilter from './DayFilter';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import axios from 'axios';

function SchedulePage() {
    const navigate = useNavigate()
    const [schedules, setSchedules] = useState([]); // State untuk menyimpan data schedule
    const [filteredSchedules, setFilteredSchedules] = useState([]); // State untuk data yang sudah difilter
    const [searchTerm, setSearchTerm] = useState(""); // State untuk pencarian
    const [selectedDay, setSelectedDay] = useState(0); // State untuk filter hari (0 = ALL, 1 = MON, dst)
    const [currentPage, setCurrentPage] = useState(1); // State untuk halaman saat ini
    const [postsPerPage, setPostsPerPage] = useState(5); // State untuk jumlah post per halaman

    const handleNewSchedule = ()=>{
        navigate('add-schedule');
    }

    // Fungsi untuk melakukan pencarian dan filter
    const handleSearchAndFilter = () => {
        let filtered = schedules;

        // Filter berdasarkan hari
        if (selectedDay !== 0) {
            const dayMap = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
            const selectedDayKey = dayMap[selectedDay - 1]; // selectedDay = 1 (MON) -> dayMap[0] = "monday"
            filtered = filtered.filter((schedule) => schedule[selectedDayKey]);
        }

        // Filter berdasarkan kata kunci
        if (searchTerm) {
            filtered = filtered.filter((schedule) =>
                schedule.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredSchedules(filtered);
        setCurrentPage(1); // Reset ke halaman pertama setelah pencarian atau filter
    };

    // Jalankan handleSearchAndFilter setiap kali searchTerm atau selectedDay berubah
    useEffect(() => {
        handleSearchAndFilter();
    }, [searchTerm, selectedDay]);


    // Fetch data dari backend menggunakan Axios
    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const response = await axios.get('/schedule', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Sesuaikan dengan token Anda
                    },
                });
                console.log(response)
                setSchedules(response.data); // Simpan data ke state schedules
                setFilteredSchedules(response.data); // Simpan data ke state filteredSchedules
            } catch (error) {
                console.error('Error fetching schedules:', error);
            }
        };

        fetchSchedules();
        // console.log(filteredSchedules)
    }, []);
    
    // Hitung indeks untuk pagination
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = filteredSchedules.slice(firstPostIndex, lastPostIndex);

    return (
        <div>
            
            <Header />
            <div className='p-4 sm:p-8 flex flex-col items-center justify-center'>
                <div className='w-full md:w-3/4 flex flex-col gap-16'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex w-full justify-between flex-col sm:flex-row gap-2'>
                            <SearchBar
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                />
                            <button className={`flex items-center justify-center gap-2 text-sm w-32 sm:text-base sm:w-56 p-2 rounded-md hover:scale-105 active:scale-95 transition duration-300 ease-in-out font-semibold bg-[#2cd24d] text-white`}
                            style={{
                                boxShadow: 'inset 4px 4px 4px rgba(0, 0, 0, 0.1)', // Inner shadow
                                filter: 'drop-shadow(1.5px 1.5px 0px rgba(0, 0, 0, 0.15))' // Drop shadow
                            }}
                            onClick={handleNewSchedule}
                        >New Schedule<i class="fa-solid fa-plus order-1 sm:order-none"></i></button>
                        </div>
                        <DayFilter
                            selectedDay={selectedDay}
                            setSelectedDay={setSelectedDay}
                        />
                    </div>
                    <div className='flex flex-col gap-20'>
                        {currentPosts.map((schedule) => (
                            <ScheduleCard key={schedule.id} schedule={schedule} />
                        ))}

                        <Pagination
                            totalPosts={filteredSchedules.length}
                            postsPerPage={postsPerPage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SchedulePage;