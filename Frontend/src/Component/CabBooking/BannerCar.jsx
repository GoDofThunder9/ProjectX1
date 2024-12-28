import React from 'react';
import '../../assets/Style/CabBooking/BannerCar.css';

const BannerCar = () => {
  const features = [
    {
      icon: "🚕",
      title: "Reliable Service",
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      icon: "💰",
      title: "Lowest Prices",
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      icon: "🕒",
      title: "24/7 Support",
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry."
    },
    {
      icon: "✅",
      title: "Best Cars",
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry."
    }
  ];

  return (
    <div className="why-choose-us11">
      <h2>Why Choose Us?</h2>
      <div className="features-container11">
        {features.map((feature, index) => (
          <div key={index} className="feature11">
            <div className="icon-circle11">
              <span className="icon11">{feature.icon}</span>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerCar;
