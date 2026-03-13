import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, ArrowUpRight, Navigation, CheckCircle } from "lucide-react";
import SplitText from "./SplitText";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-animate", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload: Record<string, string> = {
      access_key: WEB3FORMS_KEY,
    };
    formData.forEach((value, key) => {
      if (key !== "botcheck") payload[key] = value as string;
    });

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("sent");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8" ref={ref}>
        <div className="grid gap-12 md:gap-16 lg:grid-cols-2">
          {/* Left - Info */}
          <div>
            <div className="contact-animate mb-4 flex items-center gap-3 md:mb-6">
              <div className="h-px w-8 bg-brand-500 md:w-12" />
              <span className="text-xs tracking-[0.2em] text-brand-400 uppercase md:text-sm md:tracking-[0.3em]">Contact</span>
            </div>

            <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              <SplitText type="words" stagger={0.04}>
                Let's Create Something Remarkable
              </SplitText>
            </h2>

            <p className="contact-animate mt-4 max-w-md text-sm font-light text-dark-400 md:mt-6 md:text-lg">
              Ready to transform your space? We'd love to hear about your project.
              Reach out and let's start a conversation.
            </p>

            <div className="mt-8 space-y-5 md:mt-12 md:space-y-6">
              <div className="contact-animate flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400 md:h-10 md:w-10">
                  <MapPin size={16} className="md:h-[18px] md:w-[18px]" />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest text-dark-500 uppercase md:text-xs">Address</p>
                  <p className="mt-1 text-xs leading-relaxed text-dark-200 md:text-sm">
                    H.No.8-2-268/D/5, Road No 3, Kundan Marble Lane,<br />
                    Sagar Society, Sri Nagar Colony,<br />
                    Aurora Colony, Banjara Hills,<br />
                    Hyderabad, Telangana - 500034
                  </p>
                </div>
              </div>

              <div className="contact-animate flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400 md:h-10 md:w-10">
                  <Navigation size={16} className="md:h-[18px] md:w-[18px]" />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest text-dark-500 uppercase md:text-xs">Location</p>
                  <a
                    href="https://maps.app.goo.gl/jshUGvwxp8LxKft6A?g_st=iwb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-brand-400 transition-colors hover:text-brand-300 md:text-sm"
                  >
                    View on Google Maps
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>

              <div className="contact-animate flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400 md:h-10 md:w-10">
                  <Phone size={16} className="md:h-[18px] md:w-[18px]" />
                </div>
                <div>
                  <p className="text-[10px] tracking-widest text-dark-500 uppercase md:text-xs">Phone</p>
                  <a href="tel:+918712175665" className="mt-1 text-xs text-dark-200 transition-colors hover:text-brand-400 md:text-sm">
                    +91 87121 75665
                  </a>
                  <p className="mt-0.5 text-[10px] text-dark-500 md:text-xs">Babu — Admin</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="contact-animate">
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              {/* Honeypot for spam */}
              <input type="checkbox" name="botcheck" className="hidden" />

              <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
                <div>
                  <label className="mb-2 block text-[10px] tracking-widest text-dark-500 uppercase md:mb-3 md:text-xs">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full border-0 border-b border-dark-700 bg-transparent px-0 py-2.5 text-sm text-white placeholder-dark-600 outline-none transition-colors focus:border-brand-500 md:py-3"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] tracking-widest text-dark-500 uppercase md:mb-3 md:text-xs">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    className="w-full border-0 border-b border-dark-700 bg-transparent px-0 py-2.5 text-sm text-white placeholder-dark-600 outline-none transition-colors focus:border-brand-500 md:py-3"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[10px] tracking-widest text-dark-500 uppercase md:mb-3 md:text-xs">
                  Project Type
                </label>
                <select
                  name="project_type"
                  className="w-full appearance-none border-0 border-b border-dark-700 bg-transparent px-0 py-2.5 text-sm text-dark-300 outline-none transition-colors focus:border-brand-500 md:py-3"
                >
                  <option className="bg-dark-900">Residential</option>
                  <option className="bg-dark-900">Commercial</option>
                  <option className="bg-dark-900">Interior Design</option>
                  <option className="bg-dark-900">Renovation</option>
                  <option className="bg-dark-900">Consultation</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-[10px] tracking-widest text-dark-500 uppercase md:mb-3 md:text-xs">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full resize-none border-0 border-b border-dark-700 bg-transparent px-0 py-2.5 text-sm text-white placeholder-dark-600 outline-none transition-colors focus:border-brand-500 md:py-3"
                />
              </div>

              {status === "sent" ? (
                <div className="flex items-center justify-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-8 py-3.5 md:py-4">
                  <CheckCircle size={16} className="text-green-400" />
                  <span className="text-xs font-medium text-green-400 md:text-sm">Message sent successfully!</span>
                </div>
              ) : status === "error" ? (
                <div className="flex items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 px-8 py-3.5 md:py-4">
                  <span className="text-xs font-medium text-red-400 md:text-sm">Something went wrong. Please try again.</span>
                </div>
              ) : (
                <MagneticButton
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-8 py-3.5 font-display text-xs font-semibold text-white transition-all hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/20 disabled:opacity-50 md:py-4 md:text-sm"
                >
                  {status === "sending" ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:h-4 md:w-4" />
                    </>
                  )}
                </MagneticButton>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
