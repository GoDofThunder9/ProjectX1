import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaCommentAlt, FaPaperPlane } from 'react-icons/fa';
import '../../assets/Style/HomeStyle/Form.css';
import axios from 'axios';
import { notifySuccess, notifyError } from "../../Tostify"; // Import reusable toast functions

function Form() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    problem: '',
    feedback: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/send-feedback`,
        formData
      );
  
      if (response.status === 200) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          problem: "",
          feedback: "",
        });
  
        // Use your notifySuccess function
        notifySuccess("✅ Feedback submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting the feedback", error);
  
      // Use your notifyError function
      notifyError(
        error.response?.data?.message ||
          "❌ Failed to submit feedback. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="home-form-container" id='Form-container'>
      <div className="home-form-wrapper">
        <h2 className="home-form-title">Contact Us</h2>
        
        <form onSubmit={handleSubmit} className="home-feedback-form">
          <div className="home-input-group">
            <div className="home-icon">
              <FaUser />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name *"
              required
            />
          </div>

          <div className="home-input-group">
            <div className="home-icon">
              <FaEnvelope />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email *"
              required
            />
          </div>

          <div className="home-input-group">
            <div className="home-icon">
              <FaPhone />
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number *"
              required
            />
          </div>

          <div className="home-input-group">
            <div className="home-icon">
              <FaCommentAlt />
            </div>
            <input
              type="text"
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              placeholder="Specifiy the Reason"
              required
            />
          </div>

          <div className="home-input-group">
            <div className="home-icon">
              <FaCommentAlt />
            </div>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              placeholder="Message For Us"
              required
            />
          </div>

          <button 
            type="submit" 
            className="home-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="home-spinner" />
            ) : (
              <>
                Submit <FaPaperPlane className="home-send-icon" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
