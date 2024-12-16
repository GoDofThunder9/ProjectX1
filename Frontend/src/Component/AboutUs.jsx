import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBriefcase, faBullhorn } from '@fortawesome/free-solid-svg-icons';
import '../assets/Style/AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="about-us-text">
        <h2 className="about-us-heading">About Us</h2>
        <p className="about-us-description">
          We are a team of passionate individuals who strive to make a difference. Our goal is to provide innovative solutions that help our clients grow and succeed. With years of experience and a commitment to excellence, we are dedicated to delivering high-quality services and building lasting relationships.
        </p>
        <div className="about-us-icons">
          <FontAwesomeIcon icon={faUsers} />
          <FontAwesomeIcon icon={faBriefcase} />
          <FontAwesomeIcon icon={faBullhorn} />
        </div>
      </div>
      <div className="about-us-image">
        <img src="https://via.placeholder.com/500" alt="About Us" />
      </div>
    </div>
  );
}

export default AboutUs;
