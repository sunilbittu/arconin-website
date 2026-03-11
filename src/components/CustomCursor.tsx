import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const text = textRef.current;
    if (!dot || !ring || !text) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.3, ease: "power2.out" });
    };

    const onEnterLink = () => {
      gsap.to(ring, { scale: 1.8, borderColor: "rgba(184, 147, 95, 0.6)", duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.3 });
    };

    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, borderColor: "rgba(184, 147, 95, 0.3)", duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
      gsap.to(text, { opacity: 0, duration: 0.2 });
    };

    const onEnterProject = () => {
      gsap.to(ring, { scale: 2.5, backgroundColor: "rgba(184, 147, 95, 0.1)", duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.3 });
      gsap.to(text, { opacity: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", moveCursor);

    const links = document.querySelectorAll("a, button");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    const projectImages = document.querySelectorAll("[data-cursor='view']");
    projectImages.forEach((el) => {
      el.addEventListener("mouseenter", onEnterProject);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    // Re-bind on DOM changes
    const observer = new MutationObserver(() => {
      const newLinks = document.querySelectorAll("a, button");
      newLinks.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
        el.addEventListener("mouseenter", onEnterLink);
        el.addEventListener("mouseleave", onLeaveLink);
      });
      const newProjects = document.querySelectorAll("[data-cursor='view']");
      newProjects.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterProject);
        el.removeEventListener("mouseleave", onLeaveLink);
        el.addEventListener("mouseenter", onEnterProject);
        el.addEventListener("mouseleave", onLeaveLink);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
    };
  }, []);

  // Hide on touch devices
  const isTouchDevice = typeof window !== "undefined" && "ontouchstart" in window;
  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#b8935f",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden items-center justify-center md:flex"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1px solid rgba(184, 147, 95, 0.3)",
          transform: "translate(-50%, -50%)",
        }}
      >
        <span
          ref={textRef}
          className="text-[10px] font-medium tracking-wider text-brand-400 uppercase opacity-0"
        >
          View
        </span>
      </div>
    </>
  );
}
