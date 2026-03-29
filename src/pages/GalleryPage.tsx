import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PageLayout from "../components/layout/PageLayout";
import PageHero from "../components/layout/PageHero";
import { galleryImages, cloudinaryUrl, cloudinaryThumb } from "../data/gallery";

gsap.registerPlugin(ScrollTrigger);

const IMAGES_PER_PAGE = 30;

export default function GalleryPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(IMAGES_PER_PAGE);

  const visible = galleryImages.slice(0, visibleCount);
  const hasMore = visibleCount < galleryImages.length;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll(".gallery-item");
      if (items) {
        gsap.set(items, { y: 40, opacity: 0 });
        gsap.to(items, {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.5,
          ease: "power3.out",
        });
      }
    });
    return () => ctx.revert();
  }, [visibleCount]);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((prev) => prev !== null ? (prev + 1) % galleryImages.length : null);
      if (e.key === "ArrowLeft") setLightbox((prev) => prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  return (
    <PageLayout>
      <PageHero
        tagline="Gallery"
        title="Our Visual Story"
        subtitle={`Explore ${galleryImages.length} images from our portfolio of architectural designs, interior spaces, and construction projects.`}
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

      {/* Project Images Header */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8 md:mb-12">
          <div className="mb-4 flex items-center gap-3 md:mb-6">
            <div className="h-px w-8 bg-brand-500 md:w-12" />
            <span className="text-xs tracking-[0.2em] text-brand-400 uppercase md:text-sm md:tracking-[0.3em]">
              Project Images — {galleryImages.length} Photos
            </span>
          </div>
        </div>
      </div>

      {/* Masonry Image Grid */}
      <section className="pb-20 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8" ref={gridRef}>
          <div className="columns-2 gap-3 sm:columns-2 md:columns-3 lg:columns-4 md:gap-4">
            {visible.map((img, i) => {
              const isPortrait = img.height > img.width;
              return (
                <div
                  key={img.publicId}
                  className="gallery-item group mb-3 break-inside-avoid cursor-pointer md:mb-4"
                  onClick={() => setLightbox(i)}
                  data-cursor="view"
                >
                  <div className="overflow-hidden rounded-xl border border-dark-700/50 bg-dark-900/30 transition-all duration-500 hover:border-brand-500/30">
                    <img
                      src={cloudinaryThumb(img.publicId, isPortrait ? 400 : 600)}
                      alt={`Project image ${i + 1}`}
                      loading="lazy"
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="mt-12 text-center md:mt-16">
              <button
                onClick={() => setVisibleCount((prev) => Math.min(prev + IMAGES_PER_PAGE, galleryImages.length))}
                className="group inline-flex items-center gap-3 rounded-full border border-brand-500/40 bg-brand-500/10 px-8 py-3 font-display text-xs font-medium tracking-wider text-brand-300 uppercase transition-all hover:border-brand-500 hover:bg-brand-500/20 md:px-10 md:py-4 md:text-sm"
              >
                Load More ({galleryImages.length - visibleCount} remaining)
                <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-dark-950/95 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-dark-700 text-dark-400 transition-colors hover:border-brand-500 hover:text-white md:right-8 md:top-8"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute left-4 top-4 font-display text-sm text-dark-400 md:left-8 md:top-8">
            <span className="text-white">{lightbox + 1}</span>
            <span className="mx-1">/</span>
            <span>{galleryImages.length}</span>
          </div>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox - 1 + galleryImages.length) % galleryImages.length);
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
              src={cloudinaryUrl(galleryImages[lightbox].publicId, 1600)}
              alt={`Project image ${lightbox + 1}`}
              className="max-h-[85vh] rounded-xl object-contain"
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % galleryImages.length);
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
