import React from 'react';
import FacebookFooter from '../assets/images/FacebookFooter.jpg';
import GoogleFooter from '../assets/images/GoogleFooter.jpg';
import InstaFooter from '../assets/images/InstaFooter.jpg';
import XFooter from '../assets/images/XFooter.jpg';
import Mail from '../assets/images/MailFooter.jpg';
import Telp from '../assets/images/TelpFooter.jpg';
import Logo from '../assets/images/TrackEatFooter.jpg';

function Footer () {
  return (
    <div className='mt-96'>

    <footer className="flex flex-row bg-white border-t border-gray-200 w-full gap-y-5">
      <div className="w-full mx-auto flex flex-col md:flex-row justify-start gap-x-20 items-center p-5 gap-y-5 md:gap-y-0">
        <div className="flex flex-col items-center justify-center">
          <img src={Logo} alt="Track Eat Logo" className="w-28 h-28" />
          <div className="max-w-7xl mx-auto mt-4 text-center text-gray-500 text-xs">
            Copyright © 2024 All rights reserved
          </div>
        </div>

        <p className="relative text-gray-600 text-xl md:text-xl">Track Mindfully, Eat Happily.</p>

        <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-center">
          <div className="mr-8 text-center items-center">
            <p className="font-medium">More about Track Eat</p>
            <div className="flex mt-2 space-x-3">
              <a href="#">
                <img src={FacebookFooter} alt="Facebook" className="social-icon" />
              </a>
              <a href="#">
                <img src={GoogleFooter} alt="Google" className="social-icon" />
              </a>
              <a href="#">
                <img src={InstaFooter} alt="Instagram" className="social-icon" />
              </a>
              <a href="#">
                <img src={XFooter} alt="X" className="social-icon" />
              </a>
            </div>
          </div>

        </div>
          <div className="flex flex-col items-center text-center">
            <p className="font-medium">Contact Us</p>
            <div className="flex flex-row">
              <a href="mailto:trackeatofcg@gmail.com" className="text-gray-600 text-sm md:text-base flex items-center">
                <img src={Mail} alt="Email" className="social-icon mr-2" />
                trackeatofcg@gmail.com
              </a>
            </div>
            <div className="flex flex-row">
              <img src={Telp} alt="Phone" className="social-icon mr-2" />
              <p className="text-gray-600 text-sm md:text-base">0877-7358-111</p>
            </div>
          </div>
      </div>
    </footer>
    </div>

  );
};

export default Footer;