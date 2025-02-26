import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Home from './Home-Before/Home';
import Footer from './Footer';
import AboutUsShow from './About-us/AboutUsShow.js';
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
import TrackerPage from './calorie-tracker/TrackerPage.js';
import FoodDetailPage from './FoodDetail/FoodDetailPage.js';
import Profile from './Profile/Profile.js';
import AddFood from './AddFood/AddFoodPage.js';
import AddRecipe from './AddRecipe/AddRecipePage.js';
import EditFood from './EditFood/EditFoodPage.js';
import EditRecipe from './EditRecipe/EditRecipePage.js';
import SchedulePage from './Schedule/SchedulePage.js';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route path='/' element={
            <PublicRoute>
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
                {/* <UserProvider> */}
                  <Sections/>
                {/* </UserProvider> */}
              </ProtectedRoute>
            }></Route>

          <Route path='/home' element={
            <ProtectedRoute>
              <UserProvider>
                <RegistrationRoute>
                  <HomeAfter/>
                  {/* <AgeInput></AgeInput> */}

                </RegistrationRoute>
              </UserProvider>
            </ProtectedRoute>}></Route>

          <Route path='/about-us' element={
            <ProtectedRoute>
              <UserProvider>
                <RegistrationRoute>
                  <AboutUsShow/>
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
            <Route path='/meal-finder/add-food' element={
            <ProtectedRoute>
              <UserProvider>
                <RegistrationRoute>
                  <AddFood/>
                </RegistrationRoute>
              </UserProvider>
            </ProtectedRoute>}></Route>

            <Route path='/meal-finder/add-recipe' element={
            <ProtectedRoute>
              <UserProvider>
                <RegistrationRoute>
                    <AddRecipe/>
                </RegistrationRoute>
              </UserProvider>
            </ProtectedRoute>}></Route>

            
            
            <Route path='/meal-finder/detail/:id' element={
            <ProtectedRoute>
              <UserProvider>
                <RegistrationRoute>
                    <FoodDetailPage/>
                </RegistrationRoute>
              </UserProvider>
            </ProtectedRoute>}></Route>

            <Route path='/meal-finder/detail/:id/edit-food' element={
            <ProtectedRoute>
              <UserProvider>
                <RegistrationRoute>
                    <EditFood/>
                </RegistrationRoute>
              </UserProvider>
            </ProtectedRoute>}></Route>

            <Route path='/meal-finder/detail/:id/edit-recipe' element={
            <ProtectedRoute>
              <UserProvider>
                <RegistrationRoute>
                    <EditRecipe/>
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
            

            <Route path='/calorie-tracker' element={
            <ProtectedRoute>
              <UserProvider>
                <RegistrationRoute>
                  <TrackerPage/>
                </RegistrationRoute>
              </UserProvider>
            </ProtectedRoute>}></Route>
            
            <Route path='/profile' element={
            <ProtectedRoute>
              <UserProvider>
                <RegistrationRoute>
                  <Profile/>
                </RegistrationRoute>
              </UserProvider>
            </ProtectedRoute>}></Route>

            <Route path='/meal-schedule' element={
            <ProtectedRoute>
              <UserProvider>
                <RegistrationRoute>
                  <SchedulePage/>
                </RegistrationRoute>
              </UserProvider>
            </ProtectedRoute>}></Route>

        </Routes>
      <Footer/>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
