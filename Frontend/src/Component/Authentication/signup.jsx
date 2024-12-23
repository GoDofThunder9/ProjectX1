import React, { useState } from 'react';
import axios from 'axios'; // Make sure axios is installed via npm/yarn
import "../../assets/Style/AuthenticationStyle/signup.css";
import { useNavigate } from 'react-router-dom';
function signup() {
  // State to store form data
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Fullname: '',
    email: '',
    phone: '',
    Password: '',
    City: '',
    Country: '',
  });

  // State for confirmPassword (only for validation)
  const [confirmPassword, setConfirmPassword] = useState('');

  // State to handle error or success messages
  const [message, setMessage] = useState('');

  // Handle input changes for form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle input change for confirmPassword
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.Password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      // Sending data to the backend (excluding confirmPassword)
      const response = await axios.post('http://127.0.0.1:8080/signup', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("User signed up successfully:", response);
      // Navigate to a different page on success, if needed
      if (response.status === 200 || response.status === 201) {
        setMessage("Signup successful!");
        // Optionally reset form
        setFormData({
          Fullname: '',
          email: '',
          phone: '',
          Password: '',
          City: '',
          Country: '',
        });
        setConfirmPassword('');
        navigate('/verify',{state:{ email: formData.email }});
      } else {
        setMessage(response.data.message || "Signup failed!");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="main2">
        <div className="signin-container">
          <h2 className="signin-title">Sign Up to RideShare</h2>
          {message && <p className="message">{message}</p>}
          <form id="signinForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                placeholder="Full Name"
                name="Fullname"
                value={formData.Fullname}
                onChange={handleInputChange}
                required
              />
            </div>
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
                type="tel"
                className="form-input"
                placeholder="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                placeholder="City"
                name="City"
                value={formData.City}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                placeholder="Country"
                name="Country"
                value={formData.Country}
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
                value={formData.Password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-input"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>
            <button type="submit" className="signin-btn">Sign Up</button>
            <div className="forgot-password">
              <a href="#">Forgot Your Password?</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default signup;
