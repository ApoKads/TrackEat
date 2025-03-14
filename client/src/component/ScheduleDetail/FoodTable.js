import React from "react";

function FoodTable({food}){
    return (
        <div className='grid grid-cols-[20%,20%,20%,20%,20%] sm:grid-cols-[25%,15%,15%,15%,15%,1fr]'>
                        <h1 className='flex justify-start items-end font-pop font-medium text-sm sm:text-xl'>{food.name}</h1>
                        <div className='flex flex-col justify-center items-center'>
                            <h1 className='font-pop font-normal text-sm sm:text-xl'>{food.calories}</h1>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <h1 className='font-pop font-normal text-sm sm:text-xl'>{food.carbs}</h1>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <h1 className='font-pop font-normal text-sm sm:text-xl'>{food.fat}</h1>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <h1 className='font-pop font-normal text-sm sm:text-xl'>{food.protein}</h1>
                        </div>
                        {/* <div className='flex flex-col justify-center items-center hover:scale-110 active:scale-95 transition'>
                            <div className=" flex justify-center items-center rounded-full border-red-700 border-2 w-6 h-6">
                            <i class="fa-solid fa-minus text-red-700"></i>
                            </div>
                        </div> */}
        </div>
    )
}

export default FoodTable;