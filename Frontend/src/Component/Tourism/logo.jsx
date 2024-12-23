import React from 'react';
import "../../assets/Style/TourismStyle/logo.css";

const partners = [
  {
    id: 1,
    name: "Partner",
    logo: "/placeholder.svg"
  },
  {
    id: 2,
    name: "PartnerCo",
    logo: "/placeholder.svg"
  },
  {
    id: 3,
    name: "BearBrand",
    logo: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Barber Brand",
    logo: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Your Name Barber Shop",
    logo: "/placeholder.svg"
  }
];

const logo = () => {
  return (
    <section className="partners-section">
      <div className="background-overlay"></div>
      <div className="content-wrapper">
        <div className="section-header">
          <svg className="wave-icon" viewBox="0 0 100 20" width="60">
            <path
              d="M0 10 Q25 20 50 10 T100 10"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
          <h2>Our Partners</h2>
        </div>
        
        <div className="partners-grid">
          {partners.map((partner) => (
            <div key={partner.id} className="partner-item">
              <img
                src={partner.logo}
                alt={partner.name}
                className="partner-logo"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default logo;

