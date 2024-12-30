import React, { useState } from 'react';
import "../../assets/Style/Email Verification/NewPassword.css";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const token = location.state?.token;

  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (password.newPassword !== password.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    console.log({
      email:email,
      token:token,
      newPassword:password.newPassword
    })
    try {
      await axios.post('http://localhost:8080/reset-password', {
        email: email,
        token: token,
        newPassword: password.newPassword
      });
      navigate('/sign-in'); // Redirect to login page after successful reset
      alert("Password reset successfully.");
    } catch (error) {
      console.log("Error during password reset:", error);
      alert("Password reset failed. Please try again.");
    }
  };

  return (
    <div className="new-pass-container">
      <div className="new-pass-form-container">
        <h1 className='new-pass-heading'>Set New Password</h1>
        <p className='new-pass-subheading'>Must be at least 8 characters.</p>
        <form onSubmit={handlePasswordReset}>
          <div className="new-pass-form-group">
            <label htmlFor="newPassword" className='new-pass-label'>Password:</label>
            <input
              id="newPassword"
              name="newPassword"
              className='new-pass-input'
              type="password"
              value={password.newPassword}
              onChange={handleInputChange}
              required
              minLength="8"
            />
          </div>
          <div className="new-pass-form-group">
            <label htmlFor="confirmPassword" className='new-pass-label'>Confirm Password:</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              className='new-pass-input'
              type="password"
              value={password.confirmPassword}
              onChange={handleInputChange}
              required
              minLength="8"
            />
          </div>
          <button type="submit" className="new-pass-btn">
            Reset Password
          </button>
        </form>
        <a href="/sign-in" className="new-pass-back-link">
          ← Back to Log In
        </a>
      </div>
    </div>
  );
};

export default NewPassword;
