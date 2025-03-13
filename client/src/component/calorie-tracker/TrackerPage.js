import React, { useState ,useEffect,useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// import './chart.css';
import Chart from './chart';
import Header from '../Navbar/header';
import MacroChart from './MacroChart';
import bulleyes from '../../assets/images/CalorieTracker/bulleyes.png';
import sendokgarpu from '../../assets/images/CalorieTracker/garpusendok.png';
import plus from '../../assets/images/CalorieTracker/plus.png';
import { UserContext } from '../UserProvider';

function TrackerPage() {
    // const navigate = useNavigate();
    // const calculateEat = ()=>{
    //     return (fat*9) + (protein*4) + (carbs*4);
    //   }
    
    //   const calculatePercentage=()=>{
    
    //     return(1-(calorie-eaten)/calorie)*100;
    //   }

    //   const [calorie,setCalorie] = useState(2545);
    //   const [fat, setFat] = useState(70);
    //   const [protein, setProtein] = useState(120);
    //   const [carbs, setCarbs] = useState(50);
    //   const [eaten, setEaten] = useState(calculateEat);
    //   const [percentage, setPercentage] = useState(calculatePercentage);

    //   const formattedCalorie = new Intl.NumberFormat('en-US').format(calorie);
    //   const formattedEaten = new Intl.NumberFormat('en-US').format(eaten);

    //   const handleAddFood=()=>{
    //     navigate('/meal-finder');
    //   }

    //   useEffect(() => {
    //       setPercentage(calculatePercentage(eaten));
    //     }, [eaten, calorie, fat, carbs,protein]); 

    const navigate = useNavigate();    
    const { user, loading } = useContext(UserContext); 
    const user_id = user.id
    const [totals, setTotals] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });
    
    useEffect(() => {
        // Fetch data nutrisi hari ini
        const fetchTodayNutrition = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/calorie-tracker/today-nutrition/${user_id}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTotals(response.data);
          } catch (error) {
            console.error('Error fetching nutrition data:', error);
          }
        };
    
        fetchTodayNutrition();
      }, [user_id]);

      const calculatePercentage = () => {
        return ((1 - (calorie - totals.calories) / calorie) * 100).toFixed(2);
      };
    const [calorie, setCalorie] = useState(Math.round(user.dailycalories));
    const [percentage, setPercentage] = useState(calculatePercentage);
    const formattedCalorie = new Intl.NumberFormat('en-US').format(calorie);
    const formattedEaten = new Intl.NumberFormat('en-US').format(totals.calories);


    const handleAddFood = () => {
        navigate('/meal-finder');
      };

      useEffect(() => {
        setPercentage(calculatePercentage());
      }, [totals.calories, calorie]);
    
    if(loading)
        {
            return <div>loading...</div>
        }

  return (
    <div>
        <Header/>
        <div className='w-full flex flex-col gap-8 lg:flex-row lg:gap-0 mt-10 sm:mt-0'>
            <div className='w-full lg:w-1/2  p-2 sm:p-8 flex flex-col justify-center items-center gap-4 '>
                <h1 className='font-pop font-semibold text-4xl opacity-75'>Daily Goals</h1>
                <Chart
                calorie = {calorie}
                eaten = {totals.calories}
                percentage = {percentage}
                />
                <div className='w-full sm:w-3/4 lg:w-full bg-[#f5eedf] flex items-center justify-evenly py-4 rounded-3xl' style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='font-pop text-semibold  text-xl opacity-75'>Carbs</h1>
                        <MacroChart Macro={4} color={'#748DE0'} subValue={totals.carbs} eaten={totals.calories}/>
                        <h1 className='font-pop text-semibold  text-xl opacity-75'>{totals.carbs.toFixed(2)} <span className='text-[#7B8B99]'>gr</span></h1>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='font-pop text-semibold  text-xl opacity-75'>Fat</h1>
                        <MacroChart Macro={9} color={'#F27825'} subValue={totals.fat} eaten={totals.calories}/>
                        <h1 className='font-pop text-semibold  text-xl opacity-75'>{totals.fat.toFixed(2)} <span className='text-[#7B8B99]'>gr</span></h1>

                    </div>
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className='font-pop  text-semibold text-xl opacity-75'>Protein</h1>
                        <MacroChart Macro={4} color={'#44B695'} subValue={totals.protein} eaten={totals.calories}/>
                        <h1 className='font-pop text-semibold  text-xl opacity-75'>{totals.protein.toFixed(2)} <span className='text-[#7B8B99]'>gr</span></h1>
                    </div>
                </div>
                        
            </div>
            <div className='w-full  lg:w-1/2 border-solid p-2 px-8 mt-10 sm:mt-0 sm:p-8 flex flex-col justify-evenly  gap-16 sm:gap-8 lg:gap-0'>
                    <div className='w-full flex justify-center items-center'>
                        <h1 className='text-3xl md:text-4xl font-pop font-bold text-gray-700 lg:text-5xl xl:text-6xl tracking-wide my-shadow text-center lg:text-start'>Track every calorie you consume!</h1>
                    </div>

                    <div className='flex flex-col gap-8 justify-center items-center'>
                        <div className='w-full sm:w-1/2 lg:w-full flex justify-start items-start gap-6'>
                            <div className='flex'>
                                <img src={bulleyes} alt="bulleyes" />
                            </div>
                            <div className='flex flex-col justify-between'>
                                <h1 className='font-pop text-2xl font-medium '>Daily Goals</h1>
                                <h1 className='text-2xl sm:text-4xl lg:text-6xl xl:text-7xl font-pop font-bold text-gray-700' style={{filter: 'drop-shadow(0 2px 2px rgb(0 0 0 / 0.3))'}}>{formattedCalorie}</h1>
                            </div>
                        </div>

                        <div className='w-full sm:w-1/2 lg:w-full flex justify-start items-start gap-6'>
                            <div className='flex'>
                                <img src={sendokgarpu} alt="garpusendok" />
                            </div>
                            <div className='flex flex-col justify-between'>
                                <h1 className='font-pop text-2xl font-medium '>Consumed Calories</h1>
                                <h1 className='text-2xl sm:text-4xl lg:text-6xl xl:text-7xl font-pop font-bold text-gray-700' style={{filter: 'drop-shadow(0 2px 2px rgb(0 0 0 / 0.3))'}}>{formattedEaten}</h1>
                            </div>
                        </div>
                        
                    </div>

                    <div className='flex flex-col items-center justify-center gap-4'>
                        <h1 className='font-pop text-xl sm:text-3xl text-black opacity-90 font-semibold ' style={{filter: 'drop-shadow(0 2px 2px rgb(0 0 0 / 0.1))'}}>Had your meal?</h1>
                        <div className='flex flex-col justify-center items-center w-full gap-2'>
                            <button onClick={handleAddFood} className='bg-white p-2 border-black drop-shadow-xl shadow-inner rounded-xl hover:scale-110 hover:brightness-90 transition duration-300 ease-in-out'> <img src={plus} alt="" /></button>
                            <p>Add Food</p>
                        </div>
                    </div>
            </div>
        </div>

    </div>
  );
}

export default TrackerPage;
