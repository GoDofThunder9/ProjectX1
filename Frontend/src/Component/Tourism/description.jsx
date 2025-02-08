import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // Use Axios or Fetch API for HTTP requests
import '../../assets/Style/TourismStyle/description.css';

const services = [
  {
    number: "01",
    title: "Luxury Hotels",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh tempor cum soluta nobis consectetuer nihil imperdiet doming..."
  },
  {
    number: "02",
    title: "Tourist Guide",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh tempor cum soluta nobis consectetuer nihil imperdiet doming..."
  },
  {
    number: "03",
    title: "Flights Tickets",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh tempor cum soluta nobis consectetuer nihil imperdiet doming..."
  }
];

const Description = () => {
  const [tours, setTours] = useState([]); // State to store fetched tours data
  const [error, setError] = useState(null); // State to handle errors
  const scrollContainerRef = useRef(null);

  // Fetch tours data from the backend
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/tours`);
        // const data = Array.isArray(response.data)? response.data: Object.values(response.data); 
        // const data = Array.isArray(response.data) && Array.isArray(response.data[0]) ? response.data[0] : response.data;
        // console.log("data",response.data.tours);
        setTours(response.data.tours); // Set the tours data if it's an array
      } catch (err) {
        console.error("Error fetching tours data:", err);
        setError("Failed to load tours. Please try again later.");
      }
    };

    fetchTours();
  }, []);

  // Scroll functionality for the slider
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  // StarRating Component
  const StarRating = ({ rating, reviews }) => {
    return (
      <div className="rating-container">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`star ${index < rating ? 'filled' : ''}`}
            viewBox="0 0 24 24"
            width="16"
            height="16"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        ))}
        <span className="review-count">({reviews} Review{reviews > 1 ? 's' : ''})</span>
      </div>
    );
  };
  const storedUserId = localStorage.getItem('userId');

  const handleBookNow = async (id, storedUserId) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/invoiceSender/${id}/${storedUserId}`);
        
        if (response.status === 200 && response.data.whatsappUrl) {
            window.open(response.data.whatsappUrl, "_blank"); // Open WhatsApp link in a new tab
        }
    } catch (error) {
        console.error("Error booking tour:", error);
        // alert("Failed to book the tour. Please try again.");
    }
};


  return (
    <>
      {/* Services Section */}
      <div className="services-container">
        {services.map((service, index) => (
          <div key={index} className="service-item">
            <div className="service-header">
              <span className="service-number">{service.number}</span>
              <h2 className="service-title">{service.title}</h2>
            </div>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>

      {/* Tours Section */}
      <div className="tour-slider">
        <div className="slider-header">
          <h2 className="slider-title">
            Popular Tours
            <span className="title-icon">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
          </h2>
          <div className="navigation-buttons1">
            <button className="nav-button1" onClick={() => scroll('left')}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="nav-button1" onClick={() => scroll('right')}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
          {/* {console.log("tours",tours)} */}

        <div className="tours-container" ref={scrollContainerRef}>
          {/* Error Message */}
          {error ? (
            <p className="error-message">{error}</p>
          ) : tours.length > 0 ? (
            
            tours.map((tour) => (
              <div key={tour._id} className="tour-card">
                <div className="card-image-container">
                  {/* {console.log(`http://localhost:8080/${tour.image}`)} */}
                  <img
                    src={`${import.meta.env.VITE_API_URL}/api${tour.image}`} 
                    alt={tour.title}
                    className="card-image"
                    />
                  {tour.discount && (
                    <span className="discount-badge">
                      {tour.discount}% Off
                    </span>
                  )}
                </div>
                <div className="card-content">
                  <h3 className="card-title">{tour.title}</h3>
                  <p className="card-description">{tour.description}</p>
                  <div className="card-footer">
                    <div className="tour-info">
                      <div className="duration">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>{tour.duration} Days</span>
                      </div>
                      <StarRating
                        rating={Math.round(tour.rating)}
                        reviews={tour.reviews}
                      />
                    </div>
                    <div className="price-info">
                      <span className="price-label">From</span>
                      <span className="price-value">
                        {tour.price}
                      </span>
                    </div>
                  </div>
                  <div className="card-action">
                    <button onClick={()=>handleBookNow(tour._id , storedUserId)} className="book-now-button">Book Now</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            
            <p className="no-tours-message">No tours available at the moment.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Description;
