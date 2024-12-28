import React from "react";
import '../../assets/Style/HomeStyle/Reviews.css'
import photo1 from '../../assets/Images/reviewPhoto4.jpg'
import photo2 from '../../assets/Images/reviewPhoto2.jpg'
import photo3 from '../../assets/Images/reviewPhoto3.jpg'

const Testimonials = () => {
    return (
      <div className="testimonials-container">
        <h2 className="testimonials-title">What Our Client Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-image-container">
              <div className="testimonial-image-background"></div>
              <img src={photo1} alt="Neora Silviana" className="testimonial-image-new" />
            </div>
            <h3 className="testimonial-name">Neora Silviana</h3>
            <p className="testimonial-quote">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"</p>
            <div className="testimonial-stars">
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-image-container">
              <div className="testimonial-image-background"></div>
              <img src={photo2} alt="Martin Salasa" className="testimonial-image-new" />
            </div>
            <h3 className="testimonial-name">Martin Salasa</h3>
            <p className="testimonial-quote">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"</p>
            <div className="testimonial-stars">
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-image-container">
              <div className="testimonial-image-background"></div>
              <img src={photo3} alt="Ryan Marvez" className="testimonial-image-new" />
            </div>
            <h3 className="testimonial-name">Ryan Marvez</h3>
            <p className="testimonial-quote">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"</p>
            <div className="testimonial-stars">
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
              <span className="star">★</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Testimonials;
  
  