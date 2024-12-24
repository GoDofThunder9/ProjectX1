import React, { useState } from 'react';
import '../../assets/Style/HomeStyle/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">YourLogo</div>
        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <a href="/" className="navbar-item">Home</a>
          <a href="/services" className="navbar-item">Services</a>
          <a href="/about" className="navbar-item">About Us</a>
          <a href="/testimonial" className="navbar-item">Testimonial</a>
        </div>
        <div className="navbar-buttons">
          <button className="navbar-button sign-in">Sign In</button>
          <button className="navbar-button sign-up">Sign Up</button>
        </div>
        <div className={`navbar-toggle ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;