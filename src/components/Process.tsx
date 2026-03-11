import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We listen deeply — understanding your vision, lifestyle, requirements, and the story you want your space to tell.",
  },
  {
    num: "02",
    title: "Concept",
    desc: "Our designers craft innovative concepts with mood boards, sketches, and 3D visualizations that bring ideas to life.",
  },
  {
    num: "03",
    title: "Design",
    desc: "Detailed architectural drawings, material selections, and technical specifications — every detail meticulously planned.",
  },
  {
    num: "04",
    title: "Execute",
    desc: "From groundbreaking to final styling, we oversee every phase to ensure flawless execution of the design vision.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const stepsContainer = stepsContainerRef.current;
      if (!section || !stepsContainer) return;

      if (isMobile) {
        // Simple staggered reveal on mobile
        gsap.from(stepsContainer.querySelectorAll(".process-step"), {
          y: 40,
          opacity: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        });
        return;
      }

      const stepEls = stepsContainer.querySelectorAll(".process-step");

      // Pin the section (desktop only)
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${steps.length * 80}%`,
        pin: true,
        pinSpacing: true,
      });

      // Progress line
      gsap.to(progressRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${steps.length * 80}%`,
          scrub: true,
        },
      });

      // Reveal each step
      stepEls.forEach((step, i) => {
        if (i === 0) return;

        gsap.from(step, {
          opacity: 0,
          y: 60,
          duration: 0.5,
          scrollTrigger: {
            trigger: section,
            start: () => `${(i / steps.length) * 100}% top`,
            end: () => `${((i + 0.5) / steps.length) * 100}% top`,
            scrub: true,
          },
        });
      });

      // Animate step numbers
      const numEls = stepsContainer.querySelectorAll(".process-num");
      numEls.forEach((num, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: () => `${(i / steps.length) * 100}% top`,
          end: () => `${((i + 1) / steps.length) * 100}% top`,
          onEnter: () => {
            numEls.forEach((n) => n.classList.remove("text-brand-500"));
            num.classList.add("text-brand-500");
          },
          onEnterBack: () => {
            numEls.forEach((n) => n.classList.remove("text-brand-500"));
            num.classList.add("text-brand-500");
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative min-h-screen overflow-hidden py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center md:mb-20">
          <div className="mb-4 flex items-center justify-center gap-3 md:mb-6">
            <div className="h-px w-8 bg-brand-500 md:w-12" />
            <span className="text-xs tracking-[0.2em] text-brand-400 uppercase md:text-sm md:tracking-[0.3em]">Process</span>
            <div className="h-px w-8 bg-brand-500 md:w-12" />
          </div>
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            <SplitText type="words" stagger={0.04}>
              How We Work
            </SplitText>
          </h2>
        </div>

        <div ref={stepsContainerRef} className="relative">
          {/* Desktop: two-column with giant numbers */}
          <div className="hidden gap-16 md:grid md:grid-cols-2">
            {/* Left: Giant outlined step numbers */}
            <div className="relative flex flex-col items-center justify-center">
              {/* Vertical progress line */}
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-dark-800">
                <div
                  ref={progressRef}
                  className="h-full w-full origin-top bg-brand-500"
                  style={{ transform: "scaleY(0)" }}
                />
              </div>

              {steps.map((step) => (
                <div key={step.num} className="process-step">
                  <div className="process-num text-center font-display text-[12vw] font-bold leading-none text-dark-800 transition-colors duration-500 lg:text-[10vw]">
                    {step.num}
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Step details */}
            <div className="flex flex-col justify-center gap-16">
              {steps.map((step) => (
                <div key={step.num} className="process-step">
                  <span className="text-sm tracking-[0.3em] text-brand-500/50">{step.num}</span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm font-light leading-relaxed text-dark-400 md:mt-4 md:text-base">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Simple stacked cards */}
          <div className="space-y-8 md:hidden">
            {steps.map((step) => (
              <div key={step.num} className="process-step rounded-xl border border-dark-700/50 bg-dark-900/50 p-6">
                <span className="font-display text-3xl font-bold text-dark-800">
                  {step.num}
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-dark-400">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
