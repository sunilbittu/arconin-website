import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "The Glass Pavilion",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    year: "2024",
  },
  {
    title: "Horizon Tower",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    year: "2023",
  },
  {
    title: "Serene Living",
    category: "Interior",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
    year: "2024",
  },
  {
    title: "Urban Loft Studio",
    category: "Renovation",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    year: "2023",
  },
  {
    title: "Minimalist Villa",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
    year: "2025",
  },
  {
    title: "The Nexus Office",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    year: "2024",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return; // No horizontal scroll on mobile

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const totalScrollWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${totalScrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (counterRef.current) {
              const idx = Math.min(
                Math.floor(self.progress * projects.length) + 1,
                projects.length
              );
              counterRef.current.textContent = `${String(idx).padStart(2, "0")}`;
            }
          },
        },
      });

      // Parallax on each project image
      track.querySelectorAll(".project-img").forEach((img) => {
        gsap.fromTo(
          img,
          { x: "-10%" },
          {
            x: "10%",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${totalScrollWidth}`,
              scrub: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden">
      {/* Header */}
      <div className="absolute left-6 top-6 z-20 md:top-8 lg:left-12">
        <div className="mb-3 flex items-center gap-3 md:mb-4">
          <div className="h-px w-8 bg-brand-500 md:w-12" />
          <span className="text-xs tracking-[0.2em] text-brand-400 uppercase md:text-sm md:tracking-[0.3em]">Portfolio</span>
        </div>
        <h2 className="font-display text-2xl font-bold text-white md:text-3xl lg:text-4xl">
          Featured Projects
        </h2>
      </div>

      {/* Counter (desktop only) */}
      <div className="absolute right-6 top-6 z-20 hidden md:block md:top-8 lg:right-12">
        <div className="font-display text-sm tracking-wider text-dark-400">
          <span ref={counterRef} className="text-2xl font-bold text-white">01</span>
          <span className="mx-2">/</span>
          <span>{String(projects.length).padStart(2, "0")}</span>
        </div>
      </div>

      {/* Desktop: Horizontal scroll track */}
      <div
        ref={trackRef}
        className="hidden md:flex items-center gap-8 px-6 py-32 lg:gap-12 lg:px-12"
        style={{ width: "fit-content" }}
      >
        {/* Spacer for header */}
        <div className="w-[20vw] shrink-0" />

        {projects.map((project) => (
          <div
            key={project.title}
            className="group relative w-[60vw] shrink-0 lg:w-[50vw]"
            data-cursor="view"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-dark-800">
              <img
                src={project.image}
                alt={project.title}
                className="project-img h-full w-full scale-110 object-cover transition-transform duration-700 group-hover:scale-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-dark-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
                <p className="text-xs tracking-[0.3em] text-brand-400 uppercase">
                  {project.category} · {project.year}
                </p>
                <h3 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                  {project.title}
                </h3>
              </div>
            </div>
          </div>
        ))}

        <div className="w-[10vw] shrink-0" />
      </div>

      {/* Mobile: Vertical stacked layout */}
      <div ref={mobileRef} className="space-y-6 px-6 pb-16 pt-28 md:hidden">
        {projects.map((project) => (
          <div key={project.title} className="group relative" data-cursor="view">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-dark-800">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-dark-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[10px] tracking-[0.2em] text-brand-400 uppercase">
                  {project.category} · {project.year}
                </p>
                <h3 className="mt-1 font-display text-xl font-bold text-white">
                  {project.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
