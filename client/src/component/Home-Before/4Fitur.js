import React from 'react';
import imgCalculator from '../../assets/images/HealthCalc.png';
import imgMeal from '../../assets/images/MealSche.png';
import imgTracker from '../../assets/images/CalorieTracker.png';
import imgRecipe from '../../assets/images/RecipeFind.png';


function FourFitur() {
  return (
    <div className="FourFitur">
        <section id="Fitur" className="flex items-center justify-center flex-col bg-red w-full">
        <h1 className="text-6xl text-center text-slate-500 font-extrabold py-3 mb-3 ">Our Features</h1>
        <div id="4FiturMobile" className="w-full bg-blue-300 sm:hidden">
            <div className="bg-ourLime p-3 relative flex-col flex justify-around items-center h-[80vh] text-center">
                <h1 className="text-slate-50 font-extrabold text-4xl mb-2">Health Calculator</h1>
                <h2 className="italic text-center text-xl">Don't guess anymore!<br/> Calculate your BMI and get the answer!</h2>
    
                <img src={imgCalculator} alt="imgCalc" className=""/>
            </div>
            <div className="bg-ourPink p-3 relative flex-col flex justify-around items-center h-[80vh]">
                <h1 className="text-slate-50 font-extrabold text-4xl mb-2">Meal Schedule</h1>
                <h2 className="italic text-center text-xl">Your meals, your rules<br/>. Create a personalized meal plan today!</h2>
    
                <img src={imgMeal} alt="imgMeal" />
            </div>
            
            <div className="bg-ourBlue p-3 relative flex-col flex justify-around items-center h-[80vh] text-center">
                <h1 className="text-slate-50 font-extrabold text-4xl mb-2">Calorie Tracker</h1>
                <h2 className="italic text-center mb-2 text-xl">Your Health, Your Data. <br/>Track Your Calories, Achieve Your Goals.</h2>
                <img src={imgTracker} alt="imgTracker" />
            </div>

            <div className="bg-ourOrange p-3 relative flex-col flex justify-around items-center h-[80vh] text-center">
                <h1 className="text-slate-50 font-extrabold text-4xl mb-2">Recipe</h1>
                <h2 className="italic text-center mb-2 text-xl">Bank full of recipes for your
                    healthy meal!<br/>Make your own right now!</h2>
                <img src={imgRecipe} alt="imgRecipe" />
            </div>
        </div>
        <div id="4FiturDesktop" className="w-full flex justify-center p-4">
            <div className="hidden w-full gap-6 px-10 sm:grid sm:grid-cols-2 md:grid-rows-2 lg:grid-rows-1 lg:grid-cols-4">
                <div className="bg-ourLime p-3 relative flex-col flex justify-around items-center text-center rounded-3xl shadow-2xl hover:scale-105 hover:cursor-pointer hover:brightness-90 transition duration-300 ease-in-out group/box1">
                    <h1 className="text-slate-50 font-extrabold text-4xl mb-2 ">Health Calculator</h1>
                    <h2 className="italic text-center">Don't guess anymore!<br/> Calculate your BMI and get the answer!</h2>
        
                    <img src={imgCalculator} alt="imgCalc" className="group-hover/box1:scale-110 transition duration-300 ease-in-out"/>
                </div>
                <div className="bg-ourPink p-3 relative flex-col flex justify-around items-center text-center rounded-3xl shadow-2xl hover:scale-105 hover:cursor-pointer hover:brightness-90 transition duration-300 ease-in-out group/box2">
                    <h1 className="text-slate-50 font-extrabold text-4xl mb-2">Meal Schedule</h1>
                    <h2 className="italic text-center">Your meals, your rules<br/>. Create a personalized meal plan today!</h2>
        
                    <img src={imgMeal} alt="imgMeal" className="group-hover/box2:scale-110 transition duration-300 ease-in-out"/>
                </div>
                <div className="bg-ourBlue p-3 relative flex-col flex justify-around items-center text-center rounded-3xl shadow-2xl hover:scale-105 hover:cursor-pointer hover:brightness-90 transition duration-300 ease-in-out group/box3">
                    <h1 className="text-slate-50 font-extrabold text-4xl mb-2">Calorie Tracker</h1>
                    <h2 className="italic text-center mb-2">Your Health, Your Data. <br/>Track Your Calories, Achieve Your Goals.</h2>
                    <img src={imgTracker} alt="imgTracker" className="group-hover/box3:scale-110 transition duration-300 ease-in-out"/>
                </div>
                <div className="bg-ourOrange p-3 relative flex-col flex justify-around items-center text-center rounded-3xl shadow-2xl hover:scale-105 hover:cursor-pointer hover:brightness-90 transition duration-300 ease-in-out group/box4">
                    <h1 className="text-slate-50 font-extrabold text-4xl mb-2">Recipe</h1>
                    <h2 className="italic text-center mb-2">Bank full of recipes for your
                        healthy meal!<br/>Make your own right now!</h2>
                    <img src={imgRecipe} alt="imgRecipe" className="scale-110 group-hover/box4:scale-125 transition duration-300 ease-in-out"/>
                </div>
            </div>
        </div>        
    </section>
    </div>
  );
}

export default FourFitur;
