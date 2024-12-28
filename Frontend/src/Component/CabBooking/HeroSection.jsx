import React from 'react';
import '../../assets/Style/CabBooking/HeroSection.css';
// import '../../assets/Style/CabBooking/BannerCar.css';
import BannerimageCar from '../../assets/CabImages/CabBanner.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faCocktail, faConciergeBell } from '@fortawesome/free-solid-svg-icons';

function HeroSection() {
  return (
    <>
      <div className="app">
        <video
          className="background-video-cab"
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-bg-poster.jpg"
        >
          <source src={BannerimageCar} type="video/mp4" />
          Your browser does not support the video tag.
        </video>


      </div>


      <section className="hero" id="home">
    <div className="container">
      <form className="hero-form">
        <div className="input-wrapper">
          <label htmlFor="input-1" className="input-label">Car, model, or brand</label>
          <input type="text" name="car-model" id="input-1" className="input-field"
            placeholder="What car are you looking?" />
        </div>
        <div className="input-wrapper">
          <label htmlFor="input-2" className="input-label">Max. monthly payment</label>
          <input type="text" name="monthly-pay" id="input-2" className="input-field" placeholder="Add an amount in $" />
        </div>
        <div className="input-wrapper">
          <label htmlFor="input-3" className="input-label">Make Year</label>
          <input type="text" name="year" id="input-3" className="input-field" placeholder="Add a minimal make year" />
        </div>
        <button type="submit" className="btn1">Search</button>
      </form>
    </div>
  </section>
      
    </>
  );
}

export default HeroSection;
