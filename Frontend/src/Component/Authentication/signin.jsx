import React, { useState } from 'react';
import axios from 'axios'; // Make sure axios is installed
import "../../assets/Style/AuthenticationStyle/signin.css";
import { useNavigate } from 'react-router-dom'

function signin() {
  // State to store form data
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    Password: '',
  });

  // State to handle messages (error/success)
  const [message, setMessage] = useState('');

  // Handle input changes for form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', formData, {
        withCredentials: true, // Include cookies in the request
      });
      if (response.status === 200) {
        const userId = response.data.userId;
        const userName = response.data.userName;
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', userName);
        console.log('User logged in successfully:', response);
        setMessage('Login successful!');
        // Redirect to home page and reload
        navigate('/');
        window.location.reload(); // Force reload after navigation
      } else {
        setMessage(response.data.message || 'Login failed!');
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'An error occurred. Please try again.'
      );
    }
  };
  

  return (
    <div className="main1">
      <div className="login-container">
        <h2 className="login-title">Login to RideShare</h2>
        {message && <p className="message">{message}</p>}
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-input"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-input"
              placeholder="Password"
              name="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-extras">
            <div className="remember-me">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <div className="forgot-password">
              <a href="#">Forgot Password?</a>
            </div>
          </div>
          <button type="submit" className="login-btn">Login</button>
          <div className="signup-link">
            Don't have an account? <a href="#">Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default signin;
