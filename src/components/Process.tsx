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
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll(".process-step");
    if (!cards) return;

    // Set initial state
    gsap.set(cards, { y: 50, opacity: 0 });

    const ctx = gsap.context(() => {
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative overflow-hidden py-20 md:py-32">
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

        {/* Steps grid */}
        <div ref={cardsRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className="process-step group relative rounded-2xl border border-dark-700/50 bg-dark-900/30 p-6 transition-all duration-500 hover:border-brand-500/30 hover:bg-dark-800/50 md:p-8"
            >
              <span className="font-display text-4xl font-bold text-dark-800 transition-colors duration-500 group-hover:text-brand-500/20 md:text-5xl">
                {step.num}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-white md:text-xl">
                {step.title}
              </h3>
              <p className="mt-2 text-xs font-light leading-relaxed text-dark-400 md:mt-3 md:text-sm">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
