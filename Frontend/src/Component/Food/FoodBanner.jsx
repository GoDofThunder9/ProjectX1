import React from 'react';
import '../../assets/Style/Food/FoodBanner.css';
import Bannerimage1 from '../../assets/Images/hero-bg.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faCocktail, faConciergeBell } from '@fortawesome/free-solid-svg-icons';

function FoodBanner() {
  return (
    <>
      <div className="app">
        <video
          className="background-video"
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-bg-poster.jpg"
        >
          <source src={Bannerimage1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Official Packages</h1>
          <div className="hero-stats">
            <div className="hero-stat">
              <FontAwesomeIcon icon={faUtensils} className="hero-icon" /> 40 FOOD
            </div>
            <div className="hero-stat">
              <FontAwesomeIcon icon={faCocktail} className="hero-icon" /> 19 DRINKS
            </div>
            <div className="hero-stat">
              <FontAwesomeIcon icon={faConciergeBell} className="hero-icon" /> 28 SOUP
            </div>
          </div>
          <button className="hero-button">ORDER NOW</button>
        </div>
      </section>
    </>
  );
}

export default FoodBanner;
