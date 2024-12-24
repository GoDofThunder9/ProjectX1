import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./Component/Authentication/ProtectedRoute";
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
function App() {
  return (
    <>
      <BrowserRouter>
          <Navbar/>
        <Routes>
          <Route
            path="/"
            element={
              <>
              <Banner/>
              <Component/>
              <Component1/>
              <Aboutus/>
              <Reviews/>
              <Form/>
              </>
            }
          />
          <Route
            path="Tourism"
            element={
              <ProtectedRoute>
              <>
              <TourismBanner/>
              <Banner2/>
              <Description/>
              <Destination/>
              <Section/>
              <Guides/>
              <Logo/>
              </>
              </ProtectedRoute>
            }
          />
          <Route path="/login"
          element={<Signin/>}/>
          <Route path="/signup"
          element={<Signup/>}/>
          <Route path="/verify"
          element={<EmailVerify/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;

