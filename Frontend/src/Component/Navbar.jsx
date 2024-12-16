import React from "react";
import "../assets/Style/Navbar.css"; // Assuming you have CSS styles in App.css or equivalent
import logo from "../assets/Images/logo.png"

const App = () => {
  return (
    
    <>
      <main>
        <div className=" light">
          <header>
            <div className="container">
              <div className="logo">
                <img src={logo} alt="Logo" />
                <h3>Danvo in a new branch</h3>
              </div>

              <div className="links">
                <ul>
                  <li><a href="#">Features</a></li>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Testimonials</a></li>
                  <li><a href="#" className="btn">Sign up</a></li>
                  <li><a href="#" className="btn">Sign in</a></li>
                </ul>
              </div>

              <div className="overlay"></div>

              <div className="hamburger-menu">
                <div className="bar"></div>
              </div>
            </div>
          </header>
        </div>
      </main>
    </>
  )
};

export default App;
