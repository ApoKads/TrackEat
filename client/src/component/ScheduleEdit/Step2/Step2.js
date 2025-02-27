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
  const [filteredFoods, setFilteredFoods] = useState([]); // Data makanan yang difilter
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState(""); // State untuk kata kunci pencarian
    
  const fetchData = async () => {
        try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/food', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const filteredFood = response.data.rows.filter(food => food.type === 0);

        // Set state dengan data yang sudah difilter
        setFoods(filteredFood);
        setFilteredFoods(filteredFood);
        } catch (error) {
            console.log('error plis')
        console.error('Error fetching data:', error);
        }
    };

    const handleSearchAndFilter = () => {
        let filtered = foods;
        
        // Filter berdasarkan kata kunci
        if (searchTerm) {
          filtered = filtered.filter((food) =>
            food.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
    
        setFilteredFoods(filtered);
        setCurrentPage(1); // Reset ke halaman pertama setelah pencarian atau filter
      };

    useEffect(()=>{
        // props.handleAddToRecipe(1);
        fetchData();
    },[]);

      useEffect(() => {
        handleSearchAndFilter();
      }, [searchTerm]);

    const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredFoods.slice(firstPostIndex, lastPostIndex);
    return (
        <div>
            <div className='w-full flex flex-col lg:flex-row lg:px-12'>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                />
                <p className='text-base font-pop font-bold italic lg:text-center'>Click the food you want to add to your Schedule!</p>

            </div>

            <h2 className='px-4 py-8 font-pop font-semibold text-3xl xl:text-5xl xl:underline xl:px-16'>Choose your Food!</h2>

            <div className='w-full flex justify-center'>
                <AllFood 
                currentData={currentPosts}
                foodLength={filteredFoods.length}
                addFoodToSection = {props.addFoodToSection}
                handleBack = {props.handleBack}
                />
            </div>

            <div className="flex justify-center mt-4">
                <Pagination
                    totalPosts={filteredFoods.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    
                />
            </div>
        </div>
    )
}

export default Step2;