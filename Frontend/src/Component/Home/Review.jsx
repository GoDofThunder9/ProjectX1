import React, { useState, useEffect } from "react";
import "../../assets/Style/HomeStyle/Review.css";

const reviews = [
  {
    id: 1,
    name: "Laly",
    time: "23 hours ago",
    review: "Great experience, never gets old.",
    rating: 5,
    image: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "Hayley L.",
    time: "1 day ago",
    review: "Incredible and free!",
    rating: 5,
    image: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "Kate de Boer",
    time: "1 day ago",
    review: "An amazing experience for kids and adults. We took the DASH bus there and back.",
    rating: 5,
    image: "https://via.placeholder.com/50",
  },
  {
    id: 4,
    name: "Kimberly Minihan",
    time: "1 day ago",
    review: "What an amazing experience. Full of beautiful displays about space, our planets, etc.",
    rating: 5,
    image: "https://via.placeholder.com/50",
  },
  {
    id: 5,
    name: "Vincent Mok",
    time: "1 day ago",
    review: "Very lovely spot to watch the sunset, and the science/astronomy exhibits are great.",
    rating: 5,
    image: "https://via.placeholder.com/50",
  },
  {
    id: 6,
    name: "Shaunak Sindgi",
    time: "1 day ago",
    review: "I've been here, but in GTA V. Amazing place.",
    rating: 5,
    image: "https://via.placeholder.com/50",
  },
];

function Review() {
  const [startIndex, setStartIndex] = useState(0);

  // Automatically rotate the carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 3000); // 3 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Get the 4 reviews to display
  const visibleReviews = [
    reviews[startIndex],
    reviews[(startIndex + 1) % reviews.length],
    reviews[(startIndex + 2) % reviews.length],
    reviews[(startIndex + 3) % reviews.length],
  ];

  return (
    <div>
      <h2 className="review-heading">Reviews</h2>
      {/* Heading */}
      <div className="review-carousel-container">
        {visibleReviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <img src={review.image} alt={review.name} className="profile-pic" />
              <div>
                <h3 className="review-name">{review.name}</h3>
                <p className="review-time">{review.time}</p>
              </div>
            </div>
            <div className="review-rating">
              {Array.from({ length: review.rating }, (_, i) => (
                <span key={i} className="star">★</span>
              ))}
            </div>
            <p className="review-text">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Review;
