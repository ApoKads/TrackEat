import React from 'react';

const BMICategories = () => {
  const categories = [
    {
      range: '< 18.5',
      label1: 'Under',
      label2: 'weight',
      bgColor: 'bg-[#A9B2D6]',
      marginTop: 'mt-16',
    },
    {
      range: ' 18.5 - 24.9',
      label1: 'Normal',
      label2: '',
      bgColor: 'bg-ourLime',
      marginTop: 'mt-10',
    },
    {
      range: '25.0 - 29.9',
      label1: 'Over',
      label2: 'weight',
      bgColor: 'bg-ourOrange',
      marginTop: 'mt-16',
    },
    {
      range: '> 29.9',
      label1: 'Obese',
      label2: '',
      bgColor: 'bg-[#F38DB0]',
      marginTop: 'mt-10',
    },
  ];

  return (
<div className="w-full flex flex-col items-center md:flex md:w-full lg:flex-row">
  {/* Mobile Layout: Full-width stacked cards */}
  <div className="flex flex-col w-full gap-5 md:hidden">
    {categories.map((category, index) => (
      <div
        key={index}
        className={`w-full h-20 py-6 px-4 ${category.bgColor} rounded-xl shadow-md shadow-gray-400/40 flex items-center justify-between`}
      >
        <div className="flex flex-col">
          <p className="text-xl font-poppins font-extrabold text-black">
            {category.label1}
          </p>
          {category.label2 && (
            <p className="text-xl font-poppins font-extrabold text-black">
              {category.label2}
            </p>
          )}
        </div>
        <div className="w-36 h-14 bg-white border flex items-center rounded-xl justify-center shadow-xl text-center shadow-gray-500/50">
          <p className="text-lg font-semibold">{category.range}</p>
        </div>

      </div>
    ))}
  </div>

  {/* Tablet & Desktop Layouts remain unchanged */}
  <div className="hidden md:grid md:grid-cols-2 md:grid-rows-2 md:gap-4 lg:flex lg:flex-row lg:flex-wrap lg:justify-evenly lg:w-full">
    {categories.map((category, index) => (
      <div
        key={index}
        className={`md:w-52 md:h-52 ${category.bgColor} md:rounded-lg md:shadow-md md:flex md:items-center md:justify-center relative`}
      >
        <div className="md:bg-white md:border md:rounded-full md:shadow-lg md:flex md:justify-center md:items-center md:w-48 md:h-48">
          <div className="text-3xl font-semibold">{category.range}</div>
        </div>
        <div className="absolute flex h-52 w-52 items-start justify-end flex-col ml-4">
          <p className="text-4xl font-poppins font-extrabold drop-shadow-lg text-black">
            {category.label1}
          </p>
          {category.label2 && (
            <p className="text-4xl font-poppins font-extrabold drop-shadow-lg text-black">
              {category.label2}
            </p>
          )}
        </div>
      </div>
    ))}
  </div>
</div>

  

  );
};

export default BMICategories;