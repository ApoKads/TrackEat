import React from 'react';
import Defin from '../../assets/images/AboutUs/Defin.jpg'
import Jojo from '../../assets/images/AboutUs/Jojo.jpg'
import Pat from '../../assets/images/AboutUs/Pat.jpg'
import Theora from '../../assets/images/AboutUs/Theora.jpg'
import Background2 from '../../assets/images/AboutUs/Background2.png'

const teamMembers = [
  { src: Jojo, name: "Jojo", position: "Fullstack Developer" },
  { src: Defin, name: "Defin", position: "Fullstack Developer" },
  { src: Pat, name: "Patricia", position: "Fullstack Developer" },
  { src: Theora, name: "Theora", position: "Fullstack Developer" },
];

function Teams(){
    return (

      <div
        className="flex flex-col items-center p-8 bg-opacity-80 bg-cover bg-center"
        style={{ backgroundImage: `url(${Background2})` }}
      >
        {/* Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black font-poppins mb-4" style={{
                color: "#E8751A",
                textShadow: "0px 2px 2px rgba(0, 0, 0, 0.3), inset 0px 1px 2px rgba(255, 255, 255, 0.2)"
                }}>
                The Teams
        </h1>
  
        <div className="flex flex-col lg:flex-row items-center lg:items-start w-full max-w-5xl mt-5">
          {/* Images */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-6 lg:w-1/2 lg:gap-x-0 sm:scale-100 text-center">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center gap-0">
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full bg-gray-300 overflow-hidden">
                <img
                  src={member.src}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-semibold mt-2">{member.name}</p>
              <p className="italic text-gray-700">{member.position}</p>
            </div>
          ))}
        </div>
  
          {/* Text Content */}
          <div className="w-full lg:w-1/2 lg:pl-8 mt-6 lg:mt-0 lg:mb-0">
            <p className="text-black text-center md:text-justify font-inter text-md ml-3 mt-5 lg:mt-0 lg:text-xl">
            Our team of four passionate full-stack developers—Jojo, Defin, Theora, and Pat—is dedicated to building TrackEat, a powerful and user-friendly website designed to help individuals monitor their nutrition and fitness goals. Combining our expertise in front-end and back-end development, we are creating a seamless platform that enables users to track their daily calorie intake, plan meals, and monitor progress effortlessly. With a shared commitment to innovation and user experience, we strive to make TrackEat an essential tool for anyone looking to lead a healthier lifestyle.
            </p>
          </div>
        </div>
      </div>
    );
}

export default Teams;