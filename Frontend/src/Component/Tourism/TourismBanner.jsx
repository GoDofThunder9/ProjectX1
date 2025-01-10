import React from 'react'
import caro1 from "../../assets/Images/caro1.jpg"
import "../../assets/Style/TourismStyle/TourismBanner.css"
import video from "../../assets/Images/bannervideo.mp4"
// import video from "../../assets/Images/v3.mp4"

function Banner() {
  return (
<>
  <div className="TourismB" >
    <div className='heading'>
      <h1>Experience the Wonder</h1>
      <h2>People don’t take trips, trips take People</h2>
    </div>
    <div className="TourVideo">
        <video 
  src={video} 
  className="TourVideoInside"
  alt="..." 
  autoPlay 
  loop 
  muted 
/>
    </div>
  </div>
</>
  )
}

export default Banner
