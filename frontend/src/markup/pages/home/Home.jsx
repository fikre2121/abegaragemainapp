import React from "react";
import Image from "../../../../src/assets/templateassets/images/custom/pages/contact\ 3.jpg";
import Pagetitle from "../../components/ui/Pagetitle";

import AboutSection from "../../components/ui/AboutSection";
import AboutWorkshop from "../../components/ui/AboutWorkshop";
import WhyChooseUs from "../../components/ui/WhyChooseUs";
import VideoSection from "../../components/ui/VideoSection";
import newbout from "../../../../src/assets/templateassets/images/custom/pages/newbout.jpg";
function Home() {
  return (
    <>
      <div className="page-wrapper">
        {/* page title*/}
        <Pagetitle title="About us" background={Image} />

        {/* WORK SHOP */}

        <AboutWorkshop />
        {/* Services Section */}
        <section className="services-section">
          <div className="auto-container">
            <div className="sec-title style-two">
              <h2>Our Featured Services</h2>

              <div className="text">
                We provide high-quality automotive solutions with experienced
                mechanics, modern equipment, and customer-focused service.
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4 service-block-one">
                <div className="inner-box hvr-float-shadow">
                  <h5>Service and Repairs</h5>
                  <h2>Performance Upgrade</h2>

                  <a href="#" className="read-more">
                    Read More +
                  </a>

                  <div className="icon">
                    <span className="flaticon-power"></span>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 service-block-one">
                <div className="inner-box hvr-float-shadow">
                  <h5>Service and Repairs</h5>
                  <h2>Transmission Services</h2>

                  <a href="#" className="read-more">
                    Read More +
                  </a>

                  <div className="icon">
                    <span className="flaticon-gearbox"></span>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 service-block-one">
                <div className="inner-box hvr-float-shadow">
                  <h5>Service and Repairs</h5>
                  <h2>Brake Repair & Service</h2>

                  <a href="#" className="read-more">
                    Read More +
                  </a>

                  <div className="icon">
                    <span className="flaticon-brake-disc"></span>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 service-block-one">
                <div className="inner-box hvr-float-shadow">
                  <h5>Service and Repairs</h5>
                  <h2>Engine Service & Repair</h2>

                  <a href="#" className="read-more">
                    Read More +
                  </a>

                  <div className="icon">
                    <span className="flaticon-car-engine"></span>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 service-block-one">
                <div className="inner-box hvr-float-shadow">
                  <h5>Service and Repairs</h5>
                  <h2>Tyre & Wheels</h2>

                  <a href="#" className="read-more">
                    Read More +
                  </a>

                  <div className="icon">
                    <span className="flaticon-tire"></span>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 service-block-one">
                <div className="inner-box hvr-float-shadow">
                  <h5>Service and Repairs</h5>
                  <h2>Denting & Painting</h2>

                  <a href="#" className="read-more">
                    Read More +
                  </a>

                  <div className="icon">
                    <span className="flaticon-spray-gun"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="auto-container">
            <div className="row">
              <div className="col-lg-6">
                <div className="inner-container">
                  <h2>
                    Quality Service And <br /> Customer Satisfaction !!
                  </h2>

                  <div className="text">
                    We utilize the latest diagnostic equipment to ensure your
                    vehicle is repaired and serviced properly in a timely
                    manner. We are part of a professional auto service network
                    focused on delivering high-quality automotive solutions and
                    exceptional customer satisfaction.
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="image">
                  <img
                    src="assets/images/custom/pages/homesmall.jpg"
                    alt="Customer Satisfaction"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="why-choose-us">
          <div className="auto-container">
            <div className="row">
              <div className="col-lg-6">
                <div className="sec-title style-two">
                  <h2>Why Choose Us</h2>

                  <div className="text">
                    We provide trusted automotive services with experienced
                    mechanics, affordable pricing, and quality workmanship.
                  </div>
                </div>

                <div className="icon-box">
                  <div className="icon">
                    <span className="flaticon-mechanic"></span>
                  </div>

                  <h4>Certified Expert Mechanics</h4>
                </div>

                <div className="icon-box">
                  <div className="icon">
                    <span className="flaticon-wrench"></span>
                  </div>

                  <h4>Fast And Quality Service</h4>
                </div>

                <div className="icon-box">
                  <div className="icon">
                    <span className="flaticon-price-tag-1"></span>
                  </div>

                  <h4>Best Prices in Town</h4>
                </div>

                <div className="icon-box">
                  <div className="icon">
                    <span className="flaticon-trophy"></span>
                  </div>

                  <h4>Awarded Workshop</h4>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="sec-title style-two">
                  <h2>Additional Services</h2>
                </div>

                <div className="row">
                  <div className="col-md-5">
                    <div className="image">
                      <img
                        src="assets/images/custom/pages/homelong.jpg"
                        alt="Services"
                      />
                    </div>
                  </div>

                  <div className="col-md-7">
                    <ul className="list">
                      <li>General Auto Repair & Maintenance</li>
                      <li>Transmission Repair & Replacement</li>
                      <li>Tire Repair and Replacement</li>
                      <li>State Emissions Inspection</li>
                      <li>Brake Job / Brake Services</li>
                      <li>Electrical Diagnostics</li>
                      <li>Fuel System Repairs</li>
                      <li>Starting and Charging Repair</li>
                      <li>Steering and Suspension Work</li>
                      <li>Emission Repair Facility</li>
                      <li>Wheel Alignment</li>
                      <li>Computer Diagnostic Testing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="video-section">
          <div
            data-parallax='{"y": 50}'
            className="sec-bg"
            style={{
              backgroundImage: "url(assets/images/custom/pages/contact 3.jpg)",
            }}
          ></div>

          <div className="auto-container">
            <h5>Working since 1992</h5>

            <h2>
              We are leader <br /> in Car Mechanical Work
            </h2>

            <div className="video-box">
              <div className="video-btn">
                <a
                  href="https://www.youtube.com/watch?v=nfP5N9Yc72A&t=28s"
                  className="overlay-link lightbox-image video-fancybox ripple"
                >
                  <i className="flaticon-play"></i>
                </a>
              </div>

              <div className="text">
                Watch intro video <br /> about us
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="auto-container">
            <div className="wrapper-box">
              <div className="left-column">
                <h3>Schedule Your Appointment Today</h3>

                <div className="text">
                  Your Automotive Repair & Maintenance Service Specialist
                </div>
              </div>

              <div className="right-column">
                <div className="phone">1800.456.7890</div>

                <div className="btn">
                  <a href="#" className="theme-btn btn-style-one">
                    <span>Appointment</span>

                    <i className="flaticon-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
