import React, { useRef, useState, useEffect } from "react";
import "../../assets/Style/Food/Testimonial.css";

const testimonials = [
  {
    id: 1,
    title: "Awesome Pizza",
    content: "The pizza was absolutely amazing! The crust was crispy, and the toppings were fresh.",
    author: "John Smith",
    image: "/p1.jpg",
  },
  {
    id: 2,
    title: "Delicious Burger",
    content: "The burger was juicy and full of flavor. Highly recommend!",
    author: "Jane Doe",
    image: "/p2.jpg",
  },
  {
    id: 3,
    title: "Amazing Service",
    content: "The staff was super friendly and attentive. Great experience!",
    author: "Mike Johnson",
    image: "/p3.jpg",
  },
  {
    id: 4,
    title: "Lovely Ambiance",
    content: "The atmosphere was cozy and perfect for a family dinner.",
    author: "Sarah Connor",
    image: "/p4.jpg",
  },
  {
    id: 5,
    title: "Great Desserts",
    content: "The desserts were a highlight. The cheesecake was divine!",
    author: "Emily Davis",
    image: "/p5.jpg",
  },
  {
    id: 6,
    title: "Tasty Drinks",
    content: "The mocktails were refreshing and delicious.",
    author: "Chris Evans",
    image: "/p6.jpg",
  },
  {
    id: 7,
    title: "Best Experience",
    content: "Everything about this place was perfect. Will come back for sure!",
    author: "Jessica Brown",
    image: "/p7.jpg",
  },
];

export function Testimonial() {
  const scrollContainer = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainer.current.offsetLeft);
    setScrollLeft(scrollContainer.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    scrollContainer.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateScrollProgress = () => {
    const container = scrollContainer.current;
    const scrollWidth = container.scrollWidth - container.clientWidth;
    const progress = (container.scrollLeft / scrollWidth) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    const container = scrollContainer.current;
    container.addEventListener("scroll", updateScrollProgress);
    return () => {
      container.removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <h2 className="testimonials-reviews">Reviews</h2>
        <h3 className="testimonials-title">TESTIMONIALS</h3>
        <p className="testimonials-description">
          While mirth large of on front. Ye he greater related adapted proceed
          entered an. Through it examine express promise no. Past add size game
          cold girl off how old.
        </p>
      </div>

      <div
        className="testimonials-scroll"
        ref={scrollContainer}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <img
              src={testimonial.image}
              alt={testimonial.author}
              className="testimonial-image"
            />
            <h4 className="testimonial-title">{testimonial.title}</h4>
            <p className="testimonial-content">{testimonial.content}</p>
            <span className="testimonial-author">- {testimonial.author}</span>
          </div>
        ))}
      </div>

      {/* Slider */}
      <div className="slider">
        <div
          className="slider-progress"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
    </section>
  );
}


export default Testimonial;
