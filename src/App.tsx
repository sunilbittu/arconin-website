import { useState, useCallback } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ArchitecturePage from "./pages/ArchitecturePage";
import ConstructionPage from "./pages/ConstructionPage";
import ConsultingPage from "./pages/ConsultingPage";
import InteriorsPage from "./pages/InteriorsPage";
import InnovationPage from "./pages/InnovationPage";
import ProjectsPage from "./pages/ProjectsPage";
import TechnologyPage from "./pages/TechnologyPage";
import CareersPage from "./pages/CareersPage";
import ContactPage from "./pages/ContactPage";
import GalleryPage from "./pages/GalleryPage";

export default function App() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [loaded, setLoaded] = useState(!isHome);

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <SmoothScroll>
      <CustomCursor />
      {!loaded && isHome && <Preloader onComplete={handlePreloaderComplete} />}
      <div className="min-h-screen bg-dark-950">
        <Navbar loaded={loaded} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage loaded={loaded} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/architecture" element={<ArchitecturePage />} />
            <Route path="/construction" element={<ConstructionPage />} />
            <Route path="/consulting" element={<ConsultingPage />} />
            <Route path="/interiors" element={<InteriorsPage />} />
            <Route path="/innovation" element={<InnovationPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
