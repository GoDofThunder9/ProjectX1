import React from 'react';
import '../../assets/Style/HomeStyle/Banner.css';
import v3 from '../../assets/Images/v3.mp4'

const VideoBanner = () => {
  return (
    <div className="video-banner">
      <video 
        className="banner-video"
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src={v3} type="video/mp4" />
      </video>
      <div className="banner-content">
        <h1>Welcome to Our Site</h1>
        <p>Discover amazing content and experiences</p>
        <button className="cta-button">Learn More</button>
      </div>
    </div>
  );
};

export default VideoBanner;

