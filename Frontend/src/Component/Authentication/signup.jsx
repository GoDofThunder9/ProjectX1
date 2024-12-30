import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/Style/AuthenticationStyle/signup.css";

const signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Fullname: "",
    email: "",
    phone: "",
    Password: "",
    City: "",
    Country: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.Fullname || !formData.email || !formData.Password || !confirmPassword) {
      setMessage("All fields are required!");
      return;
    }

    if (formData.Password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/signup", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200 || response.status === 201) {
        setMessage("Signup successful!");
        const email = formData.email;
        setFormData({ Fullname: "", email: "", phone: "", Password: "", City: "", Country: "" });
        setConfirmPassword("");
        navigate("/verify", { state: { email } });
      } else {
        setMessage("Signup failed!");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="container-new">
      <div className="gradient-section-new">
        <div className="sphere-new" />
      </div>
      <div className="form-section-new">
        <div className="form-container-new">
          <div className="form-header-new">
            <h1>Sign up</h1>
            <p>Sign up now free to access any of our products</p>
          </div>
          <form className="signup-form-new" onSubmit={handleSubmit}>
            <div className="form-group-new">
              <label htmlFor="fullname">Full Name</label>
              <input
                type="text"
                id="Fullname"
                name="Fullname"
                placeholder="Enter your full name"
                value={formData.Fullname}
                onChange={handleInputChange}style={{
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                }}
              />
            </div>
            <div className="form-group-new">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="Email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}style={{
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                }}
              />
            </div>
            <div className="form-group-new">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}style={{
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                }}
              />
            </div>
            {/* Password */}
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
    onChange={handleInputChange}
    style={{
      padding: '0.75rem',
      border: '1px solid #ddd',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
    }}
  />
</div>

{/* Confirm Password */}
<div className="form-group-new">
  <div className="password-header-new">
    <label htmlFor="confirm-password">Confirm Password</label>
  </div>
  <input
    type="password"
    id="confirm-password"
    name="confirmPassword"
    placeholder="Confirm your password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    style={{
      padding: '0.75rem',
      border: '1px solid #ddd',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
    }}
  />
</div>

            <div className="form-group-new">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="City"
                placeholder="Enter your city"
                value={formData.City}
                onChange={handleInputChange}style={{
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                }}
              />
            </div>
            <div className="form-group-new">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="Country"
                name="Country"
                placeholder="Enter your country"
                value={formData.Country}
                onChange={handleInputChange}style={{
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                }}
              />
            </div>
            <button type="submit" className="signup-button-new">
              Sign up
            </button>
            <p>{message}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default signup;
