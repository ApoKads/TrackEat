import React from "react";
import FoodCard from './FoodCard';

function AllFood({currentData,foodLength})
{
    return(
        <div className='w-full p-4 grid grid-cols-1 gap-4 md:grid-cols-5 xl:w-[90%]'>
                {currentData.map((food) => (
                    <FoodCard key={food.id} id={food.id} name={food.name} calories ={food.calories}/>
                    ))}
        </div>
    )
}

export default AllFood;