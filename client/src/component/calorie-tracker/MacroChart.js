import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// import './chart.css';

function MacroChart({ eaten, subValue, Macro, color, width = 36, height = 36, mobileWidth=20, mobileHeight=20 }) {
    

  // Fungsi untuk menghitung persentase berdasarkan eaten dan subValue
  const calculatePercentage = () => {
    if(eaten === 0)return 0;
    return ((subValue*Macro) / eaten) * 100;
  };

  const [value, setValue] = useState(calculatePercentage()); // Set initial progress value
  
  useEffect(() => {
    setValue(calculatePercentage());  // Update persentase setiap kali eaten atau subValue berubah
  }, [eaten, subValue]);

  return (
    <div className={`w-20 h-20 sm:w-36 sm:h-36 justify-center items-center flex-col`}>
      <CircularProgressbar
        className='flex items-center justify-center p-2 overflow-visible z-10 font-pop font-semibold'
        value={value}
        text={`${Math.round(value)}%`} // Menampilkan persentase yang dibulatkan

        styles={{
          root: {
            width: '100%',
            height: '100%',
          },
          path: {
            stroke: color, // Color for the progress path
            strokeWidth: 11, // Thickness of the path
            transition: 'stroke-dashoffset 0.5s ease 0s', // Apply transition to the stroke path
            filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.2))'
          },
          text: {
            fill: color, // Text color
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
          },
          trail: {
            stroke: '#F8F7F2', // Color for the background circle
            strokeWidth: 10,
            filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5))'
          },
        }}
        animationDuration="0.5s" // Smooth animation over 0.5 seconds
        viewBox="0 0 150 150"
      />
    </div>
  );
}

export default MacroChart;
