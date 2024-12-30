import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/Style/Email Verification/forgot.css';

const Forgot= () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    console.log("Email:", email);

    // Add your reset password logic here, like calling an API
    const response = await axios.post('http://localhost:8080/forgot-password',{"email":email});
    console.log("User signed up successfully:", response);
    alert("otp send successfully");
    navigate('/reset',{state:{email:email}});
    // After successful password reset, you can navigate to another page
  };

  return (
    <div className="forgot-container">
      <div className="forgot-password">
        <div className="forgot-header">
          <h1 className='forgot-heading'>Forgot Password</h1>
        </div>
        <p className='forgot-subheading'>No worries, we'll send you reset instructions.</p>
        <form onSubmit={handleResetPassword}>
          <div className="input-group">
            <label htmlFor="email" className='forgot-label'>Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email} 
              onChange={handleInputChange} 
              required 
              className='forgot-input' 
            />
          </div>
          <button className='forgot-button' type="submit">Reset Password</button>
        </form>
        <p className="back-to-login">
          <a href="/sign-in">← Back to login</a>
        </p>
      </div>
    </div>
  );
};

export default Forgot;
