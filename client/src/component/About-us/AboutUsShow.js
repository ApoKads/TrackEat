import React from 'react';
import AboutUs from './AboutUs'
import ImageTransition from './ImageTransition'
import Fitur1 from './4Fitur'
import Teams from './Teams'

function AboutUsShow() {
  return (
    <div
    className="home -mb-96">
      <AboutUs/>
      <ImageTransition/>
      <div class="bg-slate-50"></div>
      <Fitur1/>
      <div class=" bg-slate-50"></div>
      <Teams/>
    </div>
  );
}

export default AboutUsShow;
