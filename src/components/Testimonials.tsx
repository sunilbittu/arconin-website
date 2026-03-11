import { useEffect, useRef, useState } from "react";
import SplitText from "./SplitText";

const testimonials = [
  {
    quote: "Arconin transformed our outdated office into a space that genuinely inspires creativity. Every corner has purpose and beauty.",
    name: "Priya Sharma",
    role: "CEO, Lumina Technologies",
  },
  {
    quote: "The attention to detail is extraordinary. They didn't just design our home — they understood how we live and crafted it around us.",
    name: "Rajesh & Anita Mehta",
    role: "Homeowners, Mumbai",
  },
  {
    quote: "Working with Arconin felt like collaborating with artists who happen to be brilliant engineers. The result exceeded our wildest expectations.",
    name: "Vikram Desai",
    role: "Director, Zenith Hospitality",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    const DURATION = 6000;
    const TICK = 50;
    let elapsed = 0;

    intervalRef.current = setInterval(() => {
      elapsed += TICK;
      setProgress((elapsed / DURATION) * 100);

      if (elapsed >= DURATION) {
        elapsed = 0;
        setActive((prev) => (prev + 1) % testimonials.length);
      }
    }, TICK);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active]);

  const t = testimonials[active];

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Giant decorative quote marks */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-serif text-[40vw] leading-none text-dark-900/30 md:text-[30vw] md:text-dark-900/50">
        &ldquo;
      </div>

      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-16">
          <div className="mb-4 flex items-center justify-center gap-3 md:mb-6">
            <div className="h-px w-8 bg-brand-500 md:w-12" />
            <span className="text-xs tracking-[0.2em] text-brand-400 uppercase md:text-sm md:tracking-[0.3em]">Testimonials</span>
            <div className="h-px w-8 bg-brand-500 md:w-12" />
          </div>
        </div>

        {/* Quote */}
        <div className="relative text-center" style={{ minHeight: "200px" }}>
          <div key={active}>
            <p className="font-serif text-xl font-light italic leading-relaxed text-dark-100 md:text-3xl lg:text-4xl xl:text-5xl">
              <SplitText type="words" stagger={0.02} duration={0.6}>
                {t.quote}
              </SplitText>
            </p>
          </div>

          <div className="mt-8 md:mt-10">
            <p className="font-display text-xs font-semibold tracking-wider text-white uppercase md:text-sm">
              {t.name}
            </p>
            <p className="mt-1 text-[11px] text-dark-500 md:text-xs">{t.role}</p>
          </div>
        </div>

        {/* Progress indicators */}
        <div className="mt-10 flex items-center justify-center gap-3 md:mt-16 md:gap-4">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setActive(i);
                setProgress(0);
              }}
              className="relative h-[2px] w-8 overflow-hidden bg-dark-700 md:w-12"
            >
              <div
                className="absolute inset-y-0 left-0 bg-brand-500 transition-none"
                style={{
                  width: i === active ? `${progress}%` : i < active ? "100%" : "0%",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
