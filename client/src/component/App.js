import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Home from './Home-Before/Home';
import Footer from './Footer';
import AboutUs from './About-us/AboutUs';
import ProtectedRoute from './Route/ProtectedRoute.js';
import RegistrationRoute from './Route/RegistrationRoute.js';
import PublicRoute from './Route/PublicRoute.js';
import Login from './Login/Login.js';
import Register from './Register/Register.js';
import Sections from './Register/Sections.js';
import HomeAfter from './Home-After/HomeAfter.js';
import { UserProvider } from './UserProvider';
import GoogleCallback from './Google/GoogleCallback.js';
import FoodPage from './FoodList/FoodPage.js';
import BMICalculator from './Bmi-Calculator/BMIPage.js';
import Chart from './calorie-tracker/chart.js';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route path='/' element={
            <PublicRoute>
              {/* <Chart/> */}
              <Home/>
            </PublicRoute>
          } />

          <Route path='/login' element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />

          <Route path='/register' element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />

          <Route path="/auth/google/callback" element={
            <PublicRoute>
              <GoogleCallback />
            </PublicRoute>
          } />
          
          <Route path='/section' element={
              <ProtectedRoute>
                <UserProvider>
                  <Sections/>
                </UserProvider>
              </ProtectedRoute>
            }></Route>

          <Route path='/home' element={
            <ProtectedRoute>
              <UserProvider>
                <RegistrationRoute>
                  <HomeAfter/>
                </RegistrationRoute>
              </UserProvider>
            </ProtectedRoute>}></Route>

          <Route path='/about-us' element={
            <ProtectedRoute>
              <UserProvider>
                <RegistrationRoute>
                  <AboutUs/>
                </RegistrationRoute>
              </UserProvider>
              </ProtectedRoute>
            }></Route>
          <Route path='/meal-finder' element={
            <ProtectedRoute>
              <UserProvider>
                <RegistrationRoute>
                  <FoodPage/>
                </RegistrationRoute>
              </UserProvider>
            </ProtectedRoute>}></Route>

            <Route path='/bmi-calculator' element={
            <ProtectedRoute>
              <UserProvider>
                <RegistrationRoute>
                  <BMICalculator/>
                </RegistrationRoute>
              </UserProvider>
            </ProtectedRoute>}></Route>

        </Routes>
      {/* <Footer/> */}
      </div>
    </BrowserRouter>
    
  );
}

export default App;
