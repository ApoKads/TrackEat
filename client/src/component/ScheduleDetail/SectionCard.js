import React ,{useState}from 'react';
import { useNavigate } from 'react-router-dom';
import FoodTable from './FoodTable';
import axios from 'axios'

function SectionCard({ section }) {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(section.active);
    // };

    const handleClickNotif = async () => {
        try {
            // console.log(section.active)
            // Ubah status active di frontend
            const newActiveStatus = !isActive;
            setIsActive(newActiveStatus);

            // Kirim status active yang baru ke backend
            const response = await axios.put(
                '/section/update-active', // Sesuaikan dengan endpoint backend
                {
                    sectionId: section.id, // ID section yang akan diupdate
                    isActive: newActiveStatus // Status active yang baru
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Jika menggunakan token untuk autentikasi
                    }
                }
            );
            console.log(response.data)
            // console.log('Active status updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating active status:', error);
            alert('Failed to update active status. Please try again.');
            // Rollback state jika gagal
            setIsActive((prev) => !prev);
        }
    };
    
    
    const handleAddFood = async () => {
        try {
            // Loop melalui setiap makanan di section
            for (const food of section.foods) {
                const response = await axios.post('/calorie-tracker', {
                    food_id: food.id,
                    quantity: 1 // Anda mungkin perlu menambahkan quantity ke objek food
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` // Jika menggunakan token untuk autentikasi
                    }
                });
                console.log(`Food ${food.name} logged successfully:`, response.data);
            }

            // alert('All foods logged successfully!');
            navigate('/calorie-tracker')
        } catch (error) {
            console.error('Error logging foods:', error);
            alert('Failed to log foods. Please try again.');
        }
    };

    const totalCalories = section.foods.reduce((sum, food) => sum + food.calories, 0);
    const totalCarbs = section.foods.reduce((sum, food) => sum + food.carbs, 0);
    const totalFat = section.foods.reduce((sum, food) => sum + food.fat, 0);
    const totalProtein = section.foods.reduce((sum, food) => sum + food.protein, 0);

    return (
        <div className='w-full flex gap-4 justify-center flex-col md:flex-row px-4 md:px-0'>
            <div className='w-full  md:w-[80%] lg:w-[60%] relative  hover:cursor-pointer transition duration-300 ease-in-out' >
                <div className='bg-[#F8F7F2] w-full h-full rounded-3xl drop-shadow-sm shadow-md p-4 px-6 relative' style={{
                    boxShadow: 'inset 1.25px 1.25px 1.25px rgba(0, 0, 0, 0.05)', // Inner shadow
                    filter: 'drop-shadow(2px 2px 0px rgb(0 0 0 / 0.1))'

                }}>
                    <h1 className={`font-pop font-base text-[#263F54] absolute -top-5 md:-top-6 text-4xl md:text-5xl `}
                    style={{
                        filter: 'drop-shadow(0px 4px 4px rgb(0 0 0 / 0.25))'    
                    }}
                    
                    >{section.name}</h1>
                    <div className='flex flex-col mt-10 gap-3 sm:px-8'>
                        <div className='grid grid-cols-[20%,20%,20%,20%,20%] sm:grid-cols-[25%,15%,15%,15%,15%,1fr]'>
                            <h1 className='flex justify-start items-end font-pop font-bold text-base'>Food</h1>
                            <div className='flex flex-col justify-center items-center'>
                                <h1 className='font-pop font-medium text-sm'>Calories</h1>
                                <h2 className='-mt-2 text-gray-600 text-sm'>kcal</h2>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <h1 className='font-pop font-medium text-sm'>Carbs</h1>
                                <h2 className='-mt-2 text-gray-600 text-sm'>gr</h2>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <h1 className='font-pop font- text-sm'>Fat</h1>
                                <h2 className='-mt-2 text-gray-600 text-sm'>gr</h2>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <h1 className='font-pop font-medium text-sm'>Protein</h1>
                                <h2 className='-mt-2 text-gray-600 text-sm'>gr</h2>
                            </div>
                        </div>
                        <hr className='border-gray-600 border-[1px] mb-2'/>

                        {section.foods.map((food, index) => (
                            <FoodTable key={index} food={food} />
                        ))}

                      
                        <hr className='border-gray-600 border-[1px]'/>

                        <div className='grid grid-cols-[20%,20%,20%,20%,20%] sm:grid-cols-[25%,15%,15%,15%,15%,1fr] mt-2'>
                            <h1 className='flex justify-start items-end font-pop font-bold text-sm sm:text-base'>Total</h1>
                            <div className='flex flex-col justify-center items-center'>
                                <h1 className='font-pop font-normal text-sm sm:text-xl'>{totalCalories.toFixed(2)}</h1>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <h1 className='font-pop font-normal text-sm sm:text-xl'>{totalCarbs.toFixed(2)}</h1>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <h1 className='font-pop font-normal text-sm sm:text-xl'>{totalFat.toFixed(2)}</h1>
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <h1 className='font-pop font-normal text-sm sm:text-xl'>{totalProtein.toFixed(2)}</h1>
                            </div>
                    
                        </div>

                        <div className='w-full flex justify-end items-center'>
                            {/* <div className='mt-4 relative'>
                                <label htmlFor="time-input" className='font-pop font-medium text-lg'>Pilih Waktu:</label>
                                <div className='relative inline-block'>
                                    <input
                                        id="time-input"
                                        type="time"
                                        value={time}
                                        onChange={handleTimeChange}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        className='ml-2 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#263F54] no-spinner '
                                    />
                                    {time === '' && !isFocused && (
                                        <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none'>
                                            HH:MM
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div>
                                slide button turn off and on
                            </div> */}
                            <h1 className='font-pop font-bold text-md sm:text-xl mb-2 mt-4'>{section.time}</h1>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
            <div className='flex md:flex-col gap-2 items-end justify-start'>
                        <button className={`flex items-center justify-center gap-2 p-2 w-36 rounded-md hover:scale-105 active:scale-95 transition duration-300 ease-in-out font-semibold ${
                        isActive
                            ? 'bg-[#2cd24d] text-white'  // Jika active true, hijau dan teks putih
                            :  'bg-[#FFFFFF] text-[#2cd24d]'// Jika active false, putih dan teks hijau
                    }`}
                            style={{
                                boxShadow: 'inset 4px 4px 4px rgba(0, 0, 0, 0.1)', // Inner shadow
                                filter: 'drop-shadow(1.5px 1.5px 0px rgba(0, 0, 0, 0.15))' // Drop shadow
                            }}
                            onClick={handleClickNotif}
                        >{isActive ? 'Notified' : 'Notify Me'}  <i className="fa-solid fa-bell"></i></button>
                        <button className='flex items-center justify-center gap-2 p-2 w-36 rounded-md bg-[#d22929] hover:scale-105 hover:bg-[#B00D0D] active:scale-95 transition duration-300 ease-in-out text-[#f1e8e8]'
                            style={{
                                boxShadow: 'inset 4px 4px 4px rgba(0, 0, 0, 0.1)', // Inner shadow
                                filter: 'drop-shadow(1.5px 1.5px 0px rgba(0, 0, 0, 0.15))' // Drop shadow
                            }}
                            onClick={handleAddFood}
                        >Eat Me <i className="fa-solid fa-utensils"></i></button>
            </div>
        </div>
    );
}

export default SectionCard;