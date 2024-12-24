import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaCommentAlt, FaPaperPlane } from 'react-icons/fa';
import '../../assets/Style/HomeStyle/Form.css';

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
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      problem: '',
      feedback: ''
    });
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2 className="form-title">Share Your Feedback</h2>
        
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="input-group">
            <div className="icon">
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

          <div className="input-group">
            <div className="icon">
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

          <div className="input-group">
            <div className="icon">
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

          <div className="input-group">
            <div className="icon">
              <FaCommentAlt />
            </div>
            <input
              type="text"
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              placeholder="Problem with the Feature"
              required
            />
          </div>

          <div className="input-group">
            <div className="icon">
              <FaCommentAlt />
            </div>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              placeholder="Feedback"
              required
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="spinner" />
            ) : (
              <>
                Submit <FaPaperPlane className="send-icon" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;