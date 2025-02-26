import React from 'react';
import AboutUs from './AboutUs'
import ImageTransition from './ImageTransition'
import Fitur1 from './4Fitur'
import Teams from './Teams'

function AboutUsShow() {
  return (
    <div
    className="home">
      {/* <Header/> */}
      <AboutUs/>
      {/* <div class="mb-32"></div> */}
      <ImageTransition/>
      <div class="mb-1 bg-slate-50"></div>
      <Fitur1/>
      <div class="mb-10 bg-slate-50"></div>
      <Teams/>
    </div>
  );
}

export default AboutUsShow;
