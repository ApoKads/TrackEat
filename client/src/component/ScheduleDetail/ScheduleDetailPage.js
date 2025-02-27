import React, { useState ,useEffect} from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import Header from "../Navbar/header";
import SectionCard from "./SectionCard";
import warning from '../../assets/images/warning.png'

function ScheduleDetailPage(){
    const navigate = useNavigate()
    const { id } = useParams(); // Ambil ID dari URL
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false); // State untuk custom confirmation box
    
    const handleDelete = async (e) => {
        e.stopPropagation(); // Menghentikan propagasi event

        // Tampilkan custom confirmation box
        setShowConfirmation(true);
    };
    const cancelDelete = () => {
        setShowConfirmation(false); // Sembunyikan confirmation box
    };

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const token = localStorage.getItem('token')
            
                const response = await axios.get(`/schedule/detail/${id}`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data;
                console.log(data)
                setSchedule(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSchedule();
    }, [id]);


    const confirmDelete = async () => {
        setIsDeleteLoading(true); // Aktifkan loading untuk tombol Delete
        try {
            // Jika schedule aktif, hapus event dari Google Calendar terlebih dahulu
            if (schedule.active) {
                const removeMealResponse = await axios.delete(
                    '/calendar/remove-meal', // Endpoint untuk menghapus event dari Google Calendar
                    {
                        data: {
                            scheduleId: schedule.id, // ID schedule yang akan dihapus
                            token: localStorage.getItem('token') // Token untuk autentikasi
                        },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                console.log('Remove meal from calendar response:', removeMealResponse.data);
            }

            // Hapus schedule dari database
            const deleteResponse = await axios.delete(
                `/schedule/${schedule.id}`, // Endpoint untuk menghapus schedule
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            console.log('Delete schedule response:', deleteResponse.data);

            // Redirect ke halaman schedule atau refresh halaman
            // window.location.reload(); // Atau gunakan navigate('/schedule') jika menggunakan React Router
        } catch (error) {
            console.error('Error deleting schedule or calendar event:', error);
            alert('Failed to delete schedule. Please try again.');
        } finally {
            setIsDeleteLoading(false); // Matikan loading untuk tombol Delete
            navigate('/meal-schedule');
        }
    };

    const handleEdit =()=>{
        navigate('edit')
    
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
    <div>
        <Header></Header>
        {showConfirmation && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-2">
                <div className="bg-[#F8F7F2] p-6 w-4/5 sm:w-96 flex flex-col justify-center items-center rounded-lg shadow-lg">
                    <div className='w-4/5 flex flex-col justify-center items-center gap-4'>
                        <h2 className="text-2xl sm:text-3xl font-pop font-light text-center"
                            style={{
                                filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0.25, 0.25))',
                            }}>
                            Are you sure?
                        </h2>
                        <img src={warning} className='w-12' />
                        <p className='text-center font-pop'>Do you really want to delete this? Your action cannot be undone.</p>
                        <div className="flex justify-between gap-4 w-full">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                                onClick={cancelDelete}
                                disabled={isDeleteLoading} // Nonaktifkan tombol saat loading
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-[#B00D0D] text-white rounded-md hover:brightness-95 flex items-center justify-center"
                                onClick={confirmDelete}
                                disabled={isDeleteLoading} // Nonaktifkan tombol saat loading
                            >
                                {isDeleteLoading ? (
                                    <i className="fa-solid fa-spinner fa-spin"></i> // Spinner saat loading
                                ) : (
                                    "Delete"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        <div className="flex flex-col w-full justify-center items-center mt-10">
            <div className='flex flex-col gap-2 px-4 sm:px-8 items-end w-full justify-center'>
                        <button className='flex items-center justify-center gap-2 p-2 w-[6rem] sm:w-36 rounded-md bg-[#d22929] hover:scale-105 hover:bg-[#B00D0D] active:scale-95 transition duration-300 ease-in-out text-[#f1e8e8]'
                            style={{
                                boxShadow: 'inset 4px 4px 4px rgba(0, 0, 0, 0.1)', // Inner shadow
                                filter: 'drop-shadow(1.5px 1.5px 0px rgba(0, 0, 0, 0.15))' // Drop shadow
                            }}
                            onClick={handleDelete}
                        >Delete <i className="fa-solid fa-trash"></i></button>
                        <button className='flex items-center justify-center gap-2 p-2 w-[6rem] sm:w-36 rounded-md  hover:scale-105 bg-ourBlue active:scale-95 transition duration-300 ease-in-out text-[#FFFFFF]'
                            style={{
                                boxShadow: 'inset 4px 4px 4px rgba(0, 0, 0, 0.1)', // Inner shadow
                                filter: 'drop-shadow(1.5px 1.5px 0px rgba(0, 0, 0, 0.15))' // Drop shadow
                            }}
                            onClick={handleEdit}
                        >Edit <i class="fa-solid fa-pen-to-square"></i></button>
            </div>
            <h1 className="text-5xl md:text-7xl font-pop font-bold text-[#263F54] drop-shadow mt-10 sm:mt-20 md:mt-10 mb-20 text-center">{schedule.name}</h1>

            <div className='flex flex-col gap-20 w-full'>
                    {schedule.sections.map((section) => (
                        <SectionCard key={section.id} section={section} />
                    ))}
            </div>

        </div>
    </div>
)
}

export default ScheduleDetailPage;