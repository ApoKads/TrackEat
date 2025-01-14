import React from 'react';
// import Header from '../header';
import HeroSection from './Hero';
import FourFitur from './4Fitur';
import ConButton from './ConButton';
function Home() {
  return (
    <div className="home">
      {/* <Header/> */}
      <HeroSection/>
      <div class="mb-32"></div>
      <FourFitur/>
      <div class="mb-5"></div>
      <ConButton/>
      <div class="mb-32"></div>
    </div>
  );
}

export default Home;
