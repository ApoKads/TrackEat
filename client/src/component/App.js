import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Home from './Home-Before/Home';
import Footer from './Footer';
import AboutUs from './About-us/AboutUs';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login/LoginSementara';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/about-us' element={<ProtectedRoute><AboutUs/></ProtectedRoute>}></Route>
        </Routes>
      <Footer/>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
