import React from 'react';
import '../../assets/Style/Food/Expert.css';
import { FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn } from 'react-icons/fa';
import img11 from "../../assets/Images/p6.jpg"
const Expert = () => {
  const experts = [
    {
      name: "Jessica Jones",
      role: "Chef",
      image: img11,
      description: "Explain ten main uncivil engaged product. Am likewise betrayed as declared absolute do."
    },
    {
      name: "Abel Natacha",
      role: "Patissier",
      image:img11,
      description: "Explain ten main uncivil engaged product. Am likewise betrayed as declared absolute do."
    },
    {
      name: "Gabriela Beckett",
      role: "Cook",
      image:img11,
      description: "Explain ten main uncivil engaged product. Am likewise betrayed as declared absolute do."
    }
  ];

  return (
    <section className="experts-section">
      <div className="section-header">
        <h3 className="section-subtitle">Chefs</h3>
        <h2 className="section-title">MEET OUR EXPERTS</h2>
        <p className="section-description">
          White men large of on front. Via be greater related adopted proceed entered on. Through if examine express
          promises no. Past add size gone cold get off old.
        </p>
      </div>

      <div className="experts-grid">
        {experts.map((expert, index) => (
          <div key={index} className="expert-card">
            <img
              src={expert.image}
              alt={expert.name}
              className="expert-image"
            />
            <h3 className="expert-name">{expert.name}</h3>
            <p className="expert-role">{expert.role}</p>
            <p className="expert-description">{expert.description}</p>
            <div className="social-links">
              <a href="#" className="social-link">
                <FaFacebookF />
              </a>
              <a href="#" className="social-link">
                <FaTwitter />
              </a>
              <a href="#" className="social-link">
                <FaPinterestP />
              </a>
              <a href="#" className="social-link">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Expert;
