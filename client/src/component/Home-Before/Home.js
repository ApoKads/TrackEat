import React from 'react';
import HeroSection from './Hero';
import FourFitur from './4Fitur';
import ConButton from './ConButton';
function Home() {
  return (
    <div className="home">
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
