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

  const formattedNominal = new Intl.NumberFormat('en-US').format(props.calorie-props.eaten);

  return (
    <div className='w-[16rem] h-[16rem] md:w-[28rem] md:h-[28rem] flex justify-center items-center flex-col'>
      <CircularProgressbar
      className='flex items-center justify-center p-4 overflow-visible z-10'
        value={props.percentage}
        text={
          <>
            <tspan x="50%" y="50%" dy="-0.1em" style={{ fontSize: '18px'}} className="font-pop font-black">
              {formattedNominal}
            </tspan>
            <tspan x="50%" y="50%" dy="1.4em" style={{ fontSize: '7px', color: '#667786' }}>
              remaining
            </tspan>
          </>
        }
        styles={{
          root: {
            width: '100%',
            height: '100%',
          },
          path: {
            stroke: '#a4d453', // Color for the progress path
            strokeWidth: 11, // Thickness of the path
            transition: 'stroke-dashoffset 0.5s ease 0s', // Apply transition to the stroke path
            filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.2))'
          },
          text: {
            fill: '#667786', // Text color
            textShadow: '4px 4px 8px rgba(0, 0, 0, 0.3)'
          },
          trail: {
            stroke: '#F8F7F2', // Color for the background circle
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
