import React from 'react';
import Background from '../../assets/images/AboutUs/BackgroundAbout.png';
// import Header from '../Navbar/header';
import Header from '../Navbar/header'

function AboutUs() {
  return (
    <div 
      className="w-full bg-opacity-80 bg-cover bg-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
            <Header/>
            <div className="flex justify-center items-center min-h-screen">
            <div className="p-6 sm:p-8 md:p-10 lg:p-12 w-full lg:max-w-6xl mb-5 items-center text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-poppins mb-4 font-extrabold"
            style={{
                color: "#E8751A",
                background: "linear-gradient(to bottom, #FFA75D, #D55B11)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow:
                "inset 0px 3px 4px rgba(0, 0, 0, 0.4), inset 0px -2px 2px rgba(255, 255, 255, 0.3)",
            }}
        >
            About TrackEat.
        </h1>


            <div className="flex flex-col items-center w-full">
                <div className="p-6 sm:p-8 md:p-10 rounded-2xl items-center w-3/4">
                <p className="text-[#000000] font-medium text-sm sm:text-base md:text-md mb-4 font-inter">
                        At TrackEat, we're dedicated to help you live a healthier, more balanced life. Our platform provides personalized tools like calorie tracking, meal planning, and progress monitoring to make your fitness journey easier.
                    </p>
                    <p className="text-[#000000] font-medium text-sm sm:text-base md:text-md font-inter">
                        With a comprehensive food database and customizable goals, we empower you to make smarter nutritional choices and stay on track. Whether you're aiming to lose weight, build muscle, or maintain your health, TrackEat is here to support you—one meal at a time.
                    </p>

                </div>
            </div>
            </div>
        </div>
    </div>
  );
}

export default AboutUs;