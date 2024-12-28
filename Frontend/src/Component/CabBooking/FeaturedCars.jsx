import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making HTTP requests
import '../../assets/Style/CabBooking/FeaturedCars.css'

import { IoPeopleOutline, IoFlashOutline, IoSpeedometerOutline, IoHardwareChipOutline, IoHeartOutline, IoTimeOutline, IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { colors } from '@mui/material';

const FeaturedCars = () => {
  const [menuItems, setMenuItems] = useState([]); // State to store fetched menu items
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [error, setError] = useState(null); // State to handle errors

  const categories = [
    'ALL',
    'PIZZA/PASTA',
    'SANDWICHES',
    'BRUNCH',
    'STEAK/GRILL',
    'SALAD'
  ];

  // Fetch menu items from the backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/foods'); // Replace with your backend endpoint
        setMenuItems(response.data.foods); // Assuming response contains a `foods` array
      } catch (err) {
        console.error("Error fetching menu items:", err);
        setError("Failed to load menu items. Please try again later.");
      }
    };

    fetchMenuItems();
  }, []);

  const filteredItems =
    activeCategory === 'ALL'
      ? menuItems
      : menuItems.filter(item => item.category === activeCategory);
  return (
    // <section className="featured-car" id="featured-car">
    //     <div className="container">
    //       <div className="title-wrapper">
    //         <h2 className="section-title">Featured cars</h2>
    //         <a href="#" className="featured-car-link">
    //           <span>View more</span>
    //         </a>
    //       </div>
    //       <ul className="featured-car-list">
    //         {[
    //           { name: "Toyota RAV4", year: 2021, price: 440, image: img1 },
    //           { name: "BMW 3 Series", year: 2019, price: 350, image: img1 },
    //           { name: "Volkswagen T-Cross", year: 2020, price: 400, image: img1 },
    //         ].map((car, index) => (
    //           <li key={index}>
    //             <div className="featured-car-card">
    //               <figure className="card-banner">
    //                 <img src={car.image} alt={car.name} loading="lazy" />
    //               </figure>
    //               <div className="card-content">
    //                 <div className="card-title-wrapper">
    //                   <h3 className="card-title"><a href="#">{car.name}</a></h3>
    //                   <data className="year" value={car.year}>{car.year}</data>
    //                 </div>
    //                 <ul className="card-list">
    //                   <li className="card-list-item">
    //                     <IoPeopleOutline />
    //                     <span className="card-item-text">4 People</span>
    //                   </li>
    //                   <li className="card-list-item">
    //                     <IoFlashOutline />
    //                     <span className="card-item-text">Hybrid</span>
    //                   </li>
    //                   <li className="card-list-item">
    //                     <IoSpeedometerOutline />
    //                     <span className="card-item-text">6.1km / 1-litre</span>
    //                   </li>
    //                   <li className="card-list-item">
    //                     <IoHardwareChipOutline />
    //                     <span className="card-item-text">Automatic</span>
    //                   </li>
    //                 </ul>
    //                 <div className="card-price-wrapper">
    //                   <p className="card-price">
    //                     <strong>${car.price}</strong> / month
    //                   </p>
    //                   <button className="btn fav-btn" aria-label="Add to favourite list">
    //                     <IoHeartOutline />
    //                   </button>
    //                   <button className="btn">Rent now</button>
    //                 </div>
    //               </div>
    //             </div>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   </section>
    <section className="menu-section">
      <h3 className="section-subtitle">Discover</h3>
      <h2 className="section-title">Our Menu</h2>
      <p className="section-description">
        White men large of on front. Via be greater related adopted proceed entered on. Through if examine express
        promises no. Past add size gone cold get off old.
      </p>

      <nav className="menu-nav">
        {categories.map(category => (
          <button
            key={category}
            className={activeCategory === category ? 'active' : ''}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>

      <div className="featured-car-list">
      {error ? (
        <p className="error-message">{error}</p>
      ) : filteredItems.length > 0 ? (
        filteredItems.map(item => (
          <div key={item._id} className="featured-car-card">
            <figure className="card-banner">
              <img src={`http://localhost:8080${item.image}`} alt={item.name} loading="lazy" />
            </figure>
            <div className="card-content">
              <div className="card-title-wrapper">
                <h3 className="card-title"><a href="#">{item.name}</a></h3>
                <data className="year" value={new Date().getFullYear()}>{new Date().getFullYear()}</data>
              </div>
              <ul className="card-list">
                <li className="card-list-item">
                  <IoPeopleOutline />
                  <span className="card-item-text">4 People</span>
                </li>
                <li className="card-list-item">
                  <IoFlashOutline />
                  <span className="card-item-text">{item.category}</span>
                </li>
                <li className="card-list-item">
                  <IoSpeedometerOutline />
                  <span className="card-item-text">Fresh</span>
                </li>
                <li className="card-list-item">
                  <IoHardwareChipOutline />
                  <span className="card-item-text">High Quality</span>
                </li>
              </ul>
              <div className="card-price-wrapper">
                <p className="card-price">
                  <strong>${item.price}</strong> / item
                </p>
                <button className="btn fav-btn" aria-label="Add to favourite list">
                  <IoHeartOutline />
                </button>
                <button className="btn">Add to cart</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="no-items-message">No menu items available at the moment.</p>
      )}
    </div>

    </section>
  )
}

export default FeaturedCars