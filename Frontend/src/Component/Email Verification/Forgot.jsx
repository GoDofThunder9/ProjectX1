import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/Style/Email_Verification/forgot.css';

const Forgot = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage(''); // Clear error message when user starts typing
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/forgot-password', { email });
      alert('OTP sent successfully!');
      navigate('/reset', { state: { email } });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // If server responds with 404, show an error message
        setErrorMessage('The email you entered is not registered.');
      } else {
        // Handle other errors (e.g., network issues)
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-password">
        <div className="forgot-header">
          <h1 className="forgot-heading">Forgot Password</h1>
        </div>
        <p className="forgot-subheading">No worries, we'll send you reset instructions.</p>
        <form onSubmit={handleResetPassword}>
          <div className="input-group">
            <label htmlFor="email" className="forgot-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
              className="forgot-input"
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button className="forgot-button" type="submit">Reset Password</button>
        </form>
        <p className="back-to-login">
          <a href="/sign-in">← Back to login</a>
        </p>
      </div>
    </div>
  );
};

export default Forgot;
