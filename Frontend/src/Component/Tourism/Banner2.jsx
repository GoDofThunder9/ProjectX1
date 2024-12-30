import React from 'react'
import "../../assets/Style//TourismStyle/Banner2.css"
import img1 from "../../assets/Images/img1.jpg"
import img2 from "../../assets/Images/img2.jpg"
import img3 from "../../assets/Images/img3.jpg"
function Banner2() {
  return (
    <section className="tg-sectionspace tg-haslayout">
				<div className="container-Tourism">
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
							<div className="tg-toursdestinations">
								<div className="tg-tourdestination tg-tourdestinationbigbox">
									<figure>
										<a href="javascript:void(0);">
											<img src={img1} alt="image destinations"/>
											<div className="tg-hoverbox">
												<div className="tg-adventuretitle">
													<h2>Ice Adventure Vacations</h2>
												</div>
												<div className="tg-description">
													<p>your best vacation ever</p>
												</div>
											</div>
										</a>
									</figure>
								</div>
								<div className="tg-tourdestination">
									<figure>
										<a href="javascript:void(0);">
											<img src={img2} alt="image destinations"/>
											<div className="tg-hoverbox">
												<div className="tg-adventuretitle">
													<h2>National Park</h2>
												</div>
											</div>
										</a>
									</figure>
								</div>
								<div className="tg-tourdestination">
									<figure>
										<a href="javascript:void(0);">
											<img src={img3} alt="image destinations"/>
											<div className="tg-hoverbox">
												<div className="tg-adventuretitle">
													<h2>Adult Vacations</h2>
												</div>
											</div>
										</a>
									</figure>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

  )
}

export default Banner2;
