import React, { useState, useEffect } from 'react';
import '../../assets/Style/CabBooking/TestimonialSlider.css';

const TestimonialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      text: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      author: "John Smith",
      title: "Founder & CEO, Company Name",
      image: "/person1.jpg"
    },
    {
      id: 2,
      text: "Our experience has been nothing short of excellent. The team's dedication and expertise have truly transformed our business operations.",
      author: "Sarah Johnson",
      title: "CTO, Tech Solutions Inc",
      image: "/person2.jpg"
    },
    {
      id: 3,
      text: "The level of professionalism and innovation we've seen is remarkable. They've exceeded our expectations in every way possible.",
      author: "Michael Chen",
      title: "Director of Operations",
      image: "/person3.jpg"
    },
    {
      id: 4,
      text: "Working with this team has been a game-changer for our company. Their insights and solutions have been invaluable.",
      author: "Emma Davis",
      title: "Marketing Director",
      image: "/person4.jpg"
    },
    {
      id: 5,
      text: "The results speak for themselves. Our efficiency has improved dramatically since implementing their solutions.",
      author: "Robert Wilson",
      title: "Head of Innovation",
      image: "/person5.jpg"
    }
  ];

  useEffect(() => {
    let interval;

    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div 
      className="testimonial-container"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <h2 className="testimonial-title">
        What our people are saying
      </h2>

      <div className="testimonial-card">
        <span className="quote-icon">❝</span>
        
        <div className="testimonial-content">
          <div className="avatar-container">
            <img 
              src={testimonials[currentSlide].image} 
              alt={testimonials[currentSlide].author}
              className="avatar-image"
            />
          </div>

          <div className="testimonial-text">
            <blockquote>
              {testimonials[currentSlide].text}
            </blockquote>
            
            <div className="author-info">
              <p className="author-name">
                {testimonials[currentSlide].author}
              </p>
              <p className="author-title">
                {testimonials[currentSlide].title}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="navigation-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`dot ${currentSlide === index ? 'active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
