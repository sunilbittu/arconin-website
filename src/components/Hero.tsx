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
  const statsRef = useRef<HTMLDivElement>(null);
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

      // Stats counter
      const counters = statsRef.current?.querySelectorAll("[data-count]");
      counters?.forEach((el, i) => {
        const target = parseInt(el.getAttribute("data-count") || "0");
        gsap.from(
          { val: 0 },
          {
            val: target,
            duration: 2,
            delay: 0.8 + i * 0.2,
            ease: "power2.out",
            onUpdate: function () {
              (el as HTMLElement).textContent = `${Math.round(this.targets()[0].val)}`;
            },
          }
        );
      });

      // Stats entrance
      gsap.from(statsRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.6,
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
            <span className="text-gradient">
              <SplitText type="chars" stagger={0.02} duration={1} delay={loaded ? 0.3 : 999}>
                Spaces That
              </SplitText>
            </span>
            <br />
            <span className="font-serif font-light italic">
              <SplitText type="chars" stagger={0.02} duration={1} delay={loaded ? 0.6 : 999}>
                Inspire
              </SplitText>
            </span>
          </h1>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="mt-10 flex flex-wrap gap-6 md:mt-16 md:gap-12" style={{ opacity: loaded ? undefined : 0 }}>
          <div>
            <span className="font-display text-3xl font-bold text-gradient md:text-5xl" data-count="150">
              0
            </span>
            <span className="font-display text-3xl font-bold text-gradient md:text-5xl">+</span>
            <p className="mt-1 text-xs text-dark-400 md:mt-2 md:text-sm">Projects Delivered</p>
          </div>
          <div>
            <span className="font-display text-3xl font-bold text-gradient md:text-5xl" data-count="12">
              0
            </span>
            <p className="mt-1 text-xs text-dark-400 md:mt-2 md:text-sm">Years of Excellence</p>
          </div>
          <div>
            <span className="font-display text-3xl font-bold text-gradient md:text-5xl" data-count="35">
              0
            </span>
            <span className="font-display text-3xl font-bold text-gradient md:text-5xl">+</span>
            <p className="mt-1 text-xs text-dark-400 md:mt-2 md:text-sm">Design Awards</p>
          </div>
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
