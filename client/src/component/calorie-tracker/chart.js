import React, { useState ,useEffect} from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// import './chart.css';

function Chart(props) {

  // Testing Unit

  // Function to update progress smoothly
  // const increaseProgress = () => {
  //   props.setEaten((prevEaten) => {
  //     // Prevent exceeding the total calorie limit
  //     const newEaten = prevEaten + 100;
  //     return newEaten >= props.calorie ? props.calorie : newEaten;
  //   });
  // };

  // const decreaseProgress = () => {
  //   props.setEaten((prevEaten) => {
  //     // Prevent going below zero calories
  //     return prevEaten <= 0 ? 0 : prevEaten - 100;
  //   });
  // };
  const difference = props.calorie - props.eaten;

  // Jika eaten > calorie, hitung nilai absolute dan ubah warna
  const isExceeded = difference < 0;
  const displayValue = Math.abs(difference); // Nilai absolute
  const pathColorTrail = isExceeded ? '#a4d453' : '#F8F7F2'; // Orange jika exceeded, hijau jika tidak
  const pathColorPath = isExceeded ? '#F27825' : '#a4d453'; // Orange jika exceeded, hijau jika tidak
  const textRemaining = isExceeded ? 'exceeded' : 'remaining'; // Ubah teks jika exceeded
  // const newPercentage // untuk persentase lebihnya brp persen
  let percentage;
  if (isExceeded) {
    // Jika melebihi, hitung persentase berdasarkan kelebihan
    percentage = (displayValue / props.calorie) * 100;
  } else {
    // Jika tidak, hitung persentase berdasarkan yang sudah dimakan
    percentage = ((props.calorie - difference) / props.calorie) * 100;
  }
  // Format nominal
  const formattedNominal = new Intl.NumberFormat('en-US').format(displayValue);


  return (
    <div className='w-[16rem] h-[16rem] md:w-[28rem] md:h-[28rem] flex justify-center items-center flex-col'>
      <CircularProgressbar
      className='flex items-center justify-center p-4 overflow-visible z-10'
        value={isExceeded?  percentage :props.percentage}
        text={
          <>
            <tspan x="50%" y="50%" dy="-0.1em" style={{ fontSize: '18px'}} className="font-pop font-black">
              {formattedNominal}
            </tspan>
            <tspan x="50%" y="50%" dy="1.4em" style={{ fontSize: '7px', color: '#667786' }}>
              {isExceeded?'Surplus':'remaining'}
            </tspan>
          </>
        }
        styles={{
          root: {
            width: '100%',
            height: '100%',
          },
          path: {
            stroke: pathColorPath, // Color for the progress path
            strokeWidth: 10, // Thickness of the path
            transition: 'stroke-dashoffset 0.5s ease 0s', // Apply transition to the stroke path
            filter: 'drop-shadow(0 8px 12px rgba(0, 0, 0, 0.2))'
          },
          text: {
            fill: '#667786', // Text color
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
          },
          trail: {
            stroke: pathColorTrail, // Color for the background circle
            strokeWidth: 10,
            filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5))'

          },
        }}
        animationDuration="0.5s" // Smooth animation over 0.5 
        viewBox="0 0 150 150"
      />
      
      
      
      {/* <div style={{ marginTop: '20px' }}>
        <button onClick={increaseProgress}>Increase</button>
        <button onClick={decreaseProgress}>Decrease</button>
      </div> */}
    </div>
  );
}

export default Chart;
