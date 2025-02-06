import React,{useState,useEffect} from "react";
import MacroChart from "../calorie-tracker/MacroChart";

function FoodDetailPage(){

    const [food,setFood] = useState('');
    const [portion,setPortion] = useState('');
    const [servingSize,setServingSize] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState('');
    const [recipe,setRecipe] = useState([]);
    const [fat,setFat] = useState(0);
    const [carbs,setCarbs] = useState(0);
    const [protein,setProtein] = useState(0);

    const handleAddFood =()=>{
        console.log('fak')
    }

    return <div className="w-full  flex flex-col p-4 gap-2">
    <button class="w-20 bg-gray-200 px-4 py-2 rounded-lg shadow-md text-lg font-semibold hover:bg-gray-300 transition-transform transform hover:scale-105 active:scale-95">Back</button>
    <div class="flex flex-col lg:flex-row gap-12 justify-center items-center lg:items-start min-h-screen relative p-2 sm:p-6 lg:p-8 ">
        <div class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg space-y-6">
            <div class="card2 p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
                <h2 class="text-3xl font-bold text-black">Boiled Egg</h2>
                <p class="text-gray-500 text-lg">1 portion</p>
                <div class="mt-4">
                <h3 class="text-gray-700 font-semibold text-xl">Serving Size</h3>
                <p class="text-gray-600 text-lg">50 gr</p>
                </div>
            </div>

            <div class="card2 p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
                <h3 class="text-gray-700 font-semibold text-xl">Description</h3>
                <p class="text-gray-600 text-lg mt-2">A boiled egg is a cooked egg with a firm white and a creamy yolk, perfect for a healthy meal.</p>
            </div>

            <div class="card2 p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
                <h3 class="text-gray-700 font-semibold text-xl">Recipe</h3>
                <p class="text-gray-600 text-lg mt-2">1. Place eggs in a pot of water.<br/>2. Bring to a boil and cook for 7-10 minutes.<br/>3. Remove and cool in ice water.<br/>4. Peel and
                serve.</p>
            </div>
        </div>

        <div class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <div class="card1 p-8 bg-white bg-opacity-90 rounded-lg shadow-lg space-y-6 ">
                <div class="flex flex-col gap-4  items-center">
                    <h3 class="text-gray-700 font-bold text-3xl">Nutrient Details</h3>
                    <div class="nutrients flex flex-col  w-full md:w-3/4  gap-4">
                        <div class="card1 shadow-inner bg-blue-50 flex justify-evenly items-center p-4">
                            <MacroChart Macro={4} color={'#748DE0'} subValue={70} eaten={1000} />
                            <div className="flex flex-col items-center">
                            <p class="text-black font-medium font-pop text-xl md:text-3xl">0.4<span className="text-base md:text-xl"> gr</span></p>
                            <p class="text-gray-500 text-lg">Carbs</p>
                            </div>
                        </div>

                        <div class="card1 shadow-inner bg-orange-100 flex justify-evenly items-center p-4">
                            <MacroChart Macro={9} color={'#F27825'} subValue={40} eaten={1000} />
                            <div className="flex flex-col items-center">
                            <p class="text-black font-medium font-pop text-xl md:text-3xl">0.4<span className="text-base md:text-xl"> gr</span></p>
                            <p class="text-gray-500 text-lg">Fat</p>
                            </div>
                        </div>

                        <div class="card1 shadow-inner bg-green-100 flex justify-evenly items-center p-4">
                            <MacroChart Macro={4} color={'#44B695'} subValue={80} eaten={1000} />
                            <div className="flex flex-col items-center">
                            <p class="text-black font-medium font-pop text-xl md:text-3xl">0.4<span className="text-base md:text-xl"> gr</span></p>
                            <p class="text-gray-500 text-lg">Protein</p>
                            </div>
                        </div>

                    </div>
                    <button onClick={handleAddFood} class="text-lg bg-[#F8F7F2] py-3 px-8 md:px-32 rounded-xl card1 ">Add to log</button>
                </div>

            </div>
        </div>
    </div>
</div>
}

export default FoodDetailPage;