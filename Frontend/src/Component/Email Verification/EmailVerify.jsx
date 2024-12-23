import React, { useState } from 'react';
import "../../assets/Style/Email Verification/emailverification.css";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
function EmailVerify() {
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();
  // Initialize state with email and empty OTP string
  const [code, setCode] = useState({
    email: email,
    otp: '' // now otp is a string
  });
   
  // Handle OTP input changes
  const handleInputChange = (e, index) => {
    let newOtp = code.otp.split('');
    newOtp[index] = e.target.value;
    setCode({ ...code, otp: newOtp.join('') });
  };

  // Verify user with the entered OTP code
  const verifyUser = async () => {
    try {
      const response = await axios.post('http://localhost:8080/verify-email', code);
      navigate('/login');
      alert("User verified successfully:");
    } catch (error) {
      console.log("Error during verification:", error);
    }
  };

  return (
    <div className="email-verify">
      <div className="email-container">
        <div className="email-header">
          <h1 className='email-heading'>Email Verification</h1>
        </div>
        <p className='email-subheading'>We sent a code to {email}</p>
        <div className="code-input">
          {Array(4).fill().map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="code-input-field"
              value={code.otp[index] || ''}
              onChange={(e) => handleInputChange(e, index)}
            />
          ))}
        </div>
        <button className="continue-button" onClick={verifyUser}>
          Continue
        </button>
        <p className="resend-link">
          Didn't receive the email?
          <a href="#" onClick={(e) => e.preventDefault()}>
            Click to resend
          </a>
        </p>
      </div>
    </div>
  );
}

export default EmailVerify;
