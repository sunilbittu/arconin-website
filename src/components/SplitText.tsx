import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  type?: "chars" | "words";
  stagger?: number;
  duration?: number;
  delay?: number;
  y?: number;
  once?: boolean;
}

export default function SplitText({
  children,
  className = "",
  as: Tag = "span",
  type = "words",
  stagger = 0.03,
  duration = 0.8,
  delay = 0,
  y = 100,
  once = true,
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const spans = el.querySelectorAll(".split-item");

    const ctx = gsap.context(() => {
      gsap.from(spans, {
        yPercent: y,
        opacity: 0,
        rotateX: -40,
        stagger,
        duration,
        delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: once ? "play none none none" : "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, [children, type, stagger, duration, delay, y, once]);

  const items = type === "chars" ? children.split("") : children.split(" ");

  return (
    <Tag ref={containerRef as any} className={className} style={{ perspective: "800px" }}>
      {items.map((item, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span
            className={`split-item inline-block ${className}`}
            style={{ transformOrigin: "bottom center" }}
          >
            {item === " " ? "\u00A0" : item}
            {type === "words" && i < items.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
