import React, { useEffect, useRef, useState } from 'react'
import caro1 from "../../assets/Images/caro1.jpg"
import "../../assets/Style/TourismStyle/TourismBanner.css"
import video from "../../assets/Images/bannervideo.mp4"
// import video from "../../assets/Images/v3.mp4"

function Banner() {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const videoContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVideoVisible(true); // Load the video
            observer.disconnect(); // Stop observing after loading
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the video container is visible
    );

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
<>
  <div className="TourismB" ref={videoContainerRef}>
    <div className='heading'>
      <h1>Experience the Wonder</h1>
      <h2>People don’t take trips, trips take People</h2>
    </div>
    <div className="TourVideo">
    {isVideoVisible && (
      <video 
      src={video} 
      className="TourVideoInside"
      alt="..." 
      autoPlay 
      loop 
      muted 
    />
    )}
    </div>
  </div>
</>
  )
}

export default Banner
