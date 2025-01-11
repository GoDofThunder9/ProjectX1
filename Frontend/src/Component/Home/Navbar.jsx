import React, { useState, useEffect } from 'react';
import '../../assets/Style/HomeStyle/Navbar.css';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Authentication/axiosInstance';
import logo from "../../assets/Images/logo.jpeg";
const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  // Check local storage when the component mounts
  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');

    if (storedName && userId) {
      setIsAuthenticated(true);
      setUserName(storedName);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    setIsAuthenticated(false); // Redirect to login page after logout
    navigate('/');
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
  <div className="navbar-container">
    <div className="navbar-logo"><img src={logo} alt="" /></div>
    <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
      <div className="containtitles">
      <a href="/" className="navbar-item">Home</a>
      <a href="#services-Home" className="navbar-item">Services</a>
      <a href="#Review-Home" className="navbar-item">Testimonial</a>
      <a href="#Form-container" className="navbar-item">Contact Us</a>
      </div>
      {/* Add the buttons inside the navbar-menu */}
      {isAuthenticated ? (
        <>
          <button className="navbar-button sign-in">{userName}</button>
          <button
            onClick={() => {
              handleLogout();
              axiosInstance.post('/logout');
            }}
            className="navbar-button sign-up"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              navigate('/login');
            }}
            className="navbar-button sign-in"
          >
            Sign In
          </button>
          <button
            onClick={() => {
              navigate('/signup');
            }}
            className="navbar-button sign-up"
          >
            Sign Up
          </button>
        </>
      )}
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
