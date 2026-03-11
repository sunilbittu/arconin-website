import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    title: "Architecture",
    desc: "Visionary architectural design that balances form, function, and sustainability — from concept sketches to construction oversight.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
  },
  {
    num: "02",
    title: "Interior Design",
    desc: "Curated interior spaces that reflect personality and purpose, with meticulous attention to materials, colors, and textures.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80",
  },
  {
    num: "03",
    title: "Furniture Design",
    desc: "Custom furniture pieces crafted to complement your space — unique, functional, and designed to last generations.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
  },
  {
    num: "04",
    title: "Space Planning",
    desc: "Strategic spatial layouts that optimize flow, maximize utility, and create harmonious living and working environments.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
  },
  {
    num: "05",
    title: "Lighting Design",
    desc: "Atmospheric lighting solutions that sculpt space, enhance mood, and bring architecture to life after dark.",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&q=80",
  },
  {
    num: "06",
    title: "3D Visualization",
    desc: "Photorealistic 3D renders and walkthroughs that bring your project to life before a single brick is laid.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-row", {
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
    <section id="services" className="relative py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8" ref={ref}>
        <div className="mb-12 max-w-2xl md:mb-20">
          <div className="mb-4 flex items-center gap-3 md:mb-6">
            <div className="h-px w-8 bg-brand-500 md:w-12" />
            <span className="text-xs tracking-[0.2em] text-brand-400 uppercase md:text-sm md:tracking-[0.3em]">Services</span>
          </div>
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            <SplitText type="words" stagger={0.04}>
              Comprehensive Design Solutions
            </SplitText>
          </h2>
        </div>

        <div className="border-t border-dark-700/50">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="service-row group border-b border-dark-700/50"
              style={{ clipPath: "inset(0 0 0 0)" }}
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-2 py-5 text-left transition-colors hover:bg-dark-900/30 md:py-8"
              >
                <div className="flex items-center gap-4 md:gap-8 lg:gap-16">
                  <span className="text-xs text-brand-500/50 font-display md:text-sm">{service.num}</span>
                  <h3 className="font-display text-lg font-semibold text-white transition-colors group-hover:text-brand-400 md:text-2xl lg:text-3xl xl:text-4xl">
                    {service.title}
                  </h3>
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                  <p className="hidden max-w-xs text-sm font-light text-dark-400 lg:block">
                    {service.desc}
                  </p>
                  <span
                    className={`text-xl text-dark-500 transition-transform duration-300 md:text-2xl ${
                      expandedIndex === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </div>
              </button>

              {/* Expanded content */}
              <div
                className="overflow-hidden transition-all duration-500"
                style={{
                  maxHeight: expandedIndex === i ? "400px" : "0",
                  opacity: expandedIndex === i ? 1 : 0,
                }}
              >
                <div className="flex flex-col gap-6 px-2 pb-6 md:flex-row md:gap-8 md:pl-20 md:pr-8 md:pb-8 lg:pl-28">
                  <p className="text-sm font-light leading-relaxed text-dark-300 lg:hidden">
                    {service.desc}
                  </p>
                  <div className="aspect-video w-full overflow-hidden rounded-xl md:w-64 lg:w-80">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
