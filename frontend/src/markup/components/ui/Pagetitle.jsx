import React from "react";

function PageTitle({
  title,
  background,
  breadcrumb,
  subtitle,
  smallText,
  showVideo = false,
}) {
  return (
    <section className="video-section page-title">
      {/* Background */}
      <div
        className="sec-bg"
        style={{
          backgroundImage: `url(${background})`,
        }}
      ></div>

      <div className="auto-container">
        {/* Small Heading */}
        {smallText && <h5>{smallText}</h5>}

        {/* Main Title */}
        <h2>
          {title}
          {subtitle && (
            <>
              <br />
              {subtitle}
            </>
          )}
        </h2>

        {/* Breadcrumb */}
        <ul className="page-breadcrumb">
          <li>
            <a href="/">Home</a>
          </li>
          <li>{breadcrumb || title}</li>
        </ul>

        {/* Optional Video */}
        {showVideo && (
          <div className="video-box">
            <div className="video-btn">
              <a
                href="https://www.youtube.com/watch?v=HQ0_x9nXsbU"
                className="overlay-link lightbox-image video-fancybox ripple"
              >
                <i className="flaticon-play"></i>
              </a>
            </div>

            <div className="text">
              Watch intro video <br />
              about us
            </div>
          </div>
        )}
      </div>

      {/* Background Text */}
      <h1>{title}</h1>
    </section>
  );
}

export default PageTitle;
