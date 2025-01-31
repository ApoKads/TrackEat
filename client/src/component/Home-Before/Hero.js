import React, { useState, useEffect } from 'react';
import logo1 from '../../assets/images/Logo/Logo Orange.png';
import logo2 from '../../assets/images/Logo/Logo Blue.png';
import logo3 from '../../assets/images/Logo/Logo Pink.png';
import logo4 from '../../assets/images/Logo/Logo Lime.png';

const logo = [logo1, logo2, logo3, logo4];

function HeroSection() {
  const [currentLogo, setCurrentLogo] = useState(logo[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Mulai transisi fade-out
      setIsTransitioning(true);

      // Setelah fade-out, ganti gambar dan mulai fade-in
      setTimeout(() => {
        const currentIndex = logo.indexOf(currentLogo);
        const nextIndex = (currentIndex + 1) % logo.length;
        setCurrentLogo(logo[nextIndex]);
        setIsTransitioning(false); // Selesaikan transisi
      }, 700); // Waktu fade-out
    }, 2000); // Interval perpindahan gambar

    return () => clearInterval(intervalId);
  }, [currentLogo]);

  return (
    <div className="Landing">
      <section id="Hero-Section" className="h-48 w-full flex flex-col justify-center items-center lg:h-64">
        <div className="w-full h-full shadow-xg justify-evenly items-center flex flex-col relative lg:flex-row lg:justify-center">
          <div className="w-full bg-slate-50 absolute h-28 -z-10 shadow-lg bottom-0 border-solid border-t-2 border-gray-200 lg:bottom-auto lg:h-32"></div>
          <div className="relative w-44 lg:w-[26rem]">
            <img
              src={currentLogo}
              alt="logo"
              className={`w-full transition-opacity duration-500 ease-in-out ${
                isTransitioning ? 'opacity-80' : 'opacity-100'
              }`}
            />
          </div>
          <h1 className="-mt-5 lg:-mt-0 text-slate-500 font-medium lg:text-5xl">
            <span className="italic font-extrabold">Track</span> Mindfully,{' '}
            <span className="font-extrabold italic">Eat</span> Happily
          </h1>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;