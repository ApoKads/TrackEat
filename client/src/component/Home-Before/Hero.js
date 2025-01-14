import React from 'react';
import logo from '../../assets/images/Logo.png';

function HeroSection() {
  return (
    <div className="Landing">
       <section id="Hero-Section" className="h-48 w-full flex flex-col justify-center items-center lg:h-64">
        <div className="w-full h-full shadow-xg justify-evenly items-center flex flex-col relative lg:flex-row lg:justify-center">
            <div className="w-full bg-slate-50 absolute h-28 -z-10 shadow-lg bottom-0 border-solid border-t-2 border-gray-200 lg:bottom-auto lg:h-32"></div>
            <img src={logo} alt="logo" className="w-44 lg:w-96"/>
            <h1 className="text-2xl text-slate-500 font-medium lg:text-5xl"><span className="italic font-extrabold">Track</span> Mindfully,<span className="font-extrabold italic">Eat</span> Happily</h1>
        </div>
    </section>
    </div>
  );
}

export default HeroSection;
