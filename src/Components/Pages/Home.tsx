import React from "react";
import Hero from "../Sections/Hero";
import Services from "../Sections/Services";
import About from "../Sections/About";
import OurTeam from "../Sections/OurTeam";
import WorkingProcess from "../Sections/OurWork";
import WorkFor from "../Sections/WorkFor";
import Testimonies from "../Sections/Testimonies";
import FAQs from "../Sections/FAQs";
import GetInTouch from "../Sections/GenInTouch";
import NavHeader from "../Sections/NavHeader";
import Loader from "../Resuable/Loading";
import VideoPreview from "../Sections/Media";
import { useEffect } from "react";

const Home = () => {

   useEffect(() => {
    const sectionId = sessionStorage.getItem('scrollToSection');

    if (sectionId) {
      const scrollToElement = () => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          sessionStorage.removeItem('scrollToSection');
        } else {
          // Retry if not yet rendered
          setTimeout(scrollToElement, 100);
        }
      };

      scrollToElement();
    }
  }, []);

  return (
    <React.Suspense fallback={<Loader />}>
      <NavHeader />
      <Hero />
      <Services />
      <About />
      <OurTeam />
      <WorkingProcess />
      <WorkFor />
      <Testimonies />
      <FAQs />
      <VideoPreview />
      <GetInTouch />
    </React.Suspense>
  );
};

export default Home;