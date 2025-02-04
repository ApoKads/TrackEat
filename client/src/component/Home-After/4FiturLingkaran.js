import React from 'react';
import { Link } from 'react-router-dom';
import imgHealth from '../../assets/images/HealthCalc.png'
import imgTracker from '../../assets/images/CalorieTracker.png'
import imgRecipe from '../../assets/images/RecipeFind.png'
import imgMeal from '../../assets/images/MealSche.png'
function FourFitur(){
    return (
        <div>
            <div className='flex justify-center items-center'>
                <div className="w-4/5 grid grid-rows-4 md:grid-rows-none md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
                    <div className='flex justify-center items-center'>
                        <Link to="/bmi-calculator" className='w-[90%] flex items-center justify-center'>
                            <div className='p-2 w-full rounded-3xl md:w-48 md:h-48 lg:w-56 lg:h-56 md:rounded-full bg-ourLime self-center flex md:flex-col items-center  justify-around md:justify-end shadow-lg group/Health hover:scale-110 hover:cursor-pointer duration-300 transition hover:brightness-95'>
                                <h2 className='text-lg font-pop font-black text-background lg:text-3xl text-center'>Health Calculator</h2>
                                <img src={imgHealth} alt="imgHealth" className='w-20 h-20 md:h-28 md:w-28 lg:w-32 lg:h-32'/>
                            </div>
                        </Link>
                    </div>
                    <div className='flex justify-center items-center'>
                        <Link to="meal-schedule" className='w-[90%] flex items-center justify-center'>
                            <div className='p-2 w-full rounded-3xl md:w-48 md:h-48 lg:w-56 lg:h-56 md:rounded-full bg-ourPink self-center flex md:flex-col items-center  justify-around md:justify-end shadow-lg group/Health hover:scale-110 hover:cursor-pointer duration-300 transition hover:brightness-95'>
                                <h2 className='text-lg font-pop font-black text-background lg:text-3xl text-center'>Meal Schedule</h2>
                                <img src={imgMeal} alt="imgMeal" className='w-20 h-20 md:h-28 md:w-28 lg:w-32 lg:h-32'/>
                            </div>
                        </Link>
                    </div>
                    <div className='flex justify-center items-center'>
                        <Link to="/calorie-tracker" className='w-[90%] flex items-center justify-center'>
                            <div className='p-2 w-full rounded-3xl md:w-48 md:h-48 lg:w-56 lg:h-56 md:rounded-full bg-ourBlue self-center flex md:flex-col items-center  justify-around md:justify-end shadow-lg group/Health hover:scale-110 hover:cursor-pointer duration-300 transition hover:brightness-95'>
                                <h2 className='text-lg font-pop font-black text-background lg:text-3xl text-center'>Calorie Tracker</h2>
                                <img src={imgTracker} alt="imgTracker" className='w-20 h-20 md:h-28 md:w-28 lg:w-32 lg:h-32'/>
                            </div>
                        </Link>
                    </div>
                    <div className='flex justify-center items-center'>
                        <Link to="/meal-finder" className='w-[90%] flex items-center justify-center'>
                            <div className='p-2 w-full rounded-3xl md:w-48 md:h-48 lg:w-56 lg:h-56 md:rounded-full bg-ourOrange self-center flex md:flex-col items-center  justify-around md:justify-end shadow-lg group/Health hover:scale-110 hover:cursor-pointer duration-300 transition hover:brightness-95'>
                                <h2 className='text-lg font-pop font-black text-background lg:text-3xl text-center'>Meals Finder</h2>
                                <img src={imgRecipe} alt="imgRecipe" className='w-20 h-20 md:h-28 md:w-28 lg:w-32 lg:h-32'/>
                            </div>
                        </Link>
                    </div>
                    </div>
            </div>
        </div>

        
    )
}

export default FourFitur;