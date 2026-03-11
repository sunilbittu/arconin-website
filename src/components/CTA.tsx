import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { y: "-20%" },
        {
          y: "20%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative flex min-h-[70vh] items-center justify-center overflow-hidden md:min-h-screen">
      {/* Background parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 -inset-y-[20%]"
        style={{
          background: "radial-gradient(ellipse at center, rgba(184, 147, 95, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Decorative lines (desktop only) */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-dark-700/30 to-transparent" />
        <div className="absolute left-3/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-dark-700/30 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div className="mb-4 flex items-center justify-center gap-3 md:mb-6">
          <div className="h-px w-8 bg-brand-500 md:w-12" />
          <span className="text-xs tracking-[0.2em] text-brand-400 uppercase md:text-sm md:tracking-[0.3em]">Start a Project</span>
          <div className="h-px w-8 bg-brand-500 md:w-12" />
        </div>

        <h2 className="font-serif text-3xl font-light leading-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
          <SplitText type="words" stagger={0.04} duration={1}>
            Let's Build Something Extraordinary
          </SplitText>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-sm font-light text-dark-400 md:mt-8 md:text-lg">
          Every masterpiece begins with a conversation. Tell us about your vision, and we'll bring it to life.
        </p>

        <div className="mt-8 flex justify-center md:mt-12">
          <MagneticButton
            as="a"
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full border border-brand-500/40 bg-brand-500/10 px-8 py-3 font-display text-xs font-medium tracking-wider text-brand-300 uppercase transition-all hover:border-brand-500 hover:bg-brand-500/20 md:px-10 md:py-4 md:text-sm"
          >
            Start Your Project
            <svg
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 md:h-4 md:w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
