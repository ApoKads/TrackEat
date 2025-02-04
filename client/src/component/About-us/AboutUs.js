import React from 'react';
import Header from '../Navbar/header';



function AboutUs() {
  return (
    <div>
            <Header/>
            <div className="flex justify-center items-center min-h-screen">
            <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl shadow-lg max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-2xl">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-[#F27825] mb-4">About TrackEat.</h1>
                <div className="bg-orange-100 p-6 sm:p-8 md:p-10 rounded-2xl border-2 border-[#ED427F]">
                    <p className="text-[#00000] font-medium text-sm sm:text-base md:text-lg mb-4">
                        At TrackEat, we’re dedicated to help you live a healthier, more balanced life. Our platform provides personalized tools like calorie tracking, meal planning, and progress monitoring to make your fitness journey easier.
                    </p>
                    <p className="text-[#00000] font-medium text-sm sm:text-base md:text-lg">
                        With a comprehensive food database and customizable goals, we empower you to make smarter nutritional choices and stay on track. Whether you’re aiming to lose weight, build muscle, or maintain your health, TrackEat is here to support you—one meal at a time.
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default AboutUs;