import React ,{useState,useEffect}from 'react';
import ScheduleCard from './ScheduleCard';
import Header from '../Navbar/header';
import DayFilter from './DayFilter';
import Pagination from './Pagination';
import SearchBar from './SearchBar'
import axios from 'axios'; 

function SchedulePage(){
    const [schedules, setSchedules] = useState([]); // State untuk menyimpan data schedule
    const [filteredSchedules, setFilteredSchedules] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [selectedDay, setSelectedDay] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);
    // Fetch data dari backend
    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/schedule', {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Sesuaikan dengan token Anda
                    },
                });
                const data = response.data
                // console.log(data)
                setSchedules(data); // Simpan data ke state
                setFilteredSchedules(data);
            } catch (error) {
                console.error('Error fetching schedules:', error);
            }
        };

        fetchSchedules();
    }, []);

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

    useEffect(() => {
        handleSearchAndFilter();
    }, [searchTerm, selectedDay]);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = filteredSchedules.slice(firstPostIndex, lastPostIndex);


    return <div>
        <Header></Header>
        <div className='p-4 sm:p-8 flex flex-col items-center justify-center'>
            <div className='w-full md:w-3/4 flex flex-col gap-20'>
                <div className='flex flex-col'>
                    <SearchBar
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                        />
                    <DayFilter
                            selectedDay={selectedDay}
                            setSelectedDay={setSelectedDay}
                            />
                </div>
                
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
}
export default SchedulePage