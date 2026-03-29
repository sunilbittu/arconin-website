import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Mail, ArrowUpRight, Navigation, CheckCircle } from "lucide-react";
import PageLayout from "../components/layout/PageLayout";
import PageHero from "../components/layout/PageHero";
import MagneticButton from "../components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

// Cascading dropdown structure
const projectTypes: Record<string, Record<string, string[]>> = {
  Architecture: {
    Residential: ["Individual Villa", "Apartment Complex", "Farmhouse", "Duplex / Row House"],
    Commercial: ["Office Building", "Retail Space", "Hotel / Hospitality", "Healthcare Facility"],
    Industrial: ["Factory / Manufacturing", "Warehouse", "Industrial Park"],
  },
  Construction: {
    Residential: ["Home Construction", "Villa Construction", "Multi-Story Complex"],
    Commercial: ["Office Construction", "Retail Construction", "Hotel Construction"],
    "Design-Build": ["Concept-to-Completion", "Value Engineering", "Fast-Track Project"],
    Renovation: ["Residential Renovation", "Commercial Renovation", "Heritage Restoration"],
  },
  "Interior Design": {
    Residential: ["Living Room", "Kitchen & Dining", "Bedroom", "Full Home Interior"],
    Commercial: ["Corporate Office", "Retail Store", "Restaurant / Cafe"],
    "Home Upgrades": ["Kitchen Makeover", "Bathroom Refresh", "Smart Home Integration"],
  },
  Consultancy: {
    "Design Consultancy": ["Architectural Consultancy", "Interior Consultancy", "Engineering Consultancy"],
    "Project Management": ["Project Planning", "Design Review", "Turnkey Advisory"],
  },
};

export default function ContactPage() {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [serviceType, setServiceType] = useState("");

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

  const subCategories = category ? Object.keys(projectTypes[category] || {}) : [];
  const serviceTypes = category && subCategory ? projectTypes[category]?.[subCategory] || [] : [];

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

    // Add cascading selections
    if (category) payload.project_category = category;
    if (subCategory) payload.project_subcategory = subCategory;
    if (serviceType) payload.service_type = serviceType;

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
        setCategory("");
        setSubCategory("");
        setServiceType("");
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

  const selectClass = "w-full appearance-none border-0 border-b border-dark-700 bg-transparent px-0 py-2.5 text-sm text-dark-300 outline-none transition-colors focus:border-brand-500 md:py-3";
  const inputClass = "w-full border-0 border-b border-dark-700 bg-transparent px-0 py-2.5 text-sm text-white placeholder-dark-600 outline-none transition-colors focus:border-brand-500 md:py-3";

  return (
    <PageLayout>
      <PageHero
        tagline="Contact"
        title="Let's Create Something Remarkable"
        subtitle="Ready to transform your space? Reach out and let's start a conversation about your project."
      />

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8" ref={ref}>
          <div className="grid gap-12 md:gap-16 lg:grid-cols-2">
            {/* Left - Info */}
            <div>
              <div className="space-y-5 md:space-y-6">
                <div className="contact-animate flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400 md:h-10 md:w-10">
                    <MapPin size={16} className="md:h-[18px] md:w-[18px]" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest text-dark-500 uppercase md:text-xs">Address</p>
                    <p className="mt-1 text-xs leading-relaxed text-dark-200 md:text-sm">
                      H.No.8-2-268/D/5, Krishna Kutir,<br />
                      Road No 3, Kundan Marble Lane,<br />
                      Sagar Society, Sri Nagar Colony,<br />
                      Banjara Hills, Hyderabad,<br />
                      Telangana - 500034
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
                    <a href="tel:+919398801130" className="mt-1 text-xs text-dark-200 transition-colors hover:text-brand-400 md:text-sm">
                      +91 93988 01130
                    </a>
                  </div>
                </div>

                <div className="contact-animate flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400 md:h-10 md:w-10">
                    <Mail size={16} className="md:h-[18px] md:w-[18px]" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest text-dark-500 uppercase md:text-xs">Email</p>
                    <a href="mailto:enquiry@arconin.com" className="mt-1 text-xs text-dark-200 transition-colors hover:text-brand-400 md:text-sm">
                      enquiry@arconin.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div className="contact-animate">
              <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                <input type="checkbox" name="botcheck" className="hidden" />

                <div className="grid gap-6 sm:grid-cols-2 md:gap-8">
                  <div>
                    <label className="mb-2 block text-[10px] tracking-widest text-dark-500 uppercase md:mb-3 md:text-xs">Name</label>
                    <input type="text" name="name" required placeholder="Your name" className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] tracking-widest text-dark-500 uppercase md:mb-3 md:text-xs">Phone</label>
                    <input type="tel" name="phone" required placeholder="Your phone number" className={inputClass} />
                  </div>
                </div>

                {/* Cascading Project Type */}
                <div>
                  <label className="mb-2 block text-[10px] tracking-widest text-dark-500 uppercase md:mb-3 md:text-xs">Project Category</label>
                  <select
                    name="project_category"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setSubCategory("");
                      setServiceType("");
                    }}
                    className={selectClass}
                  >
                    <option value="" className="bg-dark-900">Select category</option>
                    {Object.keys(projectTypes).map((cat) => (
                      <option key={cat} value={cat} className="bg-dark-900">{cat}</option>
                    ))}
                  </select>
                </div>

                {subCategories.length > 0 && (
                  <div>
                    <label className="mb-2 block text-[10px] tracking-widest text-dark-500 uppercase md:mb-3 md:text-xs">Sub-Category</label>
                    <select
                      name="project_subcategory"
                      value={subCategory}
                      onChange={(e) => {
                        setSubCategory(e.target.value);
                        setServiceType("");
                      }}
                      className={selectClass}
                    >
                      <option value="" className="bg-dark-900">Select sub-category</option>
                      {subCategories.map((sub) => (
                        <option key={sub} value={sub} className="bg-dark-900">{sub}</option>
                      ))}
                    </select>
                  </div>
                )}

                {serviceTypes.length > 0 && (
                  <div>
                    <label className="mb-2 block text-[10px] tracking-widest text-dark-500 uppercase md:mb-3 md:text-xs">Service Type</label>
                    <select
                      name="service_type"
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className={selectClass}
                    >
                      <option value="" className="bg-dark-900">Select service type</option>
                      {serviceTypes.map((st) => (
                        <option key={st} value={st} className="bg-dark-900">{st}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-[10px] tracking-widest text-dark-500 uppercase md:mb-3 md:text-xs">Location</label>
                  <input type="text" name="location" placeholder="Project location" className={inputClass} />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] tracking-widest text-dark-500 uppercase md:mb-3 md:text-xs">Message</label>
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
    </PageLayout>
  );
}
