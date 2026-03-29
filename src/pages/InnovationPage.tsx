import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageLayout from "../components/layout/PageLayout";
import PageHero from "../components/layout/PageHero";
import TabNav, { useActiveTab } from "../components/ui/TabNav";
import { innovationTabs } from "../data/innovation";

gsap.registerPlugin(ScrollTrigger);

const tabs = innovationTabs.map((t) => ({ key: t.key, label: t.label }));

export default function InnovationPage() {
  const activeTab = useActiveTab("smart-interior");
  const contentRef = useRef<HTMLDivElement>(null);
  const tab = innovationTabs.find((t) => t.key === activeTab) || innovationTabs[0];

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
        tagline="Innovation"
        title="Technology-Driven Building Solutions"
        subtitle="Smart systems, digital tools, and sustainable innovations that redefine how spaces are designed, built, and experienced."
      />
      <TabNav tabs={tabs} />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8" ref={contentRef} key={activeTab}>
          <p className="tab-animate max-w-3xl text-base font-light leading-relaxed text-dark-300 md:text-lg">
            {tab.overview}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-14 md:gap-6">
            {tab.features.map((feature, i) => (
              <div
                key={i}
                className="tab-animate group rounded-2xl border border-dark-700/50 bg-dark-900/30 p-5 transition-all duration-500 hover:border-brand-500/30 hover:bg-dark-800/50 md:p-6"
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 font-display text-xs font-bold text-brand-400">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-sm font-medium text-white md:text-base">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
