import { useEffect, useRef, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroScene from "./three/HeroScene";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  loaded: boolean;
}

export default function Hero({ loaded }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaded) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // Pin hero briefly (skip on mobile)
      if (!isMobile) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=30%",
          pin: true,
          pinSpacing: true,
        });
      }

      // Parallax text on scroll
      gsap.to(contentRef.current, {
        y: isMobile ? "-10%" : "-30%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Tagline entrance
      gsap.from(taglineRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.5,
      });

    });

    return () => ctx.revert();
  }, [loaded]);

  return (
    <section
      ref={sectionRef}
      className="noise-bg relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[300px] w-[300px] rounded-full bg-brand-500/5 blur-[120px] md:h-[600px] md:w-[600px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[250px] w-[250px] rounded-full bg-brand-700/8 blur-[100px] md:h-[500px] md:w-[500px]" />

      {/* 3D Scene */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div ref={contentRef} className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-28 md:pt-32 lg:px-8">
        {/* Tagline */}
        <div ref={taglineRef} className="mb-6 flex items-center gap-3 md:mb-8" style={{ opacity: loaded ? undefined : 0 }}>
          <div className="h-px w-8 bg-brand-500 md:w-12" />
          <span className="text-xs font-light tracking-[0.2em] text-brand-400 uppercase md:text-sm md:tracking-[0.3em]">
            Architecture · Design · Interiors
          </span>
        </div>

        {/* Giant heading */}
        <div style={{ opacity: loaded ? 1 : 0 }}>
          <h1 className="font-display text-[11vw] font-bold leading-[0.9] tracking-tight text-white sm:text-[10vw] md:text-[8vw] lg:text-[7vw]">
            <SplitText type="chars" stagger={0.02} duration={1} delay={loaded ? 0 : 999}>
              Crafting
            </SplitText>
            <br />
            <SplitText type="chars" stagger={0.02} duration={1} delay={loaded ? 0.3 : 999} className="text-gradient">
              Spaces That
            </SplitText>
            <br />
            <SplitText type="chars" stagger={0.02} duration={1} delay={loaded ? 0.6 : 999} className="font-serif font-light italic">
              Inspire
            </SplitText>
          </h1>
        </div>


        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 md:bottom-12"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s 2s" }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.3em] text-dark-500 uppercase">Scroll</span>
            <div className="h-8 w-px animate-pulse bg-gradient-to-b from-brand-500/60 to-transparent md:h-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
