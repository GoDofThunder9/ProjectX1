import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import "../../assets/Style/Email_Verification/emailverification.css";

function EmailVerify() {
  const location = useLocation();
  const email = location.state?.email || "your email";
  const navigate = useNavigate();

  // OTP state
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [message, setMessage] = useState("");

  // Handle OTP input
  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus on the next input
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  // Handle OTP submission
  const verifyUser = async () => {
    try {
      const otpCode = otp.join(""); // Combine OTP array to a string
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/verify-email`, { email, otp: otpCode });

      if (response.status === 200) {
        setMessage("Verification successful!");
        setTimeout(() => navigate('/login'), 2000); // Redirect to login after success
      }
    } catch (error) {
      setMessage("Invalid OTP or verification failed. Please try again.");
    }
  };

  // Resend OTP handler
  const resendOtp = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/resendotp`, { email });
      setMessage("A new OTP has been sent to your email.");
    } catch {
      setMessage("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="email-verify">
      <div className="email-container">
        <h1 className="email-heading">Email Verification</h1>
        <p className="email-subheading">A code has been sent to <strong>{email}</strong></p>
        <div className="code-input">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              id={`otp-${index}`}
              maxLength="1"
              className="code-input-field"
              value={digit}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && index > 0 && !digit) {
                  document.getElementById(`otp-${index - 1}`).focus();
                }
              }}
            />
          ))}
        </div>
        {message && <p className="verification-message">{message}</p>}
        <button className="continue-button" onClick={verifyUser}>
          Verify
        </button>
        <p className="resend-link">
          Didn’t receive the email?{" "}
          <a href="#" onClick={(e) => {
            e.preventDefault();
            resendOtp();
          }}>
            Resend OTP
          </a>
        </p>
      </div>
    </div>
  );
}

export default EmailVerify;
