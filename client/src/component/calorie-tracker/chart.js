import React, { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function App() {
  const [value, setValue] = useState(70); // Set initial progress value
  const [nominal,setNominal] = useState(2045)

  // Function to update progress smoothly
  const increaseProgress = () => {
    setValue((prevValue) => (prevValue >= 100 ? 100 : prevValue + 10)); // Increase by 10, max 100
  };

  const decreaseProgress = () => {
    setValue((prevValue) => (prevValue <= 0 ? 0 : prevValue - 10)); // Decrease by 10, min 0
  };
  const formattedNominal = new Intl.NumberFormat('en-US').format(nominal);

  return (
    <div className='w-[28rem] h-[28rem] bg-red-500 flex justify-center items-center flex-col'>
      <CircularProgressbar
      className='flex items-center justify-center p-4 overflow-visible'
        value={value}
        text={
            <>
              <tspan x="50%" y="50%" dy="-0.2em" style={{ fontSize: '18px'}} className='font-pop font-black'>
              {formattedNominal}
              </tspan>
              <tspan x="50%" y="50%" dy="1.1em" style={{ fontSize: '7px' }}>
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
            strokeWidth: 12, // Thickness of the path
            transition: 'stroke-dashoffset 0.5s ease 0s', // Apply transition to the stroke path
          },
          text: {
            fill: '#222', // Text color
            fontSize: '2px', // Text size
          },
          trail: {
            stroke: '#d6d6d6', // Color for the background circle
            strokeWidth: 10,
          },
        }}
        animationDuration="0.5s" // Smooth animation over 0.5 
        viewBox="0 0 150 150"
      />
      
      
      <div style={{ marginTop: '20px' }}>
        <button onClick={increaseProgress}>Increase</button>
        <button onClick={decreaseProgress}>Decrease</button>
      </div>
    </div>
  );
}

export default App;
