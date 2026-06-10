import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageLayout from "../components/layout/PageLayout";
import PageHero from "../components/layout/PageHero";
import ImageReveal from "../components/ImageReveal";
import { projects, projectCategories, portfolioStats } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".project-card");
      if (cards) {
        gsap.set(cards, { y: 40, opacity: 0 });
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
        });
      }
    });
    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <PageLayout>
      <PageHero
        tagline="Portfolio"
        title="Our Projects"
        subtitle="A showcase of residential, commercial, interior, and construction projects delivered with engineering precision and design excellence."
      />

      {/* Portfolio stat strip */}
      <div className="mx-auto max-w-7xl px-6 pb-12 lg:px-8 md:pb-16">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-dark-700/50 bg-dark-700/50 sm:grid-cols-2">
          {portfolioStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-2 bg-dark-900/40 p-6 md:p-8"
            >
              <p className="font-display text-4xl font-bold text-brand-400 md:text-5xl">
                {stat.value}
              </p>
              <p className="text-sm font-medium tracking-wide text-white md:text-base">
                {stat.label}
              </p>
              {stat.detail && (
                <p className="text-xs font-light text-dark-400 md:text-sm">
                  {stat.detail}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Filter bar */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex gap-1 overflow-x-auto border-b border-dark-700/50 pb-px scrollbar-hide">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative whitespace-nowrap px-4 py-3 text-xs font-medium tracking-wider uppercase transition-colors md:px-6 md:py-4 md:text-sm ${
                activeCategory === cat
                  ? "text-brand-400"
                  : "text-dark-500 hover:text-dark-300"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <div className="absolute inset-x-0 -bottom-px h-[2px] bg-brand-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8" ref={gridRef} key={activeCategory}>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {filtered.map((project) => (
              <div
                key={project.title}
                className="project-card group rounded-2xl border border-dark-700/50 bg-dark-900/30 overflow-hidden transition-all duration-500 hover:border-brand-500/30"
                data-cursor="view"
              >
                <ImageReveal className="relative">
                  <div className="aspect-[4/3] overflow-hidden bg-dark-800">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </ImageReveal>
                <div className="p-5 md:p-6">
                  <p className="text-[10px] tracking-[0.2em] text-brand-400 uppercase md:text-xs">
                    {project.category}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold text-white md:text-xl">
                    {project.title}
                  </h3>
                  <div className="mt-3 space-y-1">
                    <p className="text-xs font-light text-dark-400">
                      <span className="text-dark-500">Location:</span> {project.location}
                    </p>
                    <p className="text-xs font-light text-dark-400">
                      <span className="text-dark-500">Scope:</span> {project.scope}
                    </p>
                    <p className="text-xs font-light text-dark-400">
                      <span className="text-dark-500">Area:</span> {project.area}
                    </p>
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
