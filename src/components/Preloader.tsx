import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const lettersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      // Counter 0 → 100
      tl.to(
        { val: 0 },
        {
          val: 100,
          duration: 2,
          ease: "power2.inOut",
          onUpdate: function () {
            if (counterRef.current) {
              counterRef.current.textContent = `${Math.round(this.targets()[0].val)}`;
            }
          },
        },
        0
      );

      // Letter stagger
      const letters = lettersRef.current?.querySelectorAll(".preloader-letter");
      if (letters) {
        tl.from(
          letters,
          {
            y: 80,
            opacity: 0,
            rotateX: -90,
            stagger: 0.05,
            duration: 0.8,
            ease: "power4.out",
          },
          0.3
        );
      }

      // Slide up reveal
      tl.to(
        containerRef.current,
        {
          clipPath: "inset(0 0 100% 0)",
          duration: 1,
          ease: "power4.inOut",
        },
        2.5
      );
    });

    return () => ctx.revert();
  }, [onComplete]);

  const letters = "ARCONIN".split("");

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-dark-950"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      <img src="/logo.svg" alt="" className="mb-6 h-16 w-16 md:h-20 md:w-20" />
      <div
        ref={lettersRef}
        className="flex items-center gap-1 overflow-hidden font-serif text-5xl font-light tracking-[0.2em] text-white md:text-8xl"
      >
        {letters.map((letter, i) => (
          <span
            key={i}
            className="preloader-letter inline-block"
            style={{ transformOrigin: "bottom center" }}
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-4">
        <div className="h-px w-12 bg-brand-500/50" />
        <span
          ref={counterRef}
          className="font-display text-sm tracking-[0.3em] text-brand-400"
        >
          0
        </span>
        <div className="h-px w-12 bg-brand-500/50" />
      </div>
    </div>
  );
}
