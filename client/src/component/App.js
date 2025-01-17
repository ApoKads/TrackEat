import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Home from './Home-Before/Home';
import Footer from './Footer';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>}></Route>
        </Routes>
      <Footer/>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
