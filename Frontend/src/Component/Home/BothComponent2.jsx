import React from 'react';
import carrental from '../../assets/Images/Carrental.png';
import moviebooking from '../../assets/Images/Movieimg.jpg';
import "../../assets/Style/HomeStyle/BothComponent.css";

import { useNavigate } from 'react-router-dom';
  const TourismShowcase = () => {
  const navigate = useNavigate();
  return (
    <div className="tourism-container">
      <div className="tourism-card">
        <div className="image-container culinary">
            <img src={carrental} alt="" />
          <div className="overlay">
            <h2>Luxury Car for Booking</h2>
            <button onClick={()=>{
              navigate('cabBooking')
            }} className="explore-btn">Explore Car Rental</button>
          </div>
        </div>
      </div>

      <div className="tourism-card">
        <div className="image-container beach">
            <img src={moviebooking} alt="" />
          <div className="overlay">
            <h2>Movie Shows For Fun</h2>
            <button className="explore-btn">Explore Movie Shows</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourismShowcase;
