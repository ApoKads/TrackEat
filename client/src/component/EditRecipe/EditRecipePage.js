import React,{useState,useEffect} from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Step1 from "./Step1";
import Step2 from "../AddRecipe/Step2/Step2"
import axios from 'axios';

function EditRecipe(){

    const navigate = useNavigate();
    const {id} = useParams();
    const [foodName, setFoodName] = useState("");
    const [servingSize, setServingSize] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [step, setStep] = useState(1);
    const [showMessage, setShowMessage] = useState(false);
    
    const [calories,setCalories] = useState(0);
    const [fat,setFat] = useState(0);
    const [protein,setProtein] = useState(0);
    const [carbs,setCarbs] = useState(0);
    const [recipe,setRecipe] = useState([]);

    
    const handleAddToRecipe = (food) => {
        console.log("masuk");
        setRecipe([...recipe, food]);
    };
 
    const handleAddFood = () =>{
        setStep(2);
    }
    const handleBack = () =>{
        if(step === 1)return;
        setStep(step-1);
    }

    const calculateMacros = () => {
        let totalCalories = 0;
        let totalFat = 0;
        let totalProtein = 0;
        let totalCarbs = 0;

        // Loop through the recipe array and sum the macros
        recipe.forEach(food => {
            totalCalories += food.calories || 0;
            totalFat += food.fat || 0;
            totalProtein += food.protein || 0;
            totalCarbs += food.carbs || 0;
        });

        // Update the state with the new totals
        setCalories(totalCalories);
        setFat(totalFat);
        setProtein(totalProtein);
        setCarbs(totalCarbs);
    };

    const handleSave= async()=>{
        if(foodName===""||servingSize===""||description===""||calories===0){
            setMessage("All of the field must be filled!");
            setShowMessage(true);
            return;
        }
        try{
            const token = localStorage.getItem('token');
            const foodData = {
                name: foodName, 
                calories: calories, 
                protein: protein, 
                fat: fat, 
                carbs: carbs, 
                serving_size: servingSize, 
                type: 1, 
                description: description, 
            };
            console.log(id)
            console.log(foodData);
            const response = await axios.put(`/food/${id}`, foodData,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Food added successfully:", response.data.id);

            await axios.delete(`/recipe/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Delete Successfully");
            const recipeData ={
                recipe_id:id,
                recipes:recipe
            }
            console.log(recipeData)
            const result = await axios.post('/recipe',recipeData,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setMessage("Recipe added successfully!");
            navigate(`/meal-finder`)
        }catch(error)
        {
            console.error('Error saving recipes:', error);
        }
    }

    const handleDelete = (index) => {
        const updatedRecipe = recipe.filter((_, i) => i !== index); // Membuat array baru tanpa item yang dihapus
        setRecipe(updatedRecipe); // Update state `recipe`
    };

    useEffect(()=>{
        calculateMacros();
    },[recipe])

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
            setRecipe(foodData.recipe);
            console.log(foodData)
          } catch (error) {
            console.error("Error fetching food data:", error);
            alert("Failed to fetch food data. Please try again.");
          }
        };
    
        fetchFoodData();
      }, [id]); 
    
    return (
        <div className="p-4">
            
            {
                step===2 &&
                <button onClick={handleBack} className="w-20 mb-5 bg-gray-200 px-4 py-2 rounded-lg shadow-md text-lg font-semibold hover:bg-gray-300 transition-transform transform hover:scale-105 active:scale-95">Back</button>
            }

            {step === 1 &&
                <Step1
                    foodName={foodName}
                    servingSize={servingSize}
                    description={description}
                    message={message}
                    step={step}
                    showMessage={showMessage}
                    calories={calories}
                    fat={fat}
                    protein={protein}
                    carbs={carbs}
                    recipe={recipe}
                    setFoodName={setFoodName}
                    setServingSize={setServingSize}
                    setDescription={setDescription}
                    setMessage={setMessage}
                    setStep={setStep}
                    setShowMessage={setShowMessage}
                    setCalories={setCalories}
                    setFat={setFat}
                    setProtein={setProtein}
                    setCarbs={setCarbs}
                    setRecipe={setRecipe}
                    handleAddFood = {handleAddFood}
                    navigate={navigate}
                    handleSave={handleSave}
                    handleDelete={handleDelete}
                />
            }
            {step === 2 &&
                <Step2
                    handleAddToRecipe = {handleAddToRecipe}
                    handleBack={handleBack}
                />
            }
        </div>
    );
}

export default EditRecipe;


