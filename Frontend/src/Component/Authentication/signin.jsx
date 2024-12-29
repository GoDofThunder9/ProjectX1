import React, { useState } from 'react';
import '../../assets/Style/AuthenticationStyle/signin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    Password: '',
  });

  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
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
        const { userId, userName } = response.data;

        // Store user info in localStorage
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
    <div className="container-new">
      {/* Gradient Background with Sphere */}
      <div className="gradient-section-new">
        <div className="sphere-new" />
      </div>
      {/* Sign In Form */}
      <div className="form-section-new">
        <div className="form-container-new">
          <div className="form-header-new">
            <h1>Sign in</h1>
            <p>Sign in now free to access any of our products</p>
          </div>

          <form className="signup-form-new" onSubmit={handleSubmit}>
            <div className="form-group-new">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                }}
                required
              />
            </div>

            <div className="form-group-new">
              <div className="password-header-new">
                <label htmlFor="password">Password</label>
                <button
                  type="button"
                  className="hide-button-new"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="Password"
                placeholder="Enter your password"
                value={formData.Password}
                onChange={handleInputChange}style={{
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                }}
                required
              />
              <p className="password-hint-new">
               <a href="/forgot">Forget Password?</a>
              </p>
            </div>

            {message && <p className="error-message">{message}</p>}

            <div className="checkbox-group-new">
              <div className="checkbox-item-new">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">
                  Agree to our <a href="#">Terms of use</a> and{' '}
                  <a href="#">Privacy Policy</a>
                </label>
              </div>

              <div className="checkbox-item-new">
                <input type="checkbox" id="newsletter" />
                <label htmlFor="newsletter">Subscribe to our monthly newsletter</label>
              </div>
            </div>

            <button type="submit" className="signup-button-new">
              Log in
            </button>

            <p className="login-link-new">
              Don’t have an account? <a href="/signup">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
