import SplitText from "../SplitText";

interface PageHeroProps {
  tagline: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({ tagline, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Gradient orbs */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[300px] w-[300px] rounded-full bg-brand-500/5 blur-[120px] md:h-[600px] md:w-[600px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[250px] w-[250px] rounded-full bg-brand-700/8 blur-[100px] md:h-[500px] md:w-[500px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-4 flex items-center gap-3 md:mb-6">
          <div className="h-px w-8 bg-brand-500 md:w-12" />
          <span className="text-xs tracking-[0.2em] text-brand-400 uppercase md:text-sm md:tracking-[0.3em]">
            {tagline}
          </span>
        </div>

        <h1 className="font-display text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          <SplitText type="words" stagger={0.04} duration={0.8}>
            {title}
          </SplitText>
        </h1>

        {subtitle && (
          <p className="mt-4 max-w-2xl text-sm font-light text-dark-400 md:mt-6 md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
