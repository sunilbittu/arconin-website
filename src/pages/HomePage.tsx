import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";

import SplitText from "../components/SplitText";
import MagneticButton from "../components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const expertise = [
  {
    num: "01",
    title: "Architecture",
    desc: "Visionary architectural design that balances form, function, and sustainability for residential, commercial, and industrial spaces.",
  },
  {
    num: "02",
    title: "Construction",
    desc: "Engineering-driven construction with technology-backed project management, delivering quality on time and within budget.",
  },
  {
    num: "03",
    title: "Consultancy",
    desc: "Expert design and engineering consultancy — from site analysis and structural planning to turnkey project advisory.",
  },
  {
    num: "04",
    title: "Interior Design",
    desc: "Curated interior spaces that balance aesthetics, functionality, and personal expression across all scales and styles.",
  },
  {
    num: "05",
    title: "Tech-Driven Project Management",
    desc: "Real-time monitoring, digital design tools, and smart systems that bring transparency and precision to every project.",
  },
];

const whyArconin = [
  "Engineering-first approach to architecture and construction",
  "Integrated design-build model for seamless project delivery",
  "Technology-driven project monitoring and management",
  "Sustainability and green building practices in every project",
  "Client-centric process with transparent communication",
];

interface HomePageProps {
  loaded: boolean;
}

export default function HomePage({ loaded }: HomePageProps) {
  const expertiseRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Expertise cards
      const cards = expertiseRef.current?.querySelectorAll(".expertise-card");
      if (cards) {
        gsap.set(cards, { y: 50, opacity: 0 });
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: expertiseRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      // Why section
      gsap.from(whyRef.current?.querySelectorAll(".why-item") ?? [], {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: whyRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Hero loaded={loaded} />
      <Marquee />

      {/* Our Expertise */}
      <section className="relative py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 md:mb-20">
            <div className="mb-4 flex items-center gap-3 md:mb-6">
              <div className="h-px w-8 bg-brand-500 md:w-12" />
              <span className="text-xs tracking-[0.2em] text-brand-400 uppercase md:text-sm md:tracking-[0.3em]">Our Expertise</span>
            </div>
            <h2 className="max-w-2xl font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              <SplitText type="words" stagger={0.04}>
                Comprehensive Design & Build Solutions
              </SplitText>
            </h2>
          </div>

          <div ref={expertiseRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {expertise.map((item) => (
              <div
                key={item.num}
                className="expertise-card group relative rounded-2xl border border-dark-700/50 bg-dark-900/30 p-6 transition-all duration-500 hover:border-brand-500/30 hover:bg-dark-800/50 md:p-8"
              >
                <span className="font-display text-4xl font-bold text-dark-800 transition-colors duration-500 group-hover:text-brand-500/20 md:text-5xl">
                  {item.num}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-white md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs font-light leading-relaxed text-dark-400 md:mt-3 md:text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ARCONIN */}
      <section className="relative py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-10 md:gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <div className="mb-4 flex items-center gap-3 md:mb-6">
                <div className="h-px w-8 bg-brand-500 md:w-12" />
                <span className="text-xs tracking-[0.2em] text-brand-400 uppercase md:text-sm md:tracking-[0.3em]">Why ARCONIN</span>
              </div>
              <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                <SplitText type="words" stagger={0.04} duration={0.8}>
                  Engineered for Excellence
                </SplitText>
              </h2>
              <p className="mt-4 text-base font-light leading-relaxed text-dark-300 md:mt-6 md:text-lg">
                ARCONIN brings together architecture, engineering, and technology to deliver
                spaces that are built to last — and designed to inspire.
              </p>
            </div>

            <div ref={whyRef} className="space-y-4">
              {whyArconin.map((point, i) => (
                <div
                  key={i}
                  className="why-item flex items-start gap-4 rounded-xl border border-dark-700/50 bg-dark-900/30 p-4 md:p-5"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/10">
                    <div className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  </div>
                  <p className="text-sm font-light text-dark-200 md:text-base">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="relative flex min-h-[70vh] items-center justify-center overflow-hidden md:min-h-screen">
        <div className="absolute inset-0 -inset-y-[20%]" style={{ background: "radial-gradient(ellipse at center, rgba(184, 147, 95, 0.08) 0%, transparent 70%)" }} />
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
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-12">
            <MagneticButton
              as="link"
              to="/architecture"
              className="group inline-flex items-center gap-3 rounded-full border border-brand-500/40 bg-brand-500/10 px-8 py-3 font-display text-xs font-medium tracking-wider text-brand-300 uppercase transition-all hover:border-brand-500 hover:bg-brand-500/20 md:px-10 md:py-4 md:text-sm"
            >
              Explore Our Services
              <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </MagneticButton>
            <MagneticButton
              as="link"
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-brand-500 px-8 py-3 font-display text-xs font-medium tracking-wider text-white uppercase transition-all hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/20 md:px-10 md:py-4 md:text-sm"
            >
              Book a Consultation
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
