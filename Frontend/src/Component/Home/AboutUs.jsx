import React from 'react';
import { FaCog, FaHeadset, FaBolt, FaPalette, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import '../../assets/Style/Home/AboutUs.css';

function Aboutus() {
  const features = [
    {
      icon: <FaCog />,
      title: 'Modern Design',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. JustFreeSlide.com'
    },
    {
      icon: <FaHeadset />,
      title: '24X7 User Support',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. JustFreeSlide.com'
    },
    {
      icon: <FaBolt />,
      title: 'Fast',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. JustFreeSlide.com'
    },
    {
      icon: <FaPalette />,
      title: 'Creative Design',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. JustFreeSlide.com'
    },
    {
      icon: <FaChartLine />,
      title: 'Business Growth',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. JustFreeSlide.com'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Safe',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. JustFreeSlide.com'
    }
  ];

  return (
    <div className="why-choose-us-Home" id="services-Home">
      <div className="container-Home">
        <div className="header">
          <h2>
            Why Choose <span>Us</span>
          </h2>
          <p>Get more from our side feel free to connect</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="icon-wrapper">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Aboutus;