import React, { useState, useEffect } from "react";
import axios from "axios"; // For making HTTP requests
import "../../assets/Style/CabBooking/FeaturedCars.css";

import {
  IoPeopleOutline,
  IoFlashOutline,
  IoSpeedometerOutline,
  IoHardwareChipOutline,
} from "react-icons/io5";

const currencyOptions = {
  "USD": "$",
  "EUR": "€",
  "GBP": "£",
  "INR": "₹",
  "AUD": "A$",
  "CAD": "C$",
  "PHP": "₱",
};

const FeaturedCabs = ({ searchCriteria }) => {
  const [cabs, setCabs] = useState([]); // State to store fetched cab items
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [error, setError] = useState(null); // State to handle errors

  const categories = ["ALL", "SUV", "Sedan", "Hatchback", "Luxury"];
  const storedUserId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchCabs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/cabs`);
        setCabs(Array.isArray(response.data.cabs) ? response.data.cabs : []);
      } catch (err) {
        console.error("Error fetching cab items:", err);
        setError("Failed to load cab items. Please try again later.");
      }
    };

    fetchCabs();
  }, []);

  const handleBookNow = async (cabId, userId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/invoicecar/${cabId}/${userId}`);
  
      if (response.status === 200 && response.data.whatsappUrl) {
        window.open(response.data.whatsappUrl, "_blank");
      } else {
        alert("Failed to generate invoice.");
      }
    } catch (error) {
      console.error("Error generating invoice:", error);
      alert("Error processing your request.");
    }
  };
  
  const filteredCabs = cabs.filter((cab) => {
    const matchesCategory =
      activeCategory === "ALL" || cab.category === activeCategory;

    const matchesModel =
      !searchCriteria?.carModel ||
      cab.category.toLowerCase().includes(searchCriteria.carModel.toLowerCase());

    const matchesPayment =
      !searchCriteria?.maxPayment ||
      parseFloat(cab.price) <= parseFloat(searchCriteria.maxPayment);

    const matchesCapacity =
      !searchCriteria?.capacity ||
      cab.capacity === searchCriteria.capacity;

    return matchesCategory && matchesModel && matchesPayment && matchesCapacity;
  });

  return (
    <section className="menu-section">
      <h3 className="section-subtitle">Discover</h3>
      <h2 className="section-title">Our Menu</h2>
      <p className="section-description">
        Choose from a wide range of cabs suited for your travel needs, whether
        it's a quick ride or a luxury experience.
      </p>

      <nav className="menu-nav">
        {categories.map((category) => (
          <button
            key={category}
            className={activeCategory === category ? "active" : ""}
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
          filteredCabs.map((cab) => (
            <div key={cab._id} className="menu-item">
              <img
                src={`${import.meta.env.VITE_API_URL}/api${cab.image}`}
                alt={cab.name}
                className="menu-item-image"
              />
              <span className="menu-item-price">{currencyOptions[cab.currency] || cab.currency} {cab.price}/day</span>
              <h3 className="menu-item-title">{cab.name}</h3>
              <p className="menu-item-category">{cab.category}</p>
              <ul className="menu-item-details">
                <li>
                  <IoPeopleOutline />
                  {cab.capacity} People
                </li>
                <li>
                  <IoFlashOutline />
                  {cab.fuelType || "Petrol/Diesel"}
                </li>
                <li>
                  <IoSpeedometerOutline />
                  {cab.mileage || "N/A"} km/l
                </li>
                <li>
                  <IoHardwareChipOutline />
                  {cab.transmission || "Manual"}
                </li>
              </ul>
              <div className="menu-item-actions">
                <button
                  key={cab._id}
                  className="order-button"
                  onClick={() => handleBookNow(cab._id, storedUserId)}
                >
                  Book Now
                </button>
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
