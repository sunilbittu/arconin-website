import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageLayout from "../components/layout/PageLayout";
import PageHero from "../components/layout/PageHero";
import ImageReveal from "../components/ImageReveal";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Architecture", "Interiors", "Construction", "Spaces"] as const;

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    title: "The Glass Pavilion",
    category: "Architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    title: "Serene Living Room",
    category: "Interiors",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    title: "Heritage Restoration",
    category: "Construction",
  },
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    title: "Horizon Tower",
    category: "Architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    title: "Urban Loft Studio",
    category: "Interiors",
  },
  {
    src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    title: "Minimalist Villa",
    category: "Architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    title: "The Nexus Office",
    category: "Spaces",
  },
  {
    src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    title: "Green Haven Apartments",
    category: "Construction",
  },
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    title: "Luxury Residence",
    category: "Architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    title: "Custom Furniture",
    category: "Interiors",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    title: "Modern Kitchen",
    category: "Interiors",
  },
  {
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    title: "Project Management Hub",
    category: "Spaces",
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const gridRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll(".gallery-item");
      if (items) {
        gsap.set(items, { y: 40, opacity: 0 });
        gsap.to(items, {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
        });
      }
    });
    return () => ctx.revert();
  }, [activeCategory]);

  // Close lightbox on escape
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((prev) => prev !== null ? (prev + 1) % filtered.length : null);
      if (e.key === "ArrowLeft") setLightbox((prev) => prev !== null ? (prev - 1 + filtered.length) % filtered.length : null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, filtered.length]);

  return (
    <PageLayout>
      <PageHero
        tagline="Gallery"
        title="Our Visual Story"
        subtitle="Explore our portfolio of architectural designs, interior spaces, and construction projects through images and video."
      />

      {/* Video Showcase */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-8 md:mb-12">
            <div className="mb-4 flex items-center gap-3 md:mb-6">
              <div className="h-px w-8 bg-brand-500 md:w-12" />
              <span className="text-xs tracking-[0.2em] text-brand-400 uppercase md:text-sm md:tracking-[0.3em]">Featured Video</span>
            </div>
          </div>
          <div className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-2xl border border-dark-700/50 bg-dark-900/30">
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/9tNIOHwhYbk"
                  title="ARCONIN Project Showcase"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8 md:mb-12">
          <div className="mb-4 flex items-center gap-3 md:mb-6">
            <div className="h-px w-8 bg-brand-500 md:w-12" />
            <span className="text-xs tracking-[0.2em] text-brand-400 uppercase md:text-sm md:tracking-[0.3em]">Project Images</span>
          </div>
        </div>
        <div className="flex gap-1 overflow-x-auto border-b border-dark-700/50 pb-px scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative whitespace-nowrap px-4 py-3 text-xs font-medium tracking-wider uppercase transition-colors md:px-6 md:py-4 md:text-sm ${
                activeCategory === cat
                  ? "text-brand-400"
                  : "text-dark-500 hover:text-dark-300"
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <div className="absolute inset-x-0 -bottom-px h-[2px] bg-brand-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Image Grid */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8" ref={gridRef} key={activeCategory}>
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 md:gap-6">
            {filtered.map((img, i) => (
              <div
                key={`${img.title}-${i}`}
                className="gallery-item group mb-4 break-inside-avoid cursor-pointer md:mb-6"
                onClick={() => setLightbox(i)}
                data-cursor="view"
              >
                <ImageReveal className="relative overflow-hidden rounded-2xl">
                  <div className="overflow-hidden rounded-2xl border border-dark-700/50 bg-dark-900/30 transition-all duration-500 hover:border-brand-500/30">
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:p-5">
                      <p className="text-[10px] tracking-[0.2em] text-brand-400 uppercase md:text-xs">
                        {img.category}
                      </p>
                      <h3 className="mt-1 font-display text-sm font-bold text-white md:text-base">
                        {img.title}
                      </h3>
                    </div>
                  </div>
                </ImageReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-dark-950/95 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-dark-700 text-dark-400 transition-colors hover:border-brand-500 hover:text-white md:right-8 md:top-8"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox - 1 + filtered.length) % filtered.length);
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-dark-700 text-dark-400 transition-colors hover:border-brand-500 hover:text-white md:left-6"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Image */}
          <div className="max-h-[85vh] max-w-[90vw] md:max-w-[80vw]" onClick={(e) => e.stopPropagation()}>
            <img
              src={filtered[lightbox].src.replace('w=800', 'w=1600')}
              alt={filtered[lightbox].title}
              className="max-h-[85vh] rounded-xl object-contain"
            />
            <div className="mt-3 text-center">
              <p className="text-[10px] tracking-[0.2em] text-brand-400 uppercase">{filtered[lightbox].category}</p>
              <p className="mt-1 font-display text-sm font-bold text-white">{filtered[lightbox].title}</p>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % filtered.length);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-dark-700 text-dark-400 transition-colors hover:border-brand-500 hover:text-white md:right-6"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </PageLayout>
  );
}
