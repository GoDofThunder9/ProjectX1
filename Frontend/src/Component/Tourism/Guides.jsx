import React, { useState } from 'react';
import { Facebook, Instagram, Twitter } from 'react-feather';
import '../../assets/Style/TourismStyle/Guides.css';
import caro1 from '../../assets/Images/caro1.jpg'
const guides = [
  {
    id: 1,
    name: "Martin Blake",
    title: "Adventure Master",
    image: caro1,
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
  },
  {
    id: 2,
    name: "Martin Blake",
    title: "Adventure Master",
    image: caro1,
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
  },
  {
    id: 3,
    name: "Martin Blake",
    title: "Adventure Master",
    image:caro1,
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
  }
];

const Guides = () => {
  return (
    <div className="guides-section">
      <div className="guides-header">
        <h2 className="guides-title">
          Meet The Guides
          <span className="wave-decoration">
            <svg viewBox="0 0 100 20" className="wave">
              <path d="M0 10 Q25 20 50 10 T100 10" fill="none" stroke="black" strokeWidth="2"/>
            </svg>
          </span>
        </h2>
        <p className="guides-subtitle">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam consectetuer.
        </p>
      </div>

      <div className="guides-grid">
        {guides.map((guide) => (
          <div key={guide.id} className="guide-card">
            <div className="guide-image">
              <img src={guide.image} alt={guide.name} />
            </div>
            <div className="guide-info">
              <h3 className="guide-name">{guide.name}</h3>
              <p className="guide-title">{guide.title}</p>
              <div className="social-icons">
                <a href="#" className="social-icon">
                  <Facebook size={16} />
                </a>
                <a href="#" className="social-icon">
                  <Instagram size={16} />
                </a>
                <a href="#" className="social-icon">
                  <Twitter size={16} />
                </a>
              </div>
              <p className="guide-description">{guide.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guides;
