import React from "react";
import Pagetitle from "../ui/Pagetitle";
import Image from "../../../../src/assets/templateassets/images/custom/pages/contact3.jpg";
import AboutSection from "../ui/AboutSection";
import AboutWorkshop from "../ui/AboutWorkshop";
import WhyChooseUs from "../ui/WhyChooseUs";
import VideoSection from "../ui/VideoSection";
import newbout from "../../../../src/assets/templateassets/images/custom/pages/newbout.jpg";

function About() {
  return (
    <>
      <Pagetitle title="About us" background={Image} />

      <AboutSection />
      <AboutWorkshop />
      <WhyChooseUs />
      <VideoSection
        bgImage={newbout}
        videoLink="https://www.youtube.com/watch?v=nfP5N9Yc72A"
      />
    </>
  );
}

export default About;
