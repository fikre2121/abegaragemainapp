import React from "react";
import Image from "../../../../src/assets/templateassets/images/custom/pages/contact2.jpg";

import AboutSection from "../../components/ui/AboutSection";
import AboutWorkshop from "../../components/ui/AboutWorkshop";
import WhyChooseUs from "../../components/ui/WhyChooseUs";
import VideoSection from "../../components/ui/VideoSection";
import newbout from "../../../../src/assets/templateassets/images/custom/pages/contact3.jpg";
import Featuresection from "../../components/ui/FeaturesSection";
import Servicesec from "../../components/ui/ServicesSection";
import Pagetitle from "../../components/ui/Pagetitle";

function Service() {
  return (
    <div classNameName="page-wrapper">
      <Pagetitle title={"Services"} background={Image} breadcrumb="Service" />
      <Servicesec />
      <WhyChooseUs />
      <VideoSection
        bgImage={newbout}
        videoLink="https://www.youtube.com/watch?v=nfP5N9Yc72A"
      />
      {/* <!-- CTA Section --> */}
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
                  <span>contact us</span>
                  <i className="flaticon-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Service;
