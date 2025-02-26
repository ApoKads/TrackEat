import React from 'react';
// import { Link } from 'react-router-dom';
import AboutUsImage3 from '../../assets/images/AboutUs/AboutUsPhone2.png';
import AboutUs2 from '../../assets/images/AboutUs/AboutUs2.png';
import Text from '../../assets/images/AboutUs/TextTransition.png';
function ImageTransition(){
    return (
        <div className="flex flex-col bg-slate-50">
            <div className="w-full">
            {/* Desktop Image (Hidden on mobile) */}
            <img
            src={AboutUs2}
            alt="About Us Desktop"
            className="hidden sm:block w-full"
            />
            
            {/* Mobile Image (Hidden on larger screens) */}
            <img
            src={AboutUsImage3}
            alt="About Us Mobile"
            className="block sm:hidden w-full"
            />
            </div>

            <div className="flex flex-col items-start justify-center ml-10 p-4 bg-slate-50">
                {/* <p className="font-itim text-2xl text-center">
                    <span className="text-4xl">“</span> Track Mindfully,<br />Eat Happily <span className="text-4xl">”</span>
                </p> */}
            <img
            src={Text}
            alt="Text"
            className="h-36"
            />

            </div>
        </div>
    );
}

export default ImageTransition;