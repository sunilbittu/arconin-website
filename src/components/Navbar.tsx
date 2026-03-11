import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { num: "01", label: "About", href: "#about" },
  { num: "02", label: "Services", href: "#services" },
  { num: "03", label: "Projects", href: "#projects" },
  { num: "04", label: "Process", href: "#process" },
  { num: "05", label: "Contact", href: "#contact" },
];

interface NavbarProps {
  loaded: boolean;
}

export default function Navbar({ loaded }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  // Entrance animation gated by preloader
  useEffect(() => {
    if (!loaded || !navRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        delay: 0.2,
      });
    });
    return () => ctx.revert();
  }, [loaded]);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-brand-500"
        style={{ transform: "scaleX(0)" }}
      />

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass py-4" : "bg-transparent py-6"
        }`}
        style={{ opacity: loaded ? undefined : 0 }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          <a href="#" className="font-display text-2xl font-bold tracking-tight text-white">
            ARCONIN
          </a>

          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="line-reveal group flex items-center gap-2 text-sm font-light tracking-widest text-dark-300 uppercase transition-colors hover:text-white"
              >
                <span className="text-[10px] text-brand-500/60 transition-colors group-hover:text-brand-400">
                  {link.num}
                </span>
                {link.label}
              </a>
            ))}
          </div>

          <MagneticButton
            as="a"
            href="#contact"
            className="hidden rounded-full border border-brand-500/40 bg-brand-500/10 px-6 py-2.5 text-sm font-medium text-brand-300 transition-all hover:border-brand-500 hover:bg-brand-500/20 md:inline-block"
          >
            Get in Touch
          </MagneticButton>

          <button
            onClick={() => setMobileOpen(true)}
            className="text-white md:hidden"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col bg-dark-950/98 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-display text-2xl font-bold text-white">ARCONIN</span>
              <button onClick={() => setMobileOpen(false)} className="text-white">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-4 font-display text-4xl font-light text-dark-200 transition-colors hover:text-brand-400"
                >
                  <span className="text-sm text-brand-500/50">{link.num}</span>
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
