import React, { useState } from "react";
import "../../assets/Style/CabBooking/HeroSection.css";
import BannerimageCar from "../../assets/CabImages/CabBanner.mp4";
import FeaturedCars from "./FeaturedCars"; // Adjust the import path as needed

function HeroSection({ cars }) {
  const [searchCriteria, setSearchCriteria] = useState({
    carModel: "",
    maxPayment: "",
    capacity: "",
  });

  const [filteredCars, setFilteredCars] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // Filter cars based on search criteria
    const filtered = cars.filter((car) => {
      const matchesModel = car.name
        .toLowerCase()
        .includes(searchCriteria.carModel.toLowerCase());
      const matchesPayment =
        searchCriteria.maxPayment === "" ||
        parseFloat(car.price) <= parseFloat(searchCriteria.maxPayment);
      const matchesCapacity =
        searchCriteria.capacity === "" ||
        car.capacity.toString() === searchCriteria.capacity;

      return matchesModel && matchesPayment && matchesCapacity;
    });

    setFilteredCars(filtered);
  };

  return (
    <>
      <div className="app">
        <video
          className="background-video-cab"
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-bg-poster.jpg"
        >
          <source src={BannerimageCar} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <section className="hero" id="home">
        <div className="container">
          <form className="hero-form" onSubmit={handleSearch}>
            <div className="input-wrapper">
              <label htmlFor="input-1" className="input-label">
                Car, model, or brand
              </label>
              <input
                type="text"
                name="carModel"
                id="input-1"
                className="input-field"
                placeholder="What car are you looking for?"
                value={searchCriteria.carModel}
                onChange={handleChange}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="input-2" className="input-label">
                Max. monthly payment
              </label>
              <input
                type="text"
                name="maxPayment"
                id="input-2"
                className="input-field"
                placeholder="Add an amount in $"
                value={searchCriteria.maxPayment}
                onChange={handleChange}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="input-3" className="input-label">
                Capacity
              </label>
              <input
                type="text"
                name="capacity"
                id="input-3"
                className="input-field"
                placeholder="Add car capacity"
                value={searchCriteria.capacity}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn1">
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="featured-cars">
        <FeaturedCars searchCriteria={searchCriteria} />
      </section>
    </>
  );
}

export default HeroSection;
