import React from 'react';
import { FaCar, FaUtensils, FaMapMarkedAlt, FaMoneyBillWave, FaUsers, FaShieldAlt } from 'react-icons/fa';
import '../../assets/Style/HomeStyle/AboutUs.css';

function Aboutus() {
  const features = [
    {
      icon: <FaCar />,
      title: 'Reliable Car Rentals',
      description: 'Experience hassle-free car rentals with a wide range of options for your convenience.'
    },
    {
      icon: <FaUtensils />,
      title: 'Food Booking Services',
      description: 'Order delicious meals from top restaurants and enjoy seamless booking through our platform.'
    },
    {
      icon: <FaMapMarkedAlt />,
      title: 'Tailored Tourism Packages',
      description: 'Explore unique destinations with customized travel packages to suit your needs.'
    },
    {
      icon: <FaMoneyBillWave />,
      title: 'Affordable Pricing',
      description: 'Get the best deals on car rentals, food bookings, and tourism services.'
    },
    {
      icon: <FaUsers />,
      title: '24/7 Customer Support',
      description: 'Our dedicated team is here to assist you anytime, ensuring a smooth experience.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Secure Transactions',
      description: 'Your bookings and payments are safe with our state-of-the-art security systems.'
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