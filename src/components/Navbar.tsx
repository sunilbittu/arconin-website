import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";
import { navItems, type NavItem } from "../data/navigation";

gsap.registerPlugin(ScrollTrigger);

interface NavbarProps {
  loaded: boolean;
}

const desktopItems = navItems.filter((item) =>
  ["About", "Architecture", "Construction", "Consulting", "Interiors", "Innovation", "Projects"].includes(item.label)
);

const mobileItems = navItems;

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isActive = pathname === item.to || pathname.startsWith(item.to + "?");

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        to={item.to}
        className={`group flex items-center gap-1.5 text-sm font-light tracking-widest uppercase transition-colors ${
          isActive ? "text-brand-400" : "text-dark-300 hover:text-white"
        }`}
      >
        {item.label}
        {item.children && <ChevronDown size={12} className="text-dark-500" />}
      </Link>

      <AnimatePresence>
        {open && item.children && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full z-50 mt-3 min-w-[200px] rounded-xl border border-dark-700/50 bg-dark-900/95 p-2 backdrop-blur-xl"
          >
            {item.children.map((child) => (
              <Link
                key={child.label}
                to={child.to}
                className="block rounded-lg px-3 py-2 text-xs font-light tracking-wider text-dark-300 transition-colors hover:bg-dark-800 hover:text-brand-400"
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar({ loaded }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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
          scrolled ? "glass py-3" : "bg-transparent py-5"
        }`}
        style={{ opacity: loaded ? undefined : 0 }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="Arconin" className="h-8 w-8 md:h-9 md:w-9" />
            <span className="font-display text-xl font-bold tracking-tight text-white md:text-2xl">ARCONIN</span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            {desktopItems.map((item) => (
              <DesktopDropdown key={item.label} item={item} />
            ))}
          </div>

          <MagneticButton
            as="link"
            to="/contact"
            className="hidden rounded-full border border-brand-500/40 bg-brand-500/10 px-6 py-2.5 text-sm font-medium text-brand-300 transition-all hover:border-brand-500 hover:bg-brand-500/20 lg:inline-block"
          >
            Get in Touch
          </MagneticButton>

          <button
            onClick={() => setMobileOpen(true)}
            className="text-white lg:hidden"
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
            className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-dark-950/98 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <Link to="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
                <img src="/logo.svg" alt="Arconin" className="h-8 w-8" />
                <span className="font-display text-2xl font-bold text-white">ARCONIN</span>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="text-white">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-1 px-6 py-4">
              {mobileItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i }}
                >
                  {item.children ? (
                    <div>
                      <button
                        onClick={() =>
                          setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                        }
                        className="flex w-full items-center justify-between py-3 font-display text-2xl font-light text-dark-200 transition-colors hover:text-brand-400"
                      >
                        <Link to={item.to} onClick={() => setMobileOpen(false)}>
                          {item.label}
                        </Link>
                        <ChevronDown
                          size={18}
                          className={`text-dark-500 transition-transform ${
                            mobileExpanded === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{
                          maxHeight: mobileExpanded === item.label ? "300px" : "0",
                          opacity: mobileExpanded === item.label ? 1 : 0,
                        }}
                      >
                        <div className="space-y-1 pb-3 pl-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.to}
                              onClick={() => setMobileOpen(false)}
                              className="block py-2 text-sm font-light text-dark-400 transition-colors hover:text-brand-400"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 font-display text-2xl font-light text-dark-200 transition-colors hover:text-brand-400"
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
