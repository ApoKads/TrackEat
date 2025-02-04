import React ,{useState,useEffect} from 'react';
const colors = ['ourLime','ourBlue', 'ourPink', 'ourOrange'];

const PopupResult = ({ result }) => {
    const [currentColor, setCurrentColor] = useState(colors[0]);

    useEffect(() => {
              const intervalId = setInterval(() => {
              const currentIndex = colors.indexOf(currentColor);
              const nextIndex = (currentIndex + 1) % colors.length;
              setCurrentColor(colors[nextIndex]);
            }, 2000);
        
            return () => clearInterval(intervalId);
          }, [currentColor]);
    if (!result) return null;

    return (
        <div className={`bg-${currentColor} border-0 rounded-lg w-2/4 h-80 p-2 justify-center items-center gap-36 transition duration-300 ease-in-out`}>
            <p className="text-4xl lg:text-6xl font-bold text-white underline mb-7 ml-3">Result</p>
            <p className="text-2xl lg:text-5xl font-bold text-white mb-7 ml-7">{result.category}</p>
            <p className="text-xl lg:text-3xl font-medium text-white mb-3 ml-7">BMI: {result.bmi}</p>
            <p className="text-lg lg:text-2xl font-medium text-white ml-7">{result.advice}</p>
        </div>
    );
};

export default PopupResult;
