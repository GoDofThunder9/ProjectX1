import React from 'react';
import "../../assets/Style/HomeStyle/BothComponent.css"
import tourismPhoto from '../../assets/Images/newtoursim.jpg';
import foodPhoto from '../../assets/Images/foodPhoto.jpg'
import { useNavigate } from 'react-router-dom';
const TourismShowcase = () => {
  const navigate = useNavigate();
  return (
    <div className="tourism-container" id='Explore'>
      <div className="tourism-card">
        <div className="image-container culinary">
            <img src={tourismPhoto} alt="" />
          <div className="overlay">
            <h2>Travelling for Travellers</h2>
            <button onClick={()=>{
              navigate('/Tourism');
            }} className="explore-btn">Explore Culinary Tours</button>
          </div>
        </div>
      </div>

      <div className="tourism-card">
        <div className="image-container beach">
            <img src={foodPhoto} alt="" />
          <div className="overlay">
            <h2>Food for Foodies</h2>
            <button onClick={()=>{
              navigate('/food')
            }} className="explore-btn">Discover Amazeing Food</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourismShowcase;
