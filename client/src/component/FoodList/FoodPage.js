import React,{ useState ,useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import SearchBar from './SearchBar';
import AllFood from './AllFood';
import Pagination from './Pagination';
import Header from '../Navbar/header';

const foodData = [];

const itemsPerPage = 15;

function FoodPage()
{
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
        console.log(response)
        setFoods(response.data.rows);
        } catch (error) {
            console.log('error plis')
        console.error('Error fetching data:', error);
        }
    };

    useEffect(()=>{
        fetchData();
    },[]);

    return (
        <div>
            <Header/>
            <div className='w-full flex flex-col lg:flex-row lg:px-12'>
                <SearchBar/>
                <div className='flex lg:flex-col p-4 justify-between items-center gap-4'>
                    <p className='text-base font-pop font-light italic lg:text-center'>Can't find what you're looking for?</p>
                    <Link to="add-food" className='text-sm font-medium font-pop text-center bg-ourLime py-2 px-4 rounded-lg hover:scale-110 duration-300 ease-in-out'>
                        Add new food
                    </Link>
                </div>
            </div>

            <h2 className='px-4 py-8 font-pop font-semibold text-3xl xl:text-5xl xl:underline xl:px-16'>Food <br className='md:hidden'/><span className='underline'>Recommendations</span></h2>

            <div className='w-full flex justify-center'>
                <AllFood currentData={currentPosts} foodLength={foods.length}/>
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

export default FoodPage;