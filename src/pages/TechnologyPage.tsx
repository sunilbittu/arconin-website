import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageLayout from "../components/layout/PageLayout";
import PageHero from "../components/layout/PageHero";
import ImageReveal from "../components/ImageReveal";
import { techSections } from "../data/technology";

gsap.registerPlugin(ScrollTrigger);

export default function TechnologyPage() {
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionsRef.current?.querySelectorAll(".tech-section").forEach((el) => {
        gsap.from(el.querySelectorAll(".tech-animate"), {
          y: 40,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <PageLayout>
      <PageHero
        tagline="Technology"
        title="Built on Innovation"
        subtitle="We leverage cutting-edge technology across every phase of design, construction, and project management to deliver superior outcomes."
      />

      <div ref={sectionsRef} className="space-y-0">
        {techSections.map((section, i) => (
          <section key={section.title} className="tech-section py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className={`grid items-center gap-10 md:gap-16 lg:grid-cols-2 lg:gap-24 ${i % 2 === 1 ? "lg:[direction:rtl] lg:[&>*]:[direction:ltr]" : ""}`}>
                <div>
                  <span className="tech-animate mb-2 inline-block text-xs tracking-[0.2em] text-brand-400 uppercase md:text-sm">
                    {section.tagline}
                  </span>
                  <h3 className="tech-animate font-display text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                    {section.title}
                  </h3>
                  <p className="tech-animate mt-4 text-sm font-light leading-relaxed text-dark-300 md:text-base">
                    {section.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {section.features.map((feature, j) => (
                      <li key={j} className="tech-animate flex items-start gap-3">
                        <div className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-500/10">
                          <div className="h-1 w-1 rounded-full bg-brand-500" />
                        </div>
                        <span className="text-sm font-light text-dark-200">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <ImageReveal className="tech-animate relative rounded-2xl">
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-dark-800">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </ImageReveal>
              </div>
            </div>
          </section>
        ))}
      </div>
    </PageLayout>
  );
}
