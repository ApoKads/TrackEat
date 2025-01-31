import React from 'react';
import Hero from './Hero';
import FourFitur from './4FiturLingkaran';
import Header from '../Navbar/header';
function HomeAfter()
{
    return (
        <div>
            <Header/>
            <Hero name='Defin'/>    
            <FourFitur/>
        </div>
    )
}

export default HomeAfter;