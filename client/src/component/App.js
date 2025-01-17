import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Home from './Home-Before/Home';
import AboutUs from './About-us/file1';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/about-us' element={<AboutUs/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
