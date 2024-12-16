import React from 'react'
import "../assets/Style/component.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faTaxi, faUtensils, faPlane } from "@fortawesome/free-solid-svg-icons";
function component() {
  return (
    <section>
    <h1 className="section-heading">Our Services</h1>
    <div className="container-1">
      <div className="card fade-in" style={{ animationDelay: "0.1s" }}>
        <img src="https://via.placeholder.com/300x150" alt="Movie Booking" />
        <h2><i className="fas fa-film"></i> Movie Booking</h2>
        <p>Book your favorite movies in advance.</p>
      </div>
      <div className="card fade-in" style={{ animationDelay: "0.2s" }}>
        <img src="https://via.placeholder.com/300x150" alt="Cab Booking" />
        <h2><i className="fas fa-taxi"></i> Cab Booking</h2>
        <p>Find and book cabs anytime, anywhere.</p>
      </div>
      <div className="card fade-in" style={{ animationDelay: "0.3s" }}>
        <img src="https://via.placeholder.com/300x150" alt="Food Booking" />
        <h2><i className="fas fa-utensils"></i> Food Booking</h2>
        <p>Order delicious meals from your favorite places.</p>
      </div>
      <div className="card fade-in" style={{ animationDelay: "0.4s" }}>
        <img src="https://via.placeholder.com/300x150" alt="Tourist Booking" />
        <h2><i className="fas fa-plane"></i> Tourist Booking</h2>
        <p>Plan and book your dream vacations.</p>
      </div>
    </div>
  </section>
  )
}

export default component
