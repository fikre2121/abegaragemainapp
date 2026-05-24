import React from "react";
import { motion } from "framer-motion";

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
      {/* Background Image */}
      <div
        className="sec-bg"
        style={{
          backgroundImage: `url(${background})`,
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="overlay"></div>

      <div className="auto-container">
        {/* Small Heading */}
        {smallText && (
          <motion.h5
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {smallText}
          </motion.h5>
        )}

        {/* Main Title */}
        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {title}

          {subtitle && (
            <>
              <br />
              {subtitle}
            </>
          )}
        </motion.h2>

        {/* Breadcrumb */}
        <motion.ul
          className="page-breadcrumb"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <li>
            <a href="/">Home</a>
          </li>

          <li>{breadcrumb || title}</li>
        </motion.ul>

        {/* Video Button */}
        {showVideo && (
          <motion.div
            className="video-box"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.8,
              type: "spring",
              stiffness: 120,
            }}
          >
            <motion.div
              className="video-btn"
              whileHover={{
                scale: 1.1,
              }}
            >
              <a
                href="https://www.youtube.com/watch?v=HQ0_x9nXsbU"
                target="_blank"
                rel="noopener noreferrer"
                className="overlay-link"
              >
                <i className="flaticon-play"></i>
              </a>
            </motion.div>

            <div className="text">
              Watch intro video <br />
              about us
            </div>
          </motion.div>
        )}
      </div>

      {/* Background Big Text */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ delay: 1 }}
      >
        {title}
      </motion.h1>
    </section>
  );
}

export default PageTitle;
