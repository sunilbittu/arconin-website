import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/arconinglobal",
    path: "M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5 0-4.74.07-1.07.05-1.65.23-2.04.38-.51.2-.88.44-1.26.82a3.4 3.4 0 0 0-.82 1.26c-.15.39-.33.97-.38 2.04C2.7 9.81 2.7 10.17 2.7 12s0 2.19.07 3.43c.05 1.07.23 1.65.38 2.04.2.51.44.88.82 1.26.38.38.75.62 1.26.82.39.15.97.33 2.04.38 1.24.06 1.59.07 4.74.07s3.5 0 4.74-.07c1.07-.05 1.65-.23 2.04-.38.51-.2.88-.44 1.26-.82.38-.38.62-.75.82-1.26.15-.39.33-.97.38-2.04.06-1.24.07-1.59.07-3.43s0-2.19-.07-3.43c-.05-1.07-.23-1.65-.38-2.04-.2-.51-.44-.88-.82-1.26a3.4 3.4 0 0 0-1.26-.82c-.39-.15-.97-.33-2.04-.38C15.5 4 15.15 4 12 4zm0 3.06A4.94 4.94 0 1 1 12 17a4.94 4.94 0 0 1 0-9.94zm0 8.14a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4zm5.14-8.32a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/ArconinGlobal/",
    path: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/arconin-global/",
    path: "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z",
  },
  {
    label: "Pinterest",
    href: "https://in.pinterest.com/ArconinGlobal/",
    path: "M12 2a10 10 0 0 0-3.65 19.32c-.08-.81-.16-2.06.03-2.95.18-.8 1.16-5.08 1.16-5.08s-.3-.6-.3-1.48c0-1.39.8-2.42 1.81-2.42.85 0 1.27.64 1.27 1.41 0 .86-.55 2.14-.83 3.33-.24 1 .5 1.81 1.48 1.81 1.78 0 3.14-1.87 3.14-4.57 0-2.39-1.72-4.06-4.17-4.06-2.84 0-4.5 2.13-4.5 4.33 0 .86.33 1.78.74 2.28a.3.3 0 0 1 .07.28c-.08.32-.25 1-.28 1.13-.04.18-.15.23-.34.14-1.26-.59-2.04-2.42-2.04-3.9 0-3.18 2.31-6.1 6.67-6.1 3.5 0 6.22 2.49 6.22 5.83 0 3.48-2.2 6.28-5.24 6.28-1.03 0-1.99-.53-2.32-1.16l-.63 2.41c-.23.88-.85 1.99-1.27 2.66A10 10 0 1 0 12 2z",
  },
];

const footerLinks = {
  Company: [
    { label: "About Us", to: "/about" },
    { label: "Projects", to: "/projects" },
    { label: "Gallery", to: "/gallery" },
    { label: "Careers", to: "/careers" },
    { label: "Contact", to: "/contact" },
  ],
  Services: [
    { label: "Architecture", to: "/architecture" },
    { label: "Construction", to: "/construction" },
    { label: "Consulting", to: "/consulting" },
    { label: "Interiors", to: "/interiors" },
  ],
  Innovation: [
    { label: "Technology", to: "/technology" },
    { label: "Smart Interiors", to: "/innovation?tab=smart-interior" },
    { label: "Sustainability", to: "/innovation?tab=sustainable" },
    { label: "Digital Monitoring", to: "/innovation?tab=digital-monitoring" },
  ],
};

export default function Footer() {
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(brandRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: brandRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-dark-800 py-12 md:py-20">
      <div ref={brandRef} className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Navigation Columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-xs font-semibold tracking-wider text-white uppercase md:mb-6 md:text-sm">
                {title}
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-xs font-light text-dark-400 transition-colors hover:text-brand-400 md:text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Connect column */}
          <div>
            <h4 className="mb-4 text-xs font-semibold tracking-wider text-white uppercase md:mb-6 md:text-sm">
              Connect
            </h4>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <a
                  href="tel:+919398801130"
                  className="text-xs font-light text-dark-400 transition-colors hover:text-brand-400 md:text-sm"
                >
                  +91 93988 01130
                </a>
              </li>
              <li>
                <a
                  href="mailto:enquiry@arconin.com"
                  className="text-xs font-light text-dark-400 transition-colors hover:text-brand-400 md:text-sm"
                >
                  enquiry@arconin.com
                </a>
              </li>
              <li>
                <p className="text-xs font-light leading-relaxed text-dark-500 md:text-sm">
                  Banjara Hills, Hyderabad,<br />
                  Telangana - 500034
                </p>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-2 md:mt-6 md:gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-dark-700 text-dark-400 transition-colors hover:border-brand-500 hover:text-brand-400 md:h-10 md:w-10"
                >
                  <svg className="h-4 w-4 md:h-[18px] md:w-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Brand text */}
        <div className="mt-12 md:mt-16">
          <div className="text-stroke pointer-events-none select-none text-center font-display text-[12vw] font-bold leading-none md:text-[15vw]">
            ARCONIN
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-5 text-center md:mt-12 md:gap-6">
          <p className="max-w-md text-xs font-light text-dark-400 md:text-sm">
            Transforming visions into extraordinary spaces through innovative architecture,
            thoughtful design, and refined interiors.
          </p>

          <MagneticButton
            onClick={scrollToTop}
            className="mt-6 flex h-10 w-10 items-center justify-center rounded-full border border-dark-700 text-dark-400 transition-colors hover:border-brand-500 hover:text-brand-400 md:mt-8 md:h-12 md:w-12"
          >
            <svg className="h-3.5 w-3.5 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </MagneticButton>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 border-t border-dark-800 pt-6 md:mt-16 md:pt-8">
          <p className="text-[10px] text-dark-600 md:text-xs">
            Designed with passion for exceptional spaces.
          </p>
        </div>
      </div>
    </footer>
  );
}
