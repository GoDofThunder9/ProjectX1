import React from 'react';
import "../../assets/Style/CabBooking/PosterCab.css";
import img1 from '../../assets/CabImages/img2.jpeg';
import img2 from '../../assets/CabImages/img1.jpeg';
import img3 from '../../assets/CabImages/img3.jpeg';

function PosterCab() {
  return (
    <section className="PosterCab-sectionspace PosterCab-haslayout">
      <div className="PosterCab-container-Tourism">
        <div className="PosterCab-row">
          <div className="PosterCab-col">
            <div className="PosterCab-toursdestinations">
              <div className="PosterCab-tourdestination PosterCab-tourdestinationbigbox">
                <figure>
                  <a href="javascript:void(0);">
                    <img src={img1} alt="image destinations" />
                    <div className="PosterCab-hoverbox">
                      <div className="PosterCab-adventuretitle"></div>
                      <div className="PosterCab-description"></div>
                    </div>
                  </a>
                </figure>
              </div>
              <div className="PosterCab-tourdestination">
                <figure>
                  <a href="javascript:void(0);">
                    <img src={img2} alt="image destinations" />
                    <div className="PosterCab-hoverbox">
                      <div className="PosterCab-adventuretitle"></div>
                    </div>
                  </a>
                </figure>
              </div>
              <div className="PosterCab-tourdestination">
                <figure>
                  <a href="javascript:void(0);">
                    <img src={img3} alt="image destinations" />
                    <div className="PosterCab-hoverbox">
                      <div className="PosterCab-adventuretitle"></div>
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

export default PosterCab;
