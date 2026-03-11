import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";
import SplitText from "./SplitText";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);

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
              {[
                { icon: MapPin, label: "Studio", value: "42 Design Quarter, Bandra West, Mumbai 400050" },
                { icon: Mail, label: "Email", value: "hello@arconin.com" },
                { icon: Phone, label: "Phone", value: "+91 22 4200 8888" },
              ].map((item) => (
                <div key={item.label} className="contact-animate flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400 md:h-10 md:w-10">
                    <item.icon size={16} className="md:h-[18px] md:w-[18px]" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest text-dark-500 uppercase md:text-xs">{item.label}</p>
                    <p className="mt-1 text-xs text-dark-200 md:text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className="contact-animate">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6 md:space-y-8">
              <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
                <div>
                  <label className="mb-2 block text-[10px] tracking-widest text-dark-500 uppercase md:mb-3 md:text-xs">
                    Name
                  </label>
                  <input
                    type="text"
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
                    placeholder="you@example.com"
                    className="w-full border-0 border-b border-dark-700 bg-transparent px-0 py-2.5 text-sm text-white placeholder-dark-600 outline-none transition-colors focus:border-brand-500 md:py-3"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-[10px] tracking-widest text-dark-500 uppercase md:mb-3 md:text-xs">
                  Project Type
                </label>
                <select className="w-full appearance-none border-0 border-b border-dark-700 bg-transparent px-0 py-2.5 text-sm text-dark-300 outline-none transition-colors focus:border-brand-500 md:py-3">
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
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full resize-none border-0 border-b border-dark-700 bg-transparent px-0 py-2.5 text-sm text-white placeholder-dark-600 outline-none transition-colors focus:border-brand-500 md:py-3"
                />
              </div>

              <MagneticButton
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-8 py-3.5 font-display text-xs font-semibold text-white transition-all hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/20 md:py-4 md:text-sm"
              >
                Send Message
                <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:h-4 md:w-4" />
              </MagneticButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
