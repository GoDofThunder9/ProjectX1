import React from 'react';
import '../../assets/Style/TourismStyle/Destination.css'
import map from '../../assets/Images/map.png'; // You'll need to add your map image
const destinations = [
  { region: 'Europe', count: '05' },
  { region: 'Africa', count: '15' },
  { region: 'Asia', count: '12' },
  { region: 'Oceania', count: '22' },
  { region: 'North America', count: '08' },
  { region: 'South America', count: '27' }
];

const Destination = () => {
  return (
    <div className="popular-tours">
      <div className="content-wrapper">
        <div className="text-content">
          <h2 className="title">
            Popular Tours
            <span className="wave-decoration">
              <svg viewBox="0 0 100 20" className="wave">
                <path d="M0 10 Q25 20 50 10 T100 10" fill="none" stroke="black" strokeWidth="2"/>
              </svg>
            </span>
          </h2>
          
          <p className="description">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam consectetuer
            adipiscing elit, sed diam nonummy nibh...
          </p>

          <div className="destinations-grid">
            <div className="destinations-column">
              {destinations.slice(0, 3).map((dest, index) => (
                <div key={index} className="destination-item">
                  <span className="destination-name">{dest.region}</span>
                  <span className="destination-count">({dest.count})</span>
                </div>
              ))}
            </div>
            <div className="destinations-column">
              {destinations.slice(3).map((dest, index) => (
                <div key={index} className="destination-item">
                  <span className="destination-name">{dest.region}</span>
                  <span className="destination-count">({dest.count})</span>
                </div>
              ))}
            </div>
          </div>

          <button className="all-destinations-btn">
            ALL DESTINATIONS
          </button>
        </div>

        <div className="map-container">
          <img src={map} alt="World Map with Destinations" className="world-map" />
        </div>
      </div>
    </div>
  );
};

export default Destination;

