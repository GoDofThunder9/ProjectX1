import React from 'react'
import shape from '../../assets/Images/shape.png'
import '../../assets/Style/HomeStyle/Banner.css'
import person from "../../assets/Images/person.png"
function Banner() {
  return (
<>
<main>
    <div className='big-wrapper light'>
    <img src={shape} alt="" className="shape" />
    <div className="showcase-area">
            <div className="container">
              <div className="left">
                <div className="big-title">
                  <h1>Future is here,</h1>
                  <h1>Start Exploring now.</h1>
                </div>
                <p className="text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Delectus eius distinctio odit, magni magnam qui ex perferendis
                  vitae!
                </p>
                <div className="cta">
                  <a href="#" className="btn">Get started</a>
                </div>
              </div>

              <div className="right">
                <img src={person} alt="Person" className="person" />
              </div>
            </div>
          </div>

          <div className="bottom-area">
            <div className="container">
              <button className="toggle-btn">
              </button>
            </div>
          </div>
    </div>
</main>
</>
  )
}

export default Banner
