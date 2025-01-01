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
          <a style={{textDecoration:"none",
          color:"white"
        }} href="#Explore">
        <button className="cta-button" >
          Explore</button>
          </a>
      </div>
    </div>
  );
};

export default VideoBanner;

