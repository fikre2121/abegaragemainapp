import React from "react";

function VideoSection({ bgImage, videoLink }) {
  return (
    <section className="video-section">
      {/* Background */}
      <div
        data-parallax='{"y": 50}'
        className="sec-bg"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      ></div>

      <div className="auto-container">
        <h5>Working since 1992</h5>

        <h2>We are leader <br/> in Car Mechanical Work</h2>

        <div className="video-box">
          <div className="video-btn">
            <a
              href={videoLink}
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
  );
}

export default VideoSection;
