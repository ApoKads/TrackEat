import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Home from './Home-Before/Home';
import Footer from './Footer';
import AboutUs from './About-us/AboutUs';
import ProtectedRoute from './ProtectedRoute';
// import Login from './Login/LoginSementara.js';
import Login from './Login/Login.js';
import Register from './Register/Register.js';
import Sections from './Register/Sections.js';
import HomeAfter from './Home-After/HomeAfter.js';
import Header from './Navbar/header.js';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/Section' element={<ProtectedRoute><Sections/></ProtectedRoute>}></Route>
          <Route path='/home' element={<ProtectedRoute><HomeAfter/></ProtectedRoute>}></Route>
          <Route path='/about-us' element={<ProtectedRoute><AboutUs/></ProtectedRoute>}></Route>
        </Routes>
      {/* <Footer/> */}
      </div>
    </BrowserRouter>
    
  );
}

export default App;
