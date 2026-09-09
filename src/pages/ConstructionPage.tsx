import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone } from "lucide-react";
import PageLayout from "../components/layout/PageLayout";
import PageHero from "../components/layout/PageHero";
import TabNav, { useActiveTab } from "../components/ui/TabNav";
import MagneticButton from "../components/MagneticButton";
import { constructionTabs } from "../data/construction";

gsap.registerPlugin(ScrollTrigger);

const tabs = constructionTabs.map((t) => ({ key: t.key, label: t.label }));

export default function ConstructionPage() {
  const activeTab = useActiveTab("residential");
  const contentRef = useRef<HTMLDivElement>(null);
  const tab = constructionTabs.find((t) => t.key === activeTab) || constructionTabs[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current?.querySelectorAll(".tab-animate") ?? [], {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, [activeTab]);

  return (
    <PageLayout>
      <PageHero
        tagline="Construction"
        title="Building With Engineering Precision"
        subtitle="Technology-backed construction management that delivers quality, transparency, and timely completion across all project types."
      />
      <TabNav tabs={tabs} />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8" ref={contentRef} key={activeTab}>
          <p className="tab-animate max-w-3xl text-base font-light leading-relaxed text-dark-300 md:text-lg">
            {tab.overview}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-14 md:gap-6">
            {tab.services.map((service, i) => (
              <div
                key={i}
                className="tab-animate group rounded-2xl border border-dark-700/50 bg-dark-900/30 p-5 transition-all duration-500 hover:border-brand-500/30 hover:bg-dark-800/50 md:p-6"
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 font-display text-xs font-bold text-brand-400">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-sm font-medium text-white md:text-base">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-dark-800/50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dark-700/50 bg-dark-900/30 px-6 py-10 text-center md:gap-6 md:py-14">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
              <Phone size={20} />
            </div>
            <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
              Book a Construction Consultation
            </h3>
            <p className="max-w-md text-sm font-light text-dark-400 md:text-base">
              Speak directly with our construction team about your project.
            </p>
            <MagneticButton
              as="a"
              href="tel:+919063888138"
              className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-8 py-3.5 font-display text-xs font-semibold text-white transition-all hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/20 md:py-4 md:text-sm"
            >
              +91 90638 88138
            </MagneticButton>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
