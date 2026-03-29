import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageLayout from "../components/layout/PageLayout";
import PageHero from "../components/layout/PageHero";
import SplitText from "../components/SplitText";
import ImageReveal from "../components/ImageReveal";
import MagneticButton from "../components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const thinkingPoints = [
  "Every design decision is backed by structural logic and material science",
  "We simulate loads, light, and airflow before construction begins",
  "Cost engineering is embedded into the design process — not an afterthought",
  "Our technology stack enables real-time collaboration and monitoring",
  "Sustainability is achieved through engineering optimization, not compromise",
];

const approachSteps = [
  {
    num: "01",
    title: "Design",
    desc: "Creative exploration grounded in engineering principles. We develop concepts that are beautiful, buildable, and budget-conscious.",
  },
  {
    num: "02",
    title: "Engineering",
    desc: "Detailed structural, MEP, and material analysis. Every element is engineered for performance, safety, and longevity.",
  },
  {
    num: "03",
    title: "Execution",
    desc: "Precision construction with tech-driven project management. We monitor every milestone to ensure quality and timeliness.",
  },
  {
    num: "04",
    title: "Technology Integration",
    desc: "Smart systems, digital monitoring, and sustainable solutions woven into the fabric of every project we deliver.",
  },
];

export default function AboutPage() {
  const visionRef = useRef<HTMLDivElement>(null);
  const thinkingRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(visionRef.current?.querySelectorAll(".vision-animate") ?? [], {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: visionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(thinkingRef.current?.querySelectorAll(".thinking-card") ?? [], {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: thinkingRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      const cards = approachRef.current?.querySelectorAll(".approach-card");
      if (cards) {
        gsap.set(cards, { y: 50, opacity: 0 });
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: approachRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <PageLayout>
      <PageHero
        tagline="About Us"
        title="Where Vision Meets Precision"
        subtitle="ARCONIN is a multidisciplinary design and construction firm based in Hyderabad, delivering engineering-driven architecture, interiors, and project management."
      />

      {/* Vision & Mission */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8" ref={visionRef}>
          <div className="grid items-center gap-10 md:gap-16 lg:grid-cols-2 lg:gap-24">
            <ImageReveal className="relative rounded-2xl">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-dark-800">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                  alt="Modern architectural design"
                  className="h-full w-full object-cover"
                />
              </div>
            </ImageReveal>

            <div>
              <div className="vision-animate mb-8 md:mb-12">
                <h3 className="mb-3 font-display text-xs font-semibold tracking-wider text-brand-400 uppercase md:text-sm">Our Vision</h3>
                <p className="text-base font-light leading-relaxed text-dark-300 md:text-lg">
                  To be the most trusted name in architecture and construction in Hyderabad — known for
                  engineering excellence, design innovation, and technology-driven project delivery.
                </p>
              </div>

              <div className="vision-animate">
                <h3 className="mb-3 font-display text-xs font-semibold tracking-wider text-brand-400 uppercase md:text-sm">Our Mission</h3>
                <p className="text-base font-light leading-relaxed text-dark-300 md:text-lg">
                  To deliver spaces that are structurally sound, aesthetically refined, and
                  technologically advanced — while ensuring transparency, quality, and client
                  satisfaction at every stage of the project lifecycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-serif text-[30vw] leading-none text-dark-900/30 md:text-[20vw]">
          &ldquo;
        </div>
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <p className="font-serif text-xl font-light italic leading-relaxed text-dark-100 md:text-3xl lg:text-4xl">
            <SplitText type="words" stagger={0.02} duration={0.6}>
              We founded ARCONIN with a simple belief — that great buildings are born from the marriage of creative design and engineering rigor. Every project we take on is a commitment to this philosophy.
            </SplitText>
          </p>
          <div className="mt-8 md:mt-10">
            <p className="font-display text-xs font-semibold tracking-wider text-white uppercase md:text-sm">
              Ram & Satish
            </p>
            <p className="mt-1 text-[11px] text-dark-500 md:text-xs">Founders, ARCONIN</p>
          </div>
        </div>
      </section>

      {/* Engineering-Driven Thinking */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 md:mb-20">
            <div className="mb-4 flex items-center gap-3 md:mb-6">
              <div className="h-px w-8 bg-brand-500 md:w-12" />
              <span className="text-xs tracking-[0.2em] text-brand-400 uppercase md:text-sm md:tracking-[0.3em]">Our Philosophy</span>
            </div>
            <h2 className="max-w-2xl font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              <SplitText type="words" stagger={0.04}>
                Engineering-Driven Thinking
              </SplitText>
            </h2>
          </div>

          <div ref={thinkingRef} className="space-y-4">
            {thinkingPoints.map((point, i) => (
              <div
                key={i}
                className="thinking-card flex items-start gap-4 rounded-xl border border-dark-700/50 bg-dark-900/30 p-4 md:p-5"
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/10">
                  <div className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                </div>
                <p className="text-sm font-light text-dark-200 md:text-base">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 text-center md:mb-20">
            <div className="mb-4 flex items-center justify-center gap-3 md:mb-6">
              <div className="h-px w-8 bg-brand-500 md:w-12" />
              <span className="text-xs tracking-[0.2em] text-brand-400 uppercase md:text-sm md:tracking-[0.3em]">Our Approach</span>
              <div className="h-px w-8 bg-brand-500 md:w-12" />
            </div>
            <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              <SplitText type="words" stagger={0.04}>
                How We Deliver Excellence
              </SplitText>
            </h2>
          </div>

          <div ref={approachRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
            {approachSteps.map((step) => (
              <div
                key={step.num}
                className="approach-card group relative rounded-2xl border border-dark-700/50 bg-dark-900/30 p-6 transition-all duration-500 hover:border-brand-500/30 hover:bg-dark-800/50 md:p-8"
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

          <div className="mt-12 text-center md:mt-16">
            <MagneticButton
              as="link"
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full border border-brand-500/40 bg-brand-500/10 px-8 py-3 font-display text-xs font-medium tracking-wider text-brand-300 uppercase transition-all hover:border-brand-500 hover:bg-brand-500/20 md:px-10 md:py-4 md:text-sm"
            >
              Start Your Project
              <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MagneticButton>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
