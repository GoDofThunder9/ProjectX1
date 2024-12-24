import React, { useState } from 'react';
import '../../assets/Style/TourismStyle/Section.css';
import { ChevronLeft, ChevronRight } from 'react-feather';

const destinations = [
  {
    id: 1,
    title: "Paris",
    subtitle: "Beautiful cities ideas",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 2,
    title: "Egypt",
    subtitle: "in the streets of London",
    image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 3,
    title: "London",
    subtitle: "in the streets of London",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: 4,
    title: "Istanbul",
    subtitle: "Beautiful Mosque",
    image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
  }
];

const DestinationSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === destinations.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? destinations.length - 1 : prev - 1));
  };

  return (
    <div className="slider-container">
      {destinations.map((destination, index) => (
        <div
          key={destination.id}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{
            transform: `translateX(${(index - currentSlide) * 100}%)`,
          }}
        >
          <div className="image-container">
            <img src={destination.image} alt={destination.title} />
            <div className="overlay1"></div>
            <div className="content">
              <h2>{destination.title}</h2>
              <p>{destination.subtitle}</p>
            </div>
          </div>
        </div>
      ))}
      
      <button className="nav-button prev" onClick={prevSlide}>
        <ChevronLeft size={24} />
      </button>
      <button className="nav-button next" onClick={nextSlide}>
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default DestinationSlider;

