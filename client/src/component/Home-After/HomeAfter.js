import React ,{useContext}from 'react';
import Hero from './Hero';
import FourFitur from './4FiturLingkaran';
import Header from '../Navbar/header';
import axios from 'axios';
import { UserContext } from '../UserProvider';

function HomeAfter()
{
      const { user, loading } = useContext(UserContext); 
    //   console.log(user.first_name)
    
      if(loading)
      {
        return <p>Loading...</p>
      }
    return (
        <div>
            <Header/>
            <Hero name={user.first_name}/>    
            <FourFitur/>
        </div>
    )
}

export default HomeAfter;