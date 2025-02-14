import React,{ useState ,useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios'
import SearchBar from './SearchBar';
import AllFood from './AllFood';
import Pagination from './Pagination';


const foodData = [];

const itemsPerPage = 15;

function Step2(props)
{
  const location = useLocation();
  const [foods, setFoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(15);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = foods.slice(firstPostIndex,lastPostIndex);
  console.log(firstPostIndex);

    
  const fetchData = async () => {
        try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/food', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response);
        setFoods(response.data.rows);
        } catch (error) {
            console.log('error plis')
        console.error('Error fetching data:', error);
        }
    };

    useEffect(()=>{
        // props.handleAddToRecipe(1);
        fetchData();
    },[]);

    return (
        <div>
            <div className='w-full flex flex-col lg:flex-row lg:px-12'>
                <SearchBar/>
                <p className='text-base font-pop font-bold italic lg:text-center'>Click the food you want to add to your recipe!</p>

            </div>

            <h2 className='px-4 py-8 font-pop font-semibold text-3xl xl:text-5xl xl:underline xl:px-16'>Choose your Food!</h2>

            <div className='w-full flex justify-center'>
                <AllFood 
                currentData={currentPosts}
                foodLength={foods.length}
                handleAddToRecipe = {props.handleAddToRecipe}
                handleBack = {props.handleBack}
                />
            </div>

            <div className="flex justify-center mt-4">
                <Pagination
                    totalPosts={foods.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    
                />
            </div>
        </div>
    )
}

export default Step2;