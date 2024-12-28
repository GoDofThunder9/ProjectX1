import React from 'react';
import '../../assets/Style/CabBooking/BannerCar.css'
import { IoCarOutline} from 'react-icons/io5';
import HeroSection from './HeroSection';
import FeaturedCars from './FeaturedCars';

const BannerCar = () => {
  return (
    <>
    <section className="get-start">
    <div className="container">
      <h2 className="section-title">Get started with 4 simple steps</h2>
      <ul className="get-start-list">
        {[
          { icon: "person-add-outline", title: "Create a profile", text: "If you are going to use a passage of Lorem Ipsum, you need to be sure." },
          { icon: "car-outline", title: "Tell us what car you want", text: "Various versions have evolved over the years, sometimes by accident, sometimes on purpose" },
          { icon: "person-outline", title: "Match with seller", text: "It to make a type specimen book. It has survived not only five centuries, but also the leap into electronic" },
          { icon: "card-outline", title: "Make a deal", text: "There are many variations of passages of Lorem available, but the majority have suffered alteration" },
        ].map((step, index) => (
          <li key={index}>
            <div className="get-start-card">
              <div className={`card-icon icon-${index + 1}`}>
                <IoCarOutline />
              </div>
              <h3 className="card-title">{step.title}</h3>
              <p className="card-text">{step.text}</p>
              {index === 0 && <a href="#" className="card-link">Get started</a>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
  </>
  );
};


export default BannerCar;

