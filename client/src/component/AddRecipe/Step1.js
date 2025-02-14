import React from "react";
import MacroChart from "../calorie-tracker/MacroChart";
function Step1({
    foodName,
    servingSize,
    description,
    message,
    step,
    showMessage,
    calories,
    fat,
    protein,
    carbs,
    recipe,
    setFoodName,
    setServingSize,
    setDescription,
    setMessage,
    setStep,
    setShowMessage,
    setCalories,
    setFat,
    setProtein,
    setCarbs,
    setRecipe,
    handleAddFood,
    navigate,
    handleSave,
    handleDelete
})
{
    return<div className="w-full  flex flex-col p-4 gap-2">
    <div className="flex flex-col lg:flex-row gap-12 justify-center items-center lg:items-start min-h-screen relative p-2 sm:p-6 lg:p-8 ">
        <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg space-y-6">
            <div className="card2 p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-black">Recipe Name</h2>
                <input
                    type="text"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    placeholder="Enter Recipe name"
                    className="w-full p-2 border rounded"
                    
                />
                <p className="text-gray-500 text-lg">1 portion</p>
                <div className="mt-4">
                <h3 className="text-gray-700 font-semibold text-xl">Serving Size</h3>
                <input
                    type="text"
                    value={servingSize}
                    onChange={(e) => setServingSize(e.target.value)}
                    placeholder="Enter serving size (Example : 2 cups / 1 spoon / 100 gr)"
                    className="w-full p-2 border rounded"
                />
                </div>
            </div>

            <div className="card2 p-8 bg-white bg-opacity-90 rounded-lg shadow-lg flex flex-col gap-4" >
                <h3 className="text-gray-700 font-semibold text-xl">Description</h3>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                    className="w-full p-2 border rounded h-52"
                    rows={3}
                />
            </div>

            <div className="card2 p-8 bg-white bg-opacity-90 rounded-lg shadow-lg flex flex-col gap-4">
              <h3 className="text-gray-700 font-semibold text-xl">Recipe</h3>
              <ul className="text-gray-600 text-lg p-6 py-8 mt-2 flex flex-col gap-8  max-h-96 overflow-y-auto">
                {recipe.map((item, index) => (
                    // <div className="flex gap-2 w-full">
                        <li key={index} className="bg-[#f9f5eb] p-4 card1 flex justify-between w-full relative">
                            <button type="button" onClick={() => handleDelete(index)}  class="p-3 px-4 rounded-full absolute -top-5 -right-6 text-white bg-red-200 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium text-sm  text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 group transition duration-300 ease-in-out active:scale-105">
                            <i class="fa-solid fa-xmark text-red-800 group-hover:text-white transition duration-300 ease-in-out active:scale-105"></i>                       
                                </button>
                            <div className="flex flex-col w-1/2 justify-between">
                                <h1 className="font-pop font-bold text-xl">{item.name}</h1>
                                <h2>{item.calories}kcal</h2>
                            </div>
                            
                            <div className="flex flex-col w-1/2 justify-center items-end">
                                <h1>Carbs: {item.carbs}gr</h1>
                                <h1>Fat: {item.fat}gr</h1>
                                <h1>Protein: {item.protein}gr</h1>
                                
                            </div>
                        </li>
                    // </div>
                  
                ))}
              </ul>
                <button
                        onClick={handleAddFood}
                        className="text-lg bg-[#F8F7F2] px-20 py-3 hover:bg-ourLime rounded-xl card1 transition duration-300 hover:scale-105 active:scale-95"
                        >
                        {'Add your food here'}
                </button>
            </div>
          

        </div>

        <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
            <div className="card1 p-8 bg-white bg-opacity-90 rounded-lg shadow-lg ">
                <div className="flex flex-col gap-4 items-center ">
                    <h3 className="text-gray-700 font-bold text-3xl">Nutrient Details</h3>
                        <div className="card1 shadow-inner w-3/4 bg-blue-50 flex justify-evenly items-center p-4">
                            <MacroChart Macro={4} color={'#748DE0'} subValue={carbs} eaten={calories} />
                            <div className="flex flex-col items-center">
                            <p className="text-black font-medium font-pop text-xl md:text-3xl">{carbs.toFixed(2)}<span className="text-base md:text-xl"> gr</span></p>
                            <p className="text-gray-500 text-lg">Carbs</p>
                            </div>
                        </div>
                        <div className="card1 shadow-inner w-3/4 bg-orange-100 flex justify-evenly items-center p-4">
                            <MacroChart Macro={9} color={'#F27825'} subValue={fat} eaten={calories} />
                            <div className="flex flex-col items-center">
                            <p className="text-black font-medium font-pop text-xl md:text-3xl">{fat.toFixed(2)}<span className="text-base md:text-xl"> gr</span></p>
                            <p className="text-gray-500 text-lg">Fat</p>
                            </div>
                        </div>
                        <div className="card1 shadow-inner w-3/4 bg-green-100 flex justify-evenly items-center p-4">
                            <MacroChart Macro={4} color={'#44B695'} subValue={protein} eaten={calories} />
                            <div className="flex flex-col items-center">
                            <p className="text-black font-medium font-pop text-xl md:text-3xl">{protein.toFixed(2)}<span className="text-base md:text-xl"> gr</span></p>
                            <p className="text-gray-500 text-lg">Protein</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 w-3/4">
                             <h1 className="text-center font-pop font-medium text-xl">Total Kcal: {calories.toFixed(2)}</h1>
                            <div className={`p-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400 w-full self-center text-center ${showMessage ? 'block' : 'hidden'}`} role="alert">
                                <span className="font-medium">Attention!</span> All of the area must be filled.
                            </div>

                            <button
                            onClick={handleSave}
                            className="text-lg bg-[#F8F7F2] px-20 py-3 hover:bg-ourLime rounded-xl card1 transition duration-300 hover:scale-105 active:scale-95"
                            >
                            {'Save to your recipe'}
                            </button>
                        </div>
                </div>

            </div>
        </div>
    </div>
</div>
}
export default Step1;