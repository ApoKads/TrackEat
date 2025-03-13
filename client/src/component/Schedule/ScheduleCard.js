import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import warning from '../../assets/images/warning.png'

function ScheduleCard({ schedule }) {
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [isNotifyLoading, setIsNotifyLoading] = useState(false);
    const [isActive, setIsActive] = useState(schedule.active);
    const [showConfirmation, setShowConfirmation] = useState(false); // State untuk custom confirmation box
    const [hasGoogleEmail, setHasGoogleEmail] = useState(false);

    const titleLength = schedule.name.length;
    const navigate = useNavigate();
    const titleClass = titleLength > 20 ? 'text-4xl' : 'text-3xl sm:text-5xl';

    // Fetch data pengguna saat komponen dimuat
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/user/info', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const userData = response.data.data;
                if (userData.google_email) {
                    setHasGoogleEmail(true); // Set true jika google_email ada
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);
    
    const handleClick = () => {
        navigate(`detail/${schedule.id}`);
    };

    const handleClickNotif = async (e) => {
        e.stopPropagation(); // Menghentikan propagasi event
        setIsNotifyLoading(true); // Aktifkan loading untuk tombol Notify Me

        try {
            const newActiveStatus = !isActive;
            setIsActive(newActiveStatus); // Update state di frontend

            // Kirim status active yang baru ke backend
            const updateResponse = await axios.put(
                '/schedule/update-active', // Endpoint untuk update active status
                {
                    scheduleId: schedule.id, // ID schedule yang akan diupdate
                    isActive: newActiveStatus // Status active yang baru
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Token untuk autentikasi
                    }
                }
            );

            console.log('Update active status response:', updateResponse.data);

            // Jika berubah dari tidak aktif menjadi aktif, tambahkan event ke Google Calendar
            if (newActiveStatus) {
                const addMealResponse = await axios.post(
                    '/calendar/add-meal', // Endpoint untuk menambahkan event ke Google Calendar
                    {
                        scheduleId: schedule.id, // ID schedule yang akan ditambahkan
                        token: localStorage.getItem('token') // Token untuk autentikasi
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                console.log('Add meal to calendar response:', addMealResponse.data);
            } else {
                // Jika berubah dari aktif menjadi tidak aktif, hapus event dari Google Calendar
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
        } catch (error) {
            console.error('Error updating active status or calendar:', error);
            alert('Failed to update active status or calendar. Please try again.');
            setIsActive((prev) => !prev); // Rollback state jika gagal
        } finally {
            setIsNotifyLoading(false); // Matikan loading untuk tombol Notify Me
        }
    };

    const handleDelete = async (e) => {
        e.stopPropagation(); // Menghentikan propagasi event

        // Tampilkan custom confirmation box
        setShowConfirmation(true);
    };

    const confirmDelete = async () => {
        setIsDeleteLoading(true); // Aktifkan loading untuk tombol Delete
        setShowConfirmation(false); // Sembunyikan confirmation box

        try {
            // Jika schedule aktif, hapus event dari Google Calendar terlebih dahulu
            if (isActive) {
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
            // navigate('/meal-schedule')
            window.location.reload(); // Atau gunakan navigate('/schedule') jika menggunakan React Router
        } catch (error) {
            console.error('Error deleting schedule or calendar event:', error);
            alert('Failed to delete schedule. Please try again.');
        } finally {
            setIsDeleteLoading(false); // Matikan loading untuk tombol Delete
        }
    };

    const cancelDelete = () => {
        setShowConfirmation(false); // Sembunyikan confirmation box
    };

    return (
        <>
            {/* Custom Confirmation Box */}
            {showConfirmation && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-2">
                    <div className="bg-[#F8F7F2] p-6 w-4/5 sm:w-96 flex flex-col justify-center items-center rounded-lg shadow-lg">
                        <div className='w-4/5 flex flex-col justify-center items-center  gap-4'>
                            <h2 className="text-2xl sm:text-3xl font-pop font-light text-center"
                            style={{
                                filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0.25, 0.25))',
                            }}>
                                Are you sure?</h2>
                            <img src={warning} className='w-12' />
                            <p className='text-center font-pop'>Do you really want to delete this?
                            Your action cannot be undone.</p>
                            <div className="flex justify-between gap-4 w-full ">
                                <button
                                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                                    onClick={cancelDelete}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-[#B00D0D] text-white rounded-md hover:brightness-95"
                                    onClick={confirmDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}

            {/* Schedule Card */}
            <div
                className="group w-full lg:w-[80%] h-80 relative transition duration-300 ease-in-out hover:brightness-95 hover:cursor-pointer"
                onClick={handleClick}
            >
                <div className="bg-[#E2DFD1] w-full h-full absolute top-2.5 left-2.5 -z-10 rounded-md drop-shadow-sm shadow-inner"></div>
                <div
                    className="bg-[#F8F7F2] w-full h-full rounded-md drop-shadow-sm shadow-md p-4 px-6 relative"
                    style={{
                        boxShadow: 'inset 1.25px 1.25px 1.25px rgba(0, 0, 0, 0.05)',
                    }}
                >
                    <h1 className={`${titleClass} font-pop font-medium text-[#263F54] absolute -top-5 sm:-top-6`}>
                        {schedule.name}
                    </h1>
                    <div className="flex flex-col sm:flex-row w-full h-full">
                        <div className="px-4 flex flex-col w-full sm:w-[80%]">
                            <h2 className="mt-6 font-pop text-lg sm:text-2xl mb-2">Description</h2>
                            <hr className="border-[#2d3034] border-[1.25px]" />
                            <p className="rounded-none p-4 px-0 min-h-32 max-h-40 sm:min-h-32 sm:max-h-56 overflow-x-hidden">
                                {schedule.description}
                            </p>
                        </div>

                        <div className="flex sm:flex-col gap-2 items-center flex-1 h-full justify-end">
                            <button
                                className="delete-button flex items-center justify-center gap-2 p-2 w-36 rounded-md bg-[#d22929] hover:scale-105 hover:bg-[#B00D0D] active:scale-95 transition duration-300 ease-in-out text-[#f1e8e8]"
                                style={{
                                    boxShadow: 'inset 4px 4px 4px rgba(0, 0, 0, 0.1)',
                                    filter: 'drop-shadow(1.5px 1.5px 0px rgba(0, 0, 0, 0.15))',
                                }}
                                onClick={handleDelete}
                                disabled={isDeleteLoading || isNotifyLoading} // Nonaktifkan tombol jika salah satu loading aktif
                            >
                                {isDeleteLoading ? (
                                    <i className="fa-solid fa-spinner fa-spin"></i> // Spinner saat loading
                                ) : (
                                    <>
                                        Delete <i className="fa-solid fa-trash"></i>
                                    </>
                                )}
                            </button>
                            {hasGoogleEmail&&(<button
                                className={`flex items-center justify-center gap-2 p-2 w-36 rounded-md hover:scale-105 active:scale-95 transition duration-300 ease-in-out font-semibold ${
                                    isActive
                                        ? 'bg-[#2cd24d] text-white'  // Jika active true, hijau dan teks putih
                                        : 'bg-[#FFFFFF] text-[#2cd24d]' // Jika active false, putih dan teks hijau
                                }`}
                                style={{
                                    boxShadow: 'inset 4px 4px 4px rgba(0, 0, 0, 0.1)', // Inner shadow
                                    filter: 'drop-shadow(1.5px 1.5px 0px rgba(0, 0, 0, 0.15))' // Drop shadow
                                }}
                                onClick={handleClickNotif}
                                disabled={isDeleteLoading || isNotifyLoading} // Nonaktifkan tombol jika salah satu loading aktif
                            >
                                {isNotifyLoading ? (
                                    <i className="fa-solid fa-spinner fa-spin"></i> // Spinner saat loading
                                ) : (
                                    <>
                                        {isActive ? 'Notified' : 'Notify Me'} <i className="fa-solid fa-bell"></i>
                                    </>
                                )}
                            </button>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ScheduleCard;