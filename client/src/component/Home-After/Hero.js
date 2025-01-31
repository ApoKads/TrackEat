import React from 'react';

function Hero(prop)
{
    return (
        <div>
            <section id='NameSection' className='w-full flex flex-col justify-center items-center p-20'>
                <h1 className='text-5xl md:text-8xl font-pop font-black text-fontBlueHome drop-shadow'>Hi, {prop.name}!</h1>
                <h2 className='text-xl md:text-3xl font-pop font-medium text-fontGrayHome drop-shadow'>Let's Continue your journey!</h2>
            </section>
        </div>
    )
}

export default Hero;