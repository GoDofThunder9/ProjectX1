import React from "react";
import '../../assets/Style/HomeStyle/Reviews.css'
import photo1 from '../../assets/Images/reviewPhoto4.jpg'
import photo2 from '../../assets/Images/reviewPhoto2.jpg'
import photo3 from '../../assets/Images/reviewPhoto3.jpg'

const Testimonials = () => {
    return (
      <div className="testimonials-container" id="Review-Home">
  <h2 className="testimonials-title">What Our Clients Say</h2>
  <div className="testimonials-grid">
    <div className="testimonial-card">
      <div className="testimonial-image-container">
        <div className="testimonial-image-background"></div>
        <img src={photo1} alt="Neora Silviana" className="testimonial-image-new" />
      </div>
      <h3 className="testimonial-name">Neora Silviana</h3>
      <p className="testimonial-quote">"The car rental service was exceptional! The vehicle was clean and well-maintained, making my trip stress-free. Highly recommend!"</p>
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
      <p className="testimonial-quote">"I booked a dinner through the food booking service, and everything went perfectly. The restaurant was excellent, and the process was so easy!"</p>
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
      <p className="testimonial-quote">"The customized tourism package was beyond my expectations! I visited beautiful locations and had an amazing experience throughout the trip."</p>
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
  
  