import React, { useRef } from 'react';
import '../../assets/Style/TourismStyle/description.css';
import img4 from "../../assets/Images/img4.jpg"
import img5 from "../../assets/Images/img5.jpg"
import img6 from "../../assets/Images/img6.jpg"
import img7 from "../../assets/Images/img7.jpg"
import img8 from "../../assets/Images/img8.jpg"
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
const tours = [
  {
    id: 1,
    title: "City Tours In Europe, Paris",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh...",
    image:img4,
    duration: 7,
    originalPrice: 2000,
    price: 2500,
    discount: 25,
    rating: 4,
    reviews: 3
  },
  {
    id: 2,
    title: "Best Of Canada Tours And Travel",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh...",
    image:img5,
    duration: 7,
    price: 600,
    rating: 4,
    reviews: 3
  },
  {
    id: 3,
    title: "Italy – 3 Days In Rome, Golden Gate",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh...",
    image:img6,
    duration: 7,
    price: 1430,
    rating: 4,
    reviews: 3
  },
  {
    id: 4,
    title: "Italy – 3 Days In Rome, Golden Gate",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh...",
    image:img7,
    duration: 7,
    price: 1430,
    rating: 4,
    reviews: 3
  },
  {
    id: 4,
    title: "Italy – 3 Days In Rome, Golden Gate",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh...",
    image:img8,
    duration: 7,
    price: 1430,
    rating: 4,
    reviews: 3
  },
  {
    id: 4,
    title: "Italy – 3 Days In Rome, Golden Gate",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh...",
    image:img4,
    duration: 7,
    price: 1430,
    rating: 4,
    reviews: 3
  },
  {
    id: 4,
    title: "Italy – 3 Days In Rome, Golden Gate",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh...",
    image:img6,
    duration: 7,
    price: 1430,
    rating: 4,
    reviews: 3
  },
  {
    id: 4,
    title: "Italy – 3 Days In Rome, Golden Gate",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh...",
    image:img8,
    duration: 7,
    price: 1430,
    rating: 4,
    reviews: 3
  },
];

const Description = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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
        <span className="review-count">({reviews} Review)</span>
      </div>
    );
  };

  return (
    <>
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

      <div className="tours-container" ref={scrollContainerRef}>
        {tours.map((tour) => (
          <div key={tour.id} className="tour-card">
            <div className="card-image-container">
              <img
                src={tour.image}
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
                  <StarRating rating={tour.rating} reviews={tour.reviews} />
                </div>
                <div className="price-info">
                  <span className="price-label">From</span>
                  <span className="price-value">${tour.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
              </>
  );
};

export default Description;

