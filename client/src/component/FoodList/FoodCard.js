import React from "react";
import { useNavigate } from 'react-router-dom';

function FoodCard(props)
{
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate(`/meal-finder/detail/${props.id}`);
      };
    
    return(
        <div className="w-full flex justify-center items-center">
            <div key={props.id} onClick={handleOnClick} className='w-full bg-[#F8F7F2] shadow-lg h-10 rounded-md p-2 flex justify-between hover:brightness-95 group md:flex-col md:p-4 md:w-36 lg:w-40 md:h-36 xl:w-48 xl:h-48 xl:p-6 md:flex-wrap md:justify-center md:overflow-hidden hover:cursor-pointer md:border-[#F0ECDA] md:border-solid md:border-2'>
                    <h3 className='font-pop font-semibold group-hover:scale-110 group-hover:translate-x-5 transtition duration-300 ease-in-out md:w-full md:h-3/4 md:text-2xl md:flex md:items-start md:group-hover:translate-x-0'>{props.name}</h3> 
                    <h3 className='font-pop font-normal text-[#7B8B99] group-hover:scale-110 group-hover:-translate-x-5 transtition duration-300 ease-in-out md:w-full md:h-1/4 md:flex md:text-end md:items-end md:justify-end md:group-hover:-translate-x-0'>{props.calories}kcal</h3>
            </div>
        </div>
    )
}

export default FoodCard;