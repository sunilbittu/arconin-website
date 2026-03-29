import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageLayout from "../components/layout/PageLayout";
import PageHero from "../components/layout/PageHero";
import MagneticButton from "../components/MagneticButton";
import { positions } from "../data/careers";

gsap.registerPlugin(ScrollTrigger);

export default function CareersPage() {
  const ref = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".career-row", {
        clipPath: "inset(0 0 100% 0)",
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <PageLayout>
      <PageHero
        tagline="Careers"
        title="Build Your Future With Us"
        subtitle="Join a team of passionate architects, engineers, and designers shaping the future of construction and design in Hyderabad."
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8" ref={ref}>
          <div className="border-t border-dark-700/50">
            {positions.map((pos, i) => (
              <div
                key={pos.title}
                className="career-row group border-b border-dark-700/50"
                style={{ clipPath: "inset(0 0 0 0)" }}
              >
                <button
                  onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                  className="flex w-full items-center justify-between px-2 py-5 text-left transition-colors hover:bg-dark-900/30 md:py-8"
                >
                  <div className="flex items-center gap-4 md:gap-8 lg:gap-16">
                    <span className="text-xs font-display text-brand-500/50 md:text-sm">{pos.num}</span>
                    <h3 className="font-display text-lg font-semibold text-white transition-colors group-hover:text-brand-400 md:text-2xl lg:text-3xl">
                      {pos.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 md:gap-6">
                    <div className="hidden items-center gap-3 lg:flex">
                      <span className="rounded-full border border-dark-700 px-3 py-1 text-xs text-dark-400">{pos.type}</span>
                      <span className="rounded-full border border-dark-700 px-3 py-1 text-xs text-dark-400">{pos.location}</span>
                    </div>
                    <span className={`text-xl text-dark-500 transition-transform duration-300 md:text-2xl ${expandedIndex === i ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </div>
                </button>

                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{
                    maxHeight: expandedIndex === i ? "500px" : "0",
                    opacity: expandedIndex === i ? 1 : 0,
                  }}
                >
                  <div className="px-2 pb-6 md:pl-20 md:pr-8 md:pb-8 lg:pl-28">
                    <p className="text-sm font-light leading-relaxed text-dark-300 md:text-base">
                      {pos.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {pos.responsibilities.map((r, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <div className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-500/10">
                            <div className="h-1 w-1 rounded-full bg-brand-500" />
                          </div>
                          <span className="text-xs font-light text-dark-400 md:text-sm">{r}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <MagneticButton
                        as="a"
                        href="mailto:enquiry@arconin.com"
                        className="inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 px-6 py-2 text-xs font-medium text-brand-300 transition-all hover:border-brand-500 hover:bg-brand-500/20"
                      >
                        Apply Now
                      </MagneticButton>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
