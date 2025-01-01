import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import "./App.css"; 
import "bootstrap/dist/css/bootstrap.min.css"; // Correct Bootstrap CSS import 
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Correct Bootstrap JS import 
import Component from './Component/Home/BothComponent'; 
import Component1 from './Component/Home/BothComponent2'; 
import Banner from './Component/Home/Banner'; 
import Form from './Component/Home/Form'; 
import Footer from './Component/Home/Footer'; 
import Reviews from "./Component/Home/Reviews" 
import Signin from './Component/Authentication/signin'; 
import Signup from './Component/Authentication/signup'; 
import EmailVerify from './Component/Email Verification/EmailVerify'; 
import TourismBanner from './Component/Tourism/TourismBanner' 
import Banner2 from './Component/Tourism/Banner2'; 
import Description from './Component/Tourism/description'; 
import Destination from './Component/Tourism/Destination'; 
import Section from "./Component/Tourism/Section" 
import Guides from './Component/Tourism/Guides'; 
import Logo from './Component/Tourism/logo'; 
import Aboutus from "./Component/Home/AboutUs"; 
import Navbar from "./Component/Home/Navbar"; 
import ProtectedRoute from "./Component/Authentication/ProtectedRoute"; 
import TourismUploader from './Component/AdminPanel/TourismUploader' 
import TourismDelete from './Component/AdminPanel/TourismDelete' 
import FoodBanner from "./Component/Food/FoodBanner"; 
import OurStory from "./Component/Food/OurStory"; 
import Testimonials from "./Component/Food/Testimonial"; 
import Expert from "./Component/Food/Expert"; 
import Menu from "./Component/Food/Menu" 
import FoodUploader from "./Component/AdminPanel/FoodUploader" 
import FoodDelete from "./Component/AdminPanel/FoodDelete" 
import HeroSection from "./Component/CabBooking/HeroSection"; 
import FeaturedCars from "./Component/CabBooking/FeaturedCars"; 
import BannerCar  from "./Component/CabBooking/BannerCar"; 
import TestimonialSlider from "./Component/CabBooking/TestimonialSlider"; 
import Forgot from "./Component/Email Verification/Forgot"; 
import ResetPassword from "./Component/Email Verification/Reset"; 
import NewPassword from "./Component/Email Verification/NewPassword"; 
import CabUploader from "./Component/AdminPanel/CabUploader"; 
import CabDelete from "./Component/AdminPanel/CabDelete"; 
import AdminPage from "./Component/AdminPanel/AdminPage/AdminPage"; 
import NavbarCab from "./Component/CabBooking/NavbarCab";
import PublicRoute from "./Component/Authentication/PublicRoute";
import { Projector } from "lucide-react";
// import FoodUpdate from "./Component/AdminPanel/FoodUpdate"; 
function App() { 
  return ( 
    <> 
      <BrowserRouter> 
        <Routes> 
          <Route 
            path="/" 
            element={ 
              <> 
               <Navbar/> 
              <Banner/> 
              <Component/> 
              <Component1/> 
              <Aboutus/> 
              <Reviews/> 
              <Form/> 
              <Footer/> 
              </> 
            } 
          /> 
          <Route 
          path="Food" 
          element={ 
            <ProtectedRoute> 
              <> 
              <Navbar/> 
              <FoodBanner/> 
              <OurStory/> 
              <Menu/> 
              <Expert/> 
              <Testimonials/> 
              <Footer/> 
              </> 
            </ProtectedRoute> 
            } 
            /> 
          <Route 
            path="Tourism" 
            element={ 
              <ProtectedRoute> 
              <> 
              <Navbar/> 
              <TourismBanner/> 
              <Banner2/> 
              <Description/> 
              <Destination/> 
              <Section/> 
              <Guides/> 
              <Logo/> 
              <Footer/> 
              </> 
              </ProtectedRoute> 
            } 
          /> 
          <Route 
            path="Admin" 
            element={ 
              <> 
               {/* <Navbar/> */} 
              <AdminPage/> 
              {/* <Footer/> */} 
              </> 
            } 
          /> 

          <Route path="/login" 
          element={
          <PublicRoute>
          <>
          <Signin/>
          </>  
          </PublicRoute>
          }/> 
          <Route path="/signup"
          element={
          <PublicRoute>
          <>
          <Signup/>
          </>
          </PublicRoute>
          }/> 
          <Route path="/verify" 
          element={<EmailVerify/>}/> 
           
        <Route path="/Admin/tour/upload" element={<TourismUploader/>}></Route> 
        <Route path="/Admin/tour/delete" element={<TourismDelete/>}></Route> 
        <Route path="/Admin/food/upload" element={<FoodUploader/>}></Route> 
        <Route path="/Admin/food/delete" element={<FoodDelete/>}></Route> 
        {/* <Route path="/Admin/food/update" element={<FoodUpdate/>}></Route> */} 
        <Route path="/Admin/cab/delete" element={<CabDelete/>}></Route> 
        <Route path="/Admin/cab/upload" element={<CabUploader/>}></Route> 
        {/* <Route path="/Admin" element={<AdminPage/>}></Route> */} 
        <Route path="/CabBooking" element={ 
          <ProtectedRoute>
          <> 
          <NavbarCab/> 
          <HeroSection/> 
          <FeaturedCars/> 
          <BannerCar/> 
          <TestimonialSlider/> 
          <Footer/> 
          </> 
          </ProtectedRoute>
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