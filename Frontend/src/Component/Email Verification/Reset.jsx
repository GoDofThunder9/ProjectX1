import React, { useState, useEffect } from 'react';
import "../../assets/Style/Email_Verification/reset.css";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Reset() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [code, setCode] = useState({
    email: email || '',
    token: ['', '', '', '', '', ''], // Array to hold 6 digits
  });

  const [animate, setAnimate] = useState(false); // State to handle animation
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  useEffect(() => {
    // Trigger animation when component mounts
    setAnimate(true);
  }, []);

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const newToken = [...code.token];

    // Allow only digits and single character
    if (/^[0-9]*$/.test(value) && value.length <= 1) {
      newToken[index] = value;
      setCode({ ...code, token: newToken });

      // Move focus to the next input field if not the last one
      if (index < 5 && value) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    const { key } = e;
    const newToken = [...code.token];

    // Handle backspace
    if (key === "Backspace") {
      if (!newToken[index] && index > 0) {
        // If the current field is empty, move focus to the previous field
        document.getElementById(`code-input-${index - 1}`).focus();
      }
      newToken[index] = ""; // Clear the current field
      setCode({ ...code, token: newToken });
    }
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://aaditgroups.com/api/verify-reset-token', {
        email: code.email,
        token: code.token.join(''), // Join array to form the complete token
      });
      navigate('/newpass', {
        state: {
          email: code.email,
          token: code.token.join(''),
        },
      });
    } catch (error) {
      console.log("Error during verification:", error);
      setErrorMessage("Verification failed. Please try again."); // Set error message on failure
    }
  };

  return (
    <div className={`password-reset ${animate ? 'fade-in' : ''}`}> {/* Add class for animation */}
      <div className="reset-container">
        <div className="reset-header">
          <h1 className='reset-heading'>Password Reset</h1>
        </div>
        <p className='reset-subheading'>We sent a code to {email}</p>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message if present */}
        <form onSubmit={handleSubmission}>
          <div className={`code-input ${animate ? 'slide-up' : ''}`}> {/* Add class for animation */}
            {code.token.map((value, index) => (
              <input
                key={index}
                id={`code-input-${index}`}
                type="text"
                maxLength="1"
                className="code-input-field"
                value={value}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)} // Add keydown handler
              />
            ))}
          </div>
          <button className="continue-button" type="submit">
            Continue
          </button>
        </form>
        <p className="resend-link">
          Didn't receive the email?
          <a href="#" onClick={(e) => e.preventDefault()}>
            Click to resend
          </a>
        </p>
        <p className="back-link">
          <a href="/login">
            ← Back to login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Reset;
