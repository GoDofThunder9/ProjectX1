import React, { useEffect, useRef, useState } from 'react';
import '../../assets/Style/HomeStyle/Banner.css';
import v3 from '../../assets/Images/v3.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faWhatsapp, faFacebook } from '@fortawesome/free-brands-svg-icons';

const VideoBanner = () => {
  const [isVideoVisible , setIsVideoVisible] = useState(false);
  const videoRef = useRef(null);
  
  useEffect(()=>{
    const observer = new IntersectionObserver(
      (entries) =>{
        entries.forEach((entry)=>{
          if(entries.isIntersecting){
            setIsVideoVisible(true);
            observer.disconnect();
          }
        });
      },
      {threshold : 0.5}
    );
    
    if(videoRef.current)
    {
      observer.observe(videoRef.current);
    }

    return ()=>observer.disconnect();
  },[]);


  return (
    <div className="video-banner" ref={videoRef}>
      {isVideoVisible && (
        <video 
        className="banner-video"
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src={v3} type="video/mp4" />
      </video>
      )}
      <div className="banner-content">
        <h1>Welcome to Our Site</h1>
        <p>Discover amazing content and experiences</p>
        <a
          style={{
            textDecoration: "none",
            color: "white",
          }}
          href="#Explore"
        >
          <button className="cta-button">Explore</button>
        </a>
      </div>
      <div className="connection-logo">
        <a href="https://facebook.com"  target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon className='facebook'  icon={faFacebook} />
        </a>
        <a href="https://wa.me/6267533139?text=Hello%20there%2C%20I%27m%20interested%20in%20your%20services!"  target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon className='whatsapp' icon={faWhatsapp} />
        </a>
        <a href="https://instagram.com"  target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon className='instagram' icon={faInstagram} />
        </a>
      </div>
    </div>
  );
};

export default VideoBanner;
