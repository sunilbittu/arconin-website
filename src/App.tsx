import { useState, useCallback } from "react";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Services from "./components/Services";
import Process from "./components/Process";
import CTA from "./components/CTA";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <SmoothScroll>
      <CustomCursor />
      {!loaded && <Preloader onComplete={handlePreloaderComplete} />}
      <div className="min-h-screen bg-dark-950">
        <Navbar loaded={loaded} />
        <Hero loaded={loaded} />
        <Marquee />
        <About />
        <Services />
        {/* <Projects /> */}
        <Process />
        <CTA />
        <Contact />
        <Footer />
      </div>
    </SmoothScroll>
  );
}
