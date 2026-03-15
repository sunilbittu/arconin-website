import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(brandRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: brandRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-dark-800 py-12 md:py-20">
      <div ref={brandRef} className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-stroke pointer-events-none select-none text-center font-display text-[12vw] font-bold leading-none md:text-[15vw]">
          ARCONIN
        </div>

        <div className="mt-8 flex flex-col items-center gap-5 text-center md:mt-12 md:gap-6">
          <p className="max-w-md text-xs font-light text-dark-400 md:text-sm">
            Transforming visions into extraordinary spaces through innovative architecture,
            thoughtful design, and refined interiors.
          </p>

          <MagneticButton
            onClick={scrollToTop}
            className="mt-6 flex h-10 w-10 items-center justify-center rounded-full border border-dark-700 text-dark-400 transition-colors hover:border-brand-500 hover:text-brand-400 md:mt-8 md:h-12 md:w-12"
          >
            <svg className="h-3.5 w-3.5 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </MagneticButton>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-dark-800 pt-6 md:mt-16 md:flex-row md:gap-4 md:pt-8">
          <p className="text-[10px] text-dark-600 md:text-xs">
            &copy; {new Date().getFullYear()} Arconin Design Studio. All rights reserved.
          </p>
          <p className="text-[10px] text-dark-600 md:text-xs">
            Designed with passion for exceptional spaces.
          </p>
        </div>
      </div>
    </footer>
  );
}
