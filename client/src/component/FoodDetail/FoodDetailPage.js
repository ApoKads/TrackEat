import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MacroChart from "../calorie-tracker/MacroChart";

function FoodDetailPage(){

    const { id } = useParams(); // Ambil ID dari URL
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // State untuk loading
    const [message, setMessage] = useState(''); // State untuk pesan sukses/error
    const [food, setFood] = useState({
        id: 0,
        name: '',
        serving_size: '',
        description: '',
        type: '',
        fat: 0,
        carbs: 0,
        protein: 0,
        calories: 0,
        user_id:0,
        recipe: [], // Data resep akan disimpan di sini
    });

    const handleNavigate = ()=>{
      if (food.type === 0) {
        navigate('edit-food'); // Navigasi ke '/edit-food' jika type === 0
    } else {
        navigate('edit-recipe'); // Navigasi ke '/edit-recipe' jika type !== 0
    }
    }

    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        // Fetch data makanan berdasarkan ID
        const fetchFoodDetail = async () => {
          try {
            const token = localStorage.getItem('token')
            const response = await axios.get(`/food/detail/${id}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFood(response.data);
            // console.log(food);
          } catch (error) {
            console.error('Error fetching food detail:', error);
          }
        };
    
        fetchFoodDetail();
        console.log(food);
      }, [id]);

      const handleAddFood = async () => {
        if (quantity < 1) {
          setMessage('Quantity must be at least 1');
          return;
        }
    
        setLoading(true);
        setMessage('');
    
        try {
          const token = localStorage.getItem('token');
          const food_id = food.id;
          const response = await axios.post(
            `/calorie-tracker`,
            { food_id, quantity },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          setMessage('Food added to log successfully!');
          navigate('/calorie-tracker');
        } catch (error) {
          console.error('Error adding food:', error);
          setMessage('Failed to add food to log. Please try again.');
        } finally {
          setLoading(false);
        }
      };
    

    const increaseQuantity = () => {
      setQuantity((prev) => prev + 1);
      console.log(food);
    };
  
    // Fungsi untuk mengurangi quantity
    const decreaseQuantity = () => {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    };
  
    // Fungsi untuk mengubah quantity secara manual
    const handleQuantityChange = (e) => {
      const value = parseInt(e.target.value, 10);
      if (!isNaN(value) && value >= 1) {
        setQuantity(value);
      }
    };

    const handleDelete = async() =>{
      const type = food.type
      const token = localStorage.getItem('token')
      if(type === 1){
        // delete recipe
        await axios.delete(`/recipe/${id}`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });

      }
      await axios.delete(`/food/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
      },
      })
      navigate('/meal-finder')
      // delete 
    }
    return <div className="w-full  flex flex-col p-4 gap-2">
      <div className="w-full flex justify-between ">
        <button onClick={()=>{navigate('/meal-finder')}} className="w-20 bg-gray-200 px-4 py-2 rounded-lg shadow-md text-lg font-semibold hover:bg-gray-300 transition-transform transform hover:scale-105 active:scale-95">Back</button>
        {food.user_id!==0 && (<div className="flex gap-4">
          <button onClick={handleDelete}
            className="flex justify-center items-center rounded-md bg-ourPink text-white px-4 py-2 w-32 hover:scale-105 active:scale-95 transition duration-300 ease-in-out"
            >
            Delete Food
          </button>
          <button onClick={handleNavigate}
            className="flex justify-center items-center rounded-md bg-ourLime text-black px-4 py-2 w-32 hover:scale-105 active:scale-95 transition duration-300 ease-in-out"
            >
            Edit Food
          </button>
        </div>)}
      </div>
    <div className="flex flex-col lg:flex-row gap-12 justify-center items-center lg:items-start min-h-screen relative p-2 sm:p-6 lg:p-8 ">
        <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg space-y-6">
            <div className="card2 p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-black">{food.name}</h2>
                <p className="text-gray-500 text-lg">1 portion</p>
                <div className="mt-4">
                <h3 className="text-gray-700 font-semibold text-xl">Serving Size</h3>
                <p className="text-gray-600 text-lg">{food.serving_size}</p>
                </div>
            </div>

            <div className="card2 p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
                <h3 className="text-gray-700 font-semibold text-xl">Description</h3>
                <p className="text-gray-600 text-lg mt-2 h-32 max-h-96 overflow-y-auto">{food.description}</p>
            </div>


            {food.type === 1 && (
            <div className="card2 p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
              <h3 className="text-gray-700 font-semibold text-xl">Recipe</h3>
              <ul className="text-gray-600 text-lg mt-2 flex flex-col gap-4  max-h-96 overflow-y-auto">
                {food.recipe.map((item, index) => (
                  <li key={index} className="bg-[#f5eedf] p-4 card1 flex justify-between w-full">
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
                ))}
                
              </ul>
            </div>
          )}
        </div>

        <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg">
            <div className="card1 p-8 bg-white bg-opacity-90 rounded-lg shadow-lg space-y-6 ">
                <div className="flex flex-col gap-4  items-center">
                    <h3 className="text-gray-700 font-bold text-3xl">Nutrient Details</h3>
                    <div className="nutrients flex flex-col  w-full md:w-3/4  gap-4">
                        <div className="card1 shadow-inner bg-blue-50 flex justify-evenly items-center p-4">
                            <MacroChart Macro={4} color={'#748DE0'} subValue={food.carbs} eaten={food.calories} />
                            <div className="flex flex-col items-center">
                            <p className="text-black font-medium font-pop text-xl md:text-3xl">{food.carbs.toFixed(2)}<span className="text-base md:text-xl"> gr</span></p>
                            <p className="text-gray-500 text-lg">Carbs</p>
                            </div>
                        </div>

                        <div className="card1 shadow-inner bg-orange-100 flex justify-evenly items-center p-4">
                            <MacroChart Macro={9} color={'#F27825'} subValue={food.fat} eaten={food.calories} />
                            <div className="flex flex-col items-center">
                            <p className="text-black font-medium font-pop text-xl md:text-3xl">{food.fat.toFixed(2)}<span className="text-base md:text-xl"> gr</span></p>
                            <p className="text-gray-500 text-lg">Fat</p>
                            </div>
                        </div>

                        <div className="card1 shadow-inner bg-green-100 flex justify-evenly items-center p-4">
                            <MacroChart Macro={4} color={'#44B695'} subValue={food.protein} eaten={food.calories} />
                            <div className="flex flex-col items-center">
                            <p className="text-black font-medium font-pop text-xl md:text-3xl">{food.protein.toFixed(2)}<span className="text-base md:text-xl"> gr</span></p>
                            <p className="text-gray-500 text-lg">Protein</p>
                            </div>
                        </div>
                        <h1 className="text-center font-pop font-medium text-xl">Total Kcal: {food.calories.toFixed(2)}</h1>
                        {/* Section Quantity */}
                        <div className="flex items-center gap-4 w-full justify-between">
                            <button
                              onClick={decreaseQuantity}
                              className="bg-gray-200 px-5 py-2 rounded-lg shadow-md text-lg font-semibold hover:bg-ourLime transition-transform transform hover:scale-105 active:scale-95"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={quantity}
                              onChange={handleQuantityChange}
                              className="p-2 border rounded text-center no-spinner"
                              min="1"
                            />
                            <button
                              onClick={increaseQuantity}
                              className="bg-gray-200 px-5 py-2 rounded-lg shadow-md text-lg font-semibold hover:bg-ourLime transition-transform transform hover:scale-105 active:scale-95"
                            >
                              +
                            </button>
                        </div>
                        <button
                          onClick={handleAddFood}
                          disabled={loading}
                          className="text-lg bg-[#F8F7F2] py-3 hover:bg-ourLime rounded-xl card1 transition duration-300 hover:scale-105 active:scale-95"
                        >
                          {loading ? 'Adding...' : 'Add to log'}
                        </button>

                        {/* Pesan Sukses/Error */}
                        {message && (
                          <p className={`text-center ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
                            {message}
                          </p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
}

export default FoodDetailPage;

// Tambahin Total Kalori

// Saya ingin menghitung total kalori dan juga fat, carbs, protein
// Ada default persentasi 30 50 20 untuk fat, carb protein
// step pertama, masukin kalori atau
// step pertama, dia suruh masukin fat, carbs ama protein ni,

// trus dikasi total calorie / macro nutrient yang dari system

// nah nanti muncul tombol naik sama tombol turun dibawah kalorienya
// trus dibawahnya tu ada yg persentase box (bisa default/ atau mengikuti inputan user), brp persen

// nah jadi klo misalnya dia pencet naik-> kalori nambah kelipatan 100 , trus fat, carbs ama proteinnya naik bedasarkan pembagian persentase
// klo misalnya pencet turun-> kalori nurun kelipatan 100 , trus fat dkk juga turun sama kek persentase

// validasi persentasenya , pas misalnya ganti ni dari 17 50 33-> dia harus nurunin dlu yang satu, baru naikin yg satu lagi


// jadi gini aja, kita klo misalnya awal awal, isi calorie atau macro
// ditengah tengah entar bisa ganti persentase nya pakai temp macro nutrient, cek validasi, confirm atau cancel
// ubah persentase asli dan ubah macro nutrient,

// klo ubah macro nutrientnya ya udh tinggal ubah, terus update persentase dan kalorie
// klo pencet naik atau turun, ya udh tinggal tambahin kalori dan bagi sesuai persentase