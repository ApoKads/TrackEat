import React,{useState,useEffect} from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NutrientForm from "./NutrientForm";

function EditFood(){

    const navigate = useNavigate();
    const { id } = useParams()
    const [foodName, setFoodName] = useState("");
    const [servingSize, setServingSize] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    
        const [calories,setCalories] = useState("");
        const [fat,setFat] = useState("");
        const [protein,setProtein] = useState("");
        const [carbs,setCarbs] = useState("");
        const [tempCarbs,setTempCarbs] = useState("");
        const [tempProtein,setTempProtein] = useState("");
        const [tempFat,setTempFat] = useState("");
        const [isEditingCalories, setIsEditingCalories] = useState(false);
    
        const [percentFat, setPercentFat] = useState(30); // Persentase lemak
        const [percentCarbs, setPercentCarbs] = useState(50); // Persentase karbohidrat
        const [percentProtein, setPercentProtein] = useState(20); // Persentase protein
        const [tempPercentFat, setTempPercentFat] = useState(30); // Persentase sementara lemak
        const [tempPercentCarbs, setTempPercentCarbs] = useState(50); // Persentase sementara karbohidrat
        const [tempPercentProtein, setTempPercentProtein] = useState(20); // Persentase sementara protein
    
        const [isEditingPercentage, setIsEditingPercentage] = useState(false); // Mode edit persentase
        const [isEditingMacro, setIsEditingMacro] = useState(false); // Mode edit persentase
    
    const handleEditFood = async()=>{
        if(foodName===""||servingSize===""||description===""||calories===0||calories===""){
            setMessage("All of the field must be filled!");
            setShowMessage(true);
            return;
        }
        try{
            const foodData = {
                name: foodName, 
                calories: calories, 
                protein: protein, 
                fat: fat, 
                carbs: carbs, 
                serving_size: servingSize, 
                type: 0, 
                description: description, 
            };
            const token = localStorage.getItem('token');
            const response = await axios.put(`/food/${id}`, foodData,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate(`/meal-finder/detail/${id}`);
        }catch(error)
        {
            console.error("Error inserting food data:", error);
            alert("Failed to insert food. Please try again.");
        }
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          e.target.blur(); // Menghilangkan fokus dari input
        }
      };

    useEffect(()=>{
        setShowMessage(false);
    },[description,foodName,servingSize,calories,fat,carbs,protein])

    useEffect(() => {
        const fetchFoodData = async () => {
          try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`/food/detail/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            const foodData = response.data;
    
            // Isi nilai default pada state
            setFoodName(foodData.name);
            setServingSize(foodData.serving_size);
            setDescription(foodData.description);
            setCalories(foodData.calories);
            setFat(foodData.fat);
            setProtein(foodData.protein);
            setCarbs(foodData.carbs);
          } catch (error) {
            console.error("Error fetching food data:", error);
            alert("Failed to fetch food data. Please try again.");
          }
        };
    
        fetchFoodData();
      }, [id]); 

    return <div className="w-full  flex flex-col p-4 gap-2">
    <button onClick={()=>{navigate(-1)}} className="w-20 bg-gray-200 px-4 py-2 rounded-lg shadow-md text-lg font-semibold hover:bg-gray-300 transition-transform transform hover:scale-105 active:scale-95">Back</button>
    <div className="flex flex-col lg:flex-row gap-12 justify-center items-center lg:items-start min-h-screen relative p-2 sm:p-6 lg:p-8 ">
        <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg space-y-6">
            <div className="card2 p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-black">Food Name</h2>
                <input
                    type="text"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    placeholder="Enter food name"
                    className="w-full p-2 border rounded"
                    onKeyDown={handleKeyDown}
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
                    onKeyDown={handleKeyDown}

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
                    onKeyDown={handleKeyDown}

                    rows={3}
                />
            </div>


        </div>

        <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
            <div className="card1 p-8 bg-white bg-opacity-90 rounded-lg shadow-lg ">
                <div className="flex flex-col gap-4  items-center ">
                    <h3 className="text-gray-700 font-bold text-3xl">Nutrient Details</h3>
                    <NutrientForm
                        foodName={foodName}
                        setFoodName={setFoodName}
                        servingSize={servingSize}
                        setServingSize={setServingSize}
                        description={description}
                        setDescription={setDescription}
                        calories={calories}
                        setCalories={setCalories}
                        fat={fat}
                        setFat={setFat}
                        protein={protein}
                        setProtein={setProtein}
                        carbs={carbs}
                        setCarbs={setCarbs}
                        tempCarbs={tempCarbs}
                        setTempCarbs={setTempCarbs}
                        tempProtein={tempProtein}
                        setTempProtein={setTempProtein}
                        tempFat={tempFat}
                        setTempFat={setTempFat}
                        percentFat={percentFat}
                        setPercentFat={setPercentFat}
                        percentCarbs={percentCarbs}
                        setPercentCarbs={setPercentCarbs}
                        percentProtein={percentProtein}
                        setPercentProtein={setPercentProtein}
                        tempPercentFat={tempPercentFat}
                        setTempPercentFat={setTempPercentFat}
                        tempPercentCarbs={tempPercentCarbs}
                        setTempPercentCarbs={setTempPercentCarbs}
                        tempPercentProtein={tempPercentProtein}
                        setTempPercentProtein={setTempPercentProtein}
                        isEditingPercentage={isEditingPercentage}
                        setIsEditingPercentage={setIsEditingPercentage}
                        isEditingMacro={isEditingMacro}
                        setIsEditingMacro={setIsEditingMacro}
                        isEditingCalories={isEditingCalories}
                        setIsEditingCalories={setIsEditingCalories}
                    />
                        {/* <MacroCalculator/> */}
                        <div className="flex flex-col gap-4">
                            <div className={`p-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400 w-full self-center text-center ${showMessage ? 'block' : 'hidden'}`} role="alert">
                                <span className="font-medium">Attention!</span> All of the area must be filled.
                            </div>
                            <button
                            onClick={handleEditFood}
                            className="text-lg bg-[#F8F7F2] px-20 py-3 hover:bg-ourLime rounded-xl card1 transition duration-300 hover:scale-105 active:scale-95"
                            >
                            {'Save to your food'}
                            </button>
                        </div>
                </div>

            </div>
        </div>
    </div>
</div>
}

export default EditFood;

