import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Correct Bootstrap CSS import
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Correct Bootstrap JS import
import Forgot from "./Component/Email Verification/Forgot";
import ResetPassword from "./Component/Email Verification/Reset";
import NewPassword from "./Component/Email Verification/NewPassword";
import Signin from './Component/Authentication/signin';
import Signup from './Component/Authentication/signup';
import EmailVerify from './Component/Email Verification/EmailVerify';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login"
          element={<Signin/>}/>
          <Route path="/signup"
          element={<Signup/>}/>
          <Route path="/verify"
          element={<EmailVerify/>}/>
        <Route path="/Admin/upload" element={<TourismUploader/>}></Route>
        <Route path="/Admin/delete" element={<TourismDelete/>}></Route>
        <Route path="/Admin/food/upload" element={<FoodUploader/>}></Route>
        <Route path="/Admin/food/delete" element={<FoodDelete/>}></Route>
        <Route path="/CabBooking" element={
          <>
          <HeroSection/>
          <FeaturedCars/>
          <BannerCar/>
          <TestimonialSlider/>
          </>
        }>
          </Route>
        <Route path='/forgot' element={<Forgot/>}/>
        <Route path='/reset' element={<ResetPassword/>}/>
        <Route path='/verify' element={<EmailVerify/>}/>
        <Route path='/newpass' element={<NewPassword/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

