import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageLayout from "../components/layout/PageLayout";
import PageHero from "../components/layout/PageHero";
import MagneticButton from "../components/MagneticButton";
import { consultingSections } from "../data/consulting";

gsap.registerPlugin(ScrollTrigger);

export default function ConsultingPage() {
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionsRef.current?.querySelectorAll(".consult-section").forEach((el) => {
        gsap.from(el.querySelectorAll(".consult-animate"), {
          y: 40,
          opacity: 0,
          stagger: 0.1,
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
        tagline="Consultancy"
        title="Design & Engineering Consultancy"
        subtitle="Expert advisory services across architecture, interiors, engineering, and project management — helping you make informed decisions at every stage."
      />

      <div ref={sectionsRef} className="space-y-0">
        {consultingSections.map((section, i) => (
          <section key={section.title} className="consult-section py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className={`grid items-start gap-10 md:gap-16 lg:grid-cols-2 lg:gap-24 ${i % 2 === 1 ? "lg:[direction:rtl] lg:[&>*]:[direction:ltr]" : ""}`}>
                <div>
                  <span className="consult-animate font-display text-5xl font-bold text-dark-800 md:text-6xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="consult-animate mt-4 font-display text-2xl font-bold text-white md:text-3xl">
                    {section.title}
                  </h3>
                  <p className="consult-animate mt-3 text-sm font-light leading-relaxed text-dark-300 md:mt-4 md:text-base">
                    {section.description}
                  </p>
                </div>

                <div className="space-y-3">
                  {section.points.map((point, j) => (
                    <div
                      key={j}
                      className="consult-animate flex items-start gap-4 rounded-xl border border-dark-700/50 bg-dark-900/30 p-4 md:p-5"
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
        ))}
      </div>

      {/* Bottom CTA */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
            Ready to Get Expert Guidance?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm font-light text-dark-400 md:mt-6 md:text-base">
            Whether you're planning a new project or need a second opinion on an existing design, our consultancy team is here to help.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-12">
            <MagneticButton
              as="link"
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-brand-500 px-8 py-3 font-display text-xs font-medium tracking-wider text-white uppercase transition-all hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/20 md:px-10 md:py-4 md:text-sm"
            >
              Book a Consultation
            </MagneticButton>
            <MagneticButton
              as="link"
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full border border-brand-500/40 bg-brand-500/10 px-8 py-3 font-display text-xs font-medium tracking-wider text-brand-300 uppercase transition-all hover:border-brand-500 hover:bg-brand-500/20 md:px-10 md:py-4 md:text-sm"
            >
              Visit Our Office
            </MagneticButton>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
