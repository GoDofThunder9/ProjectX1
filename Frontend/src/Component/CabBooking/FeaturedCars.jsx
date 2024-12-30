import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making HTTP requests
import '../../assets/Style/CabBooking/FeaturedCars.css';

import {
  IoPeopleOutline,
  IoFlashOutline,
  IoSpeedometerOutline,
  IoHardwareChipOutline,
  IoHeartOutline,
} from 'react-icons/io5';

const FeaturedCabs = () => {
  const [cabs, setCabs] = useState([]); // State to store fetched cab items
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [error, setError] = useState(null); // State to handle errors

  const categories = ['ALL', 'SUV', 'Sedan', 'Hatchback', 'Luxury'];

  // Fetch cab items from the backend
  useEffect(() => {
    const fetchCabs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/cabs'); // Replace with your backend endpoint
        setCabs(Array.isArray(response.data.cabs) ? response.data.cabs : []); // Safeguard against undefined or non-array
      } catch (err) {
        console.error('Error fetching cab items:', err);
        setError('Failed to load cab items. Please try again later.');
      }
    };

    fetchCabs();
  }, []);

  const filteredCabs =
    activeCategory === 'ALL'
      ? cabs || [] // Ensure cabs is an array
      : cabs.filter(cab => cab.type === activeCategory);

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
        Choose from a wide range of cabs suited for your travel needs, whether it's a quick ride or a luxury experience.
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

      <div className="menu-grid">
        {error ? (
          <p className="error-message">{error}</p>
        ) : filteredCabs.length > 0 ? (
          filteredCabs.map(cab => (
            <div key={cab._id} className="menu-item">
              <img
                src={`http://localhost:8080${cab.image}`}
                alt={cab.name}
                className="menu-item-image"
              />
              <span className="menu-item-price">${cab.pricePerDay} / day</span>
              <h3 className="menu-item-title">{cab.name}</h3>
              <p className="menu-item-category">{cab.type}</p>
              <ul className="menu-item-details">
                <li>
                  <IoPeopleOutline />
                  {cab.capacity} People
                </li>
                <li>
                  <IoFlashOutline />
                  {cab.fuelType || 'Petrol/Diesel'}
                </li>
                <li>
                  <IoSpeedometerOutline />
                  {cab.mileage || 'N/A'} km/l
                </li>
                <li>
                  <IoHardwareChipOutline />
                  {cab.transmission || 'Manual'}
                </li>
              </ul>
              <div className="menu-item-actions">
                <button className="fav-btn" aria-label="Add to favourite list">
                  <IoHeartOutline />
                </button>
                <button className="order-button">Book Now</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-items-message">No cabs available at the moment.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedCabs;
