import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: "button" | "a" | "link";
  href?: string;
  to?: string;
  onClick?: () => void;
  strength?: number;
  type?: "button" | "submit";
}

export default function MagneticButton({
  children,
  className = "",
  as: Tag = "button",
  href,
  to,
  onClick,
  strength = 0.3,
  type,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  };

  const commonProps = {
    ref: ref as any,
    className,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
  };

  if (Tag === "link" && to) {
    return (
      <Link {...commonProps} to={to}>
        {children}
      </Link>
    );
  }

  if (Tag === "a") {
    return (
      <a {...commonProps} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button {...commonProps} type={type}>
      {children}
    </button>
  );
}
