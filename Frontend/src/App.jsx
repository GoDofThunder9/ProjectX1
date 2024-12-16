import Navbar from './Component/Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from './Component/Footer';
import Component from './Component/component';
import Banner from './Component/Banner';
import AboutUs from './Component/AboutUs';
import Form from './Component/Form';
import Review from './Component/Review';
function App() {
  return (
    <>
      <BrowserRouter>
          <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
              <Banner/>
              <Component/>
              <AboutUs/>
              <Review/>
              <Form/>
              </>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

