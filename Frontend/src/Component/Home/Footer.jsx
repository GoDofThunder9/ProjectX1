import React from 'react'
import  '../../assets/Style/HomeStyle/Footer.css';
import { Facebook, Instagram, Twitter, MapPin, Send } from 'lucide-react';
import img1 from '../../assets/Images/footerimg1.jpg';
import img2 from '../../assets/Images/footerimg2.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCar} from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  return (
    <>
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h3>About Travelu</h3>
          <p className="about-text">
          Welcome to Travelu, your all-in-one travel platform for booking hotels, cabs, and local experiences. Enjoy seamless planning, great stays, and delicious cuisine—all in one place!
          </p>
          <div className="contact-info">
            <p className="phone">+63 9617560009</p>
            <a href="mailto:info@travlu.com" className="email">aaditgroups@aaditcs.com</a>
          </div>
          <div className="social-icons">
            <a href="#" aria-label="Facebook"><Facebook /></a>
            <a href="#" aria-label="Instagram"><Instagram /></a>
            <a href="#" aria-label="Twitter"><Twitter /></a>
          </div>
        </div>

        {/* News Section */}
        <div className="footer-section">
          <h3>Travelu News</h3>
          <div className="news-items">
            <div className="news-item">
              <img src={img1} alt="BAGUIO & LA UNION 3D2N" />
              <div className="news-content">
                <h4>BAGUIO & LA UNION</h4>
                <p>Don't miss your best vacation opportunity to explore the surfing capital of the North</p>
                <span className="date">Dec 22, 2025</span>
              </div>
            </div>
            <div className="news-item">
              <img src={img2} alt="White Castle" />
              <div className="news-content">
                <h4>HUNDRED ISLAND</h4>
                <p>Visit one of the best travel destinations in the Philippines</p>
                <span className="date">June 15, 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Destinations Section */}
        <div className="footer-section">
          <h3>Top Destinations</h3>
          <ul className="destinations-list">
            <li><MapPin size={16} /> Boracay</li>
            <li><MapPin size={16} /> Greenville, New Jersey</li>
            <li><MapPin size={16} /> The Heights, London</li>
            <li><MapPin size={16} /> West Side, New York</li>
            <li><MapPin size={16} /> Upper East Side, New York</li>
          </ul>
        </div>


        <div className="footer-section">
          <h3>Aadit Car Rental Service</h3>
          <ul className="destinations-list">
            <li><FontAwesomeIcon icon={faCar} /> Toyota Innova</li>
            <li><FontAwesomeIcon icon={faCar} /> Toyota Fortuner</li>
            <li><FontAwesomeIcon icon={faCar} /> Suzuki Ertiga</li>
            <li><FontAwesomeIcon icon={faCar} /> Mitsubishi Mirage</li>
            <li><FontAwesomeIcon icon={faCar} /> Suzuki Desire</li>
          </ul>
        </div>

        
      </div>
    </footer>
    </>
  )
}

export default Footer