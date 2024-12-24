import React from 'react'
import  '../../assets/Style/HomeStyle/Footer.css';
import { Facebook, Instagram, Twitter, MapPin, Send } from 'lucide-react';
import img1 from '../../assets/Images/footerimg1.jpg';
import img2 from '../../assets/Images/footerimg2.jpg';

const Footer = () => {
  return (
    <>
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h3>About Travlu</h3>
          <p className="about-text">
            Nunc cursus liero purs ac cogue arcu cursus ut sed vitae pulvinar massaidp nequetiam lore elerisque
          </p>
          <div className="contact-info">
            <p className="phone">1-800-321-6543</p>
            <a href="mailto:info@travlu.com" className="email">info@travlu.com</a>
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
              <img src={img1} alt="Bungee Jumping" />
              <div className="news-content">
                <h4>Bungee Jumping Trip</h4>
                <p>Nunc cursus libero purus congue arcu vitae pulvinar</p>
                <span className="date">Feb 22, 2017</span>
              </div>
            </div>
            <div className="news-item">
              <img src={img2} alt="White Castle" />
              <div className="news-content">
                <h4>Trip To White Castle</h4>
                <p>Nunc cursus libero purus congue arcu vitae pulvinar</p>
                <span className="date">Feb 22, 2017</span>
              </div>
            </div>
          </div>
        </div>

        {/* Destinations Section */}
        <div className="footer-section">
          <h3>Top Destinations</h3>
          <ul className="destinations-list">
            <li><MapPin size={16} /> Bayonne, Melbourne</li>
            <li><MapPin size={16} /> Greenville, New Jersey</li>
            <li><MapPin size={16} /> The Heights, London</li>
            <li><MapPin size={16} /> West Side, New York</li>
            <li><MapPin size={16} /> Upper East Side, New York</li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="footer-section">
          <h3>Newsletter</h3>
          <p className="newsletter-text">
            Sign up for our mailing list to get latest updates and offers
          </p>
          <form className="newsletter-form">
            <div className="input-group">
              <input type="email" placeholder="Your Email" />
              <button type="submit" aria-label="Subscribe">
                <Send />
              </button>
            </div>
          </form>
          <p className="privacy-text">We respect your privacy</p>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer