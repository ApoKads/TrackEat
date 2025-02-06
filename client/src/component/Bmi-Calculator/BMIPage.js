import React, { useState } from 'react';
import CalculateBMI from './CalculateBMI';
import PopupResult from './BMIPopup';
import BMICategories from './BMICategories';
import BackgroundImage from '../../assets/svg/background.svg';
import Header from '../Navbar/header';

const GenderSelection = ({ selectedSex, setSelectedSex }) => {
  return (
    <div className="flex justify-center gap-4 mb-6">
      {/* Male Button */}
      <button
        className={`px-6 py-2 rounded-lg w-28 font-bold transition-all duration-300 ${
          selectedSex === "Male"
            ? "bg-blue-500 text-white shadow-md"
            : "bg-gray-200 text-black hover:bg-blue-300"
        }`}
        onClick={(e) => {
          e.preventDefault(); // Prevent form submission
          setSelectedSex("Male");
        }}
      >
        Male
      </button>

      {/* Female Button */}
      <button
        className={`px-6 py-2 rounded-lg font-bold transition-all duration-300 w-28 ${
          selectedSex === "Female"
            ? "bg-pink-500 text-white shadow-md"
            : "bg-gray-200 text-black hover:bg-pink-300"
        }`}
        onClick={(e) => {
          e.preventDefault();
          setSelectedSex("Female");
        }}
      >
        Female
      </button>
    </div>
  );
};

const BMICalculator = () => {
  const [age, setAge] = useState('');
  const [selectedSex, setSelectedSex] = useState(''); // ✅ Moved state here
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);

  const handleCalculate = () => {
    const result = CalculateBMI(height, weight);
    setBmiResult(result);
  };

  return (
    <div 
    className=""
    >
      <Header></Header>
      <div className='w-full h-10'></div>
      <div className="text-left w-full p-4">
        <h1 className="text-4xl font-bold mb-4">
          Body <span className="text-gray-600">Mass</span> Index
        </h1>
        <BMICategories />
        <div className="mb-14"></div>

        {/* Form Section */}
        <div className="w-full flex flex-col justify-evenly items-center mb-4">
          <form className=" w-full flex flex-col md:flex-row justify-center items-center">
            <div className="space-y-4 w-80 justify-center text-center items-center flex flex-col">
              <label htmlFor="age" className="block text-lg font-bold mb-1">
                Age
              </label>
              <input
                id="age"
                type="number"
                placeholder="Fill in your age"
                className="w-60 p-2 border border-gray-300 rounded-lg"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />

              <div className="text-left font-bold text-black mb-4 text-lg">
                Select sex
              </div>

              {/* ✅ Using the GenderSelection component here */}
              <GenderSelection selectedSex={selectedSex} setSelectedSex={setSelectedSex} />
            </div>

            <div className="space-y-4 w-80 justify-center items-center flex flex-col">
              <label htmlFor="height" className="block text-lg font-bold mb-1">Height</label>
              <input 
                type="number" 
                id="height" 
                className="w-60 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                placeholder="Height (in cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              <label htmlFor="weight" className="block text-lg font-bold mb-1">Weight</label>
              <input 
                type="number" 
                id="weight" 
                className="w-60 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                placeholder="Weight (in kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </form>

          <button 
            type="button" 
            className="w-60 rounded-3xl bg-gray-200 text-black py-2 shadow-md hover:bg-lime-300 transition ease-in-out delay-100 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-5"
            onClick={handleCalculate}
          >
            Calculate
          </button>
            <div className ="mt-10"></div>
          <PopupResult result={bmiResult} />
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
