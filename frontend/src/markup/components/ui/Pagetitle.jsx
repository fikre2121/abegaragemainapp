import React from "react";
import { motion } from "framer-motion";

function PageTitle({ title, background, breadcrumb }) {

  
  return (
    <section
      className="page-title"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="auto-container">
        <h2>{title}</h2>

        <ul className="page-breadcrumb">
          <li>
            <a href="/">Home</a>
          </li>
          <li>{breadcrumb || title}</li>
        </ul>
      </div>

      <h1 data-parallax='{"x": 200}'>{title}</h1>
    </section>
  );
}

export default PageTitle;
