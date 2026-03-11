import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "./SplitText";
import ImageReveal from "./ImageReveal";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current?.querySelectorAll(".about-animate") ?? [], {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(".about-deco-num", {
        opacity: 0,
        y: 60,
        duration: 1.2,
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
    <section id="about" className="relative overflow-hidden py-20 md:py-32">
      {/* Decorative large number */}
      <div className="about-deco-num pointer-events-none absolute -left-4 top-16 select-none font-display text-[20vw] font-bold leading-none text-dark-900 md:-left-8 md:top-20 md:text-[25vw]">
        01
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8" ref={ref}>
        <div className="grid items-center gap-10 md:gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Image side with reveal */}
          <ImageReveal className="relative rounded-2xl">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-dark-800">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                alt="Modern architectural design"
                className="h-full w-full object-cover"
              />
            </div>
          </ImageReveal>

          {/* Text side */}
          <div ref={textRef}>
            <div className="about-animate mb-4 flex items-center gap-3 md:mb-6">
              <div className="h-px w-8 bg-brand-500 md:w-12" />
              <span className="text-xs tracking-[0.2em] text-brand-400 uppercase md:text-sm md:tracking-[0.3em]">About Us</span>
            </div>

            <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
              <SplitText type="words" stagger={0.04} duration={0.8}>
                Where Vision Meets Precision
              </SplitText>
            </h2>

            <p className="about-animate mt-4 text-base font-light leading-relaxed text-dark-300 md:mt-6 md:text-lg">
              Arconin is a multidisciplinary design studio specializing in architecture,
              interior design, and spatial solutions. We believe every space tells a story —
              and we're here to make it extraordinary.
            </p>

            <p className="about-animate mt-3 text-base font-light leading-relaxed text-dark-400 md:mt-4 md:text-lg">
              From residential sanctuaries to commercial landmarks, our approach blends
              aesthetic sensibility with technical excellence, creating environments that
              are both functional and deeply inspiring.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 md:mt-10 md:gap-6">
              {[
                { label: "Sustainable Design", desc: "Eco-conscious solutions" },
                { label: "Client-Centric", desc: "Your vision, our expertise" },
                { label: "Innovation-Driven", desc: "Cutting-edge techniques" },
                { label: "Detail-Obsessed", desc: "Perfection in every pixel" },
              ].map((item) => (
                <div key={item.label} className="about-animate group">
                  <h4 className="text-xs font-semibold text-white transition-colors group-hover:text-brand-400 md:text-sm">
                    {item.label}
                  </h4>
                  <p className="mt-1 text-[11px] text-dark-500 md:text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
