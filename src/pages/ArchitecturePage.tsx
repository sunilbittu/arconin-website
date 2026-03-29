import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageLayout from "../components/layout/PageLayout";
import PageHero from "../components/layout/PageHero";
import TabNav, { useActiveTab } from "../components/ui/TabNav";
import { architectureTabs } from "../data/architecture";

gsap.registerPlugin(ScrollTrigger);

const tabs = architectureTabs.map((t) => ({ key: t.key, label: t.label }));

export default function ArchitecturePage() {
  const activeTab = useActiveTab("residential");
  const contentRef = useRef<HTMLDivElement>(null);
  const tab = architectureTabs.find((t) => t.key === activeTab) || architectureTabs[0];

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
        tagline="Architecture"
        title="Designing Spaces That Define Living"
        subtitle="From concept to construction — our architectural solutions blend creative vision with engineering precision across residential, commercial, and industrial projects."
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
    </PageLayout>
  );
}
