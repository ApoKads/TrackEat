import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import SearchBar from "./SearchBar";
import AllFood from "./AllFood";
import Pagination from "./Pagination";
import Header from "../Navbar/header";

const itemsPerPage = 15;

function FoodPage() {
  const location = useLocation();
  const [foods, setFoods] = useState([]); // Data makanan dari API
  const [filteredFoods, setFilteredFoods] = useState([]); // Data makanan yang difilter
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState(""); // State untuk kata kunci pencarian
  const [filterType, setFilterType] = useState(2); // 0: Food, 1: Recipe, 2: All

  // Ambil data makanan dari API
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/food", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFoods(response.data.rows);
      setFilteredFoods(response.data.rows); // Set data awal untuk filteredFoods
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fungsi untuk melakukan pencarian dan filter
  const handleSearchAndFilter = () => {
    let filtered = foods;

    // Filter berdasarkan tipe
    if (filterType !== 2) {
      filtered = filtered.filter((food) => food.type === filterType);
    }

    // Filter berdasarkan kata kunci
    if (searchTerm) {
      filtered = filtered.filter((food) =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFoods(filtered);
    setCurrentPage(1); // Reset ke halaman pertama setelah pencarian atau filter
  };

  // Ambil data saat komponen pertama kali di-render
  useEffect(() => {
    fetchData();
  }, []);

  // Jalankan handleSearchAndFilter setiap kali searchTerm atau filterType berubah
  useEffect(() => {
    handleSearchAndFilter();
  }, [searchTerm, filterType]);

  // Hitung data yang ditampilkan per halaman
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = filteredFoods.slice(firstPostIndex, lastPostIndex);

  return (
    <div>
      <Header />
      <div className="w-full flex flex-col sm:flex-row lg:px-12">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
        />
        <div className="flex sm:flex-col p-4 justify-between items-center gap-4">
          <p className="text-base font-pop font-light italic lg:text-center">
            Can't find what you're looking for?
          </p>
          <div className="flex sm:flex-col gap-2 sm:gap-4">
            <Link
              to="add-food"
              className="text-sm w-[5.5rem] sm:w-36 sm:font-medium font-pop text-center bg-ourLime py-2 sm:px-4 rounded-lg hover:scale-110 duration-300 ease-in-out"
              >
              Add new food
            </Link>
            <Link
              to="add-recipe"
              className="text-sm w-[5.5rem] sm:w-36 text-white sm:font-medium font-pop text-center bg-ourPink py-2 sm:px-4 rounded-lg hover:scale-110 duration-300 ease-in-out"
              >
              Add new recipe
            </Link>
          </div>
        </div>
      </div>

      <h2 className="px-4 py-8 font-pop font-semibold text-3xl xl:text-5xl xl:underline xl:px-16">
        Food <br className="md:hidden" />
        <span className="underline">Recommendations</span>
      </h2>

      <div className="w-full flex justify-center">
        <AllFood currentData={currentPosts} foodLength={filteredFoods.length} />
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
  );
}

export default FoodPage;