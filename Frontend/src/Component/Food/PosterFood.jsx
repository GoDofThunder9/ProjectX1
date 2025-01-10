import React from 'react';
import "../../assets/Style/Food/PosterFood.css";
import img1 from '../../assets/FoodImages/img11.jpeg';
import img2 from '../../assets/FoodImages/img13.jpeg';
import img3 from '../../assets/FoodImages/img15.jpeg';

function PosterFood() {
  return (
    <section className="posterFood-sectionspace posterFood-haslayout">
      <div className="posterFood-container">
        <div className="posterFood-row">
          <div className="posterFood-col">
            <div className="posterFood-toursdestinations">
              <div className="posterFood-tourdestination-bigbox">
                <figure>
                  <a href="javascript:void(0);">
                    <img src={img1} alt="image destinations" />
                    <div className="posterFood-hoverbox">
                      <div className="posterFood-adventuretitle"></div>
                      <div className="posterFood-description"></div>
                    </div>
                  </a>
                </figure>
              </div>
              <div className="posterFood-tourdestination">
                <figure>
                  <a href="javascript:void(0);">
                    <img src={img2} alt="image destinations" />
                    <div className="posterFood-hoverbox">
                      <div className="posterFood-adventuretitle"></div>
                    </div>
                  </a>
                </figure>
              </div>
              <div className="posterFood-tourdestination">
                <figure>
                  <a href="javascript:void(0);">
                    <img src={img3} alt="image destinations" />
                    <div className="posterFood-hoverbox">
                      <div className="posterFood-adventuretitle"></div>
                    </div>
                  </a>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PosterFood;
