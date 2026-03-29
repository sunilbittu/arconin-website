import SplitText from "../SplitText";

interface SectionHeaderProps {
  tagline: string;
  title: string;
  centered?: boolean;
}

export default function SectionHeader({ tagline, title, centered = false }: SectionHeaderProps) {
  return (
    <div className={`mb-12 md:mb-20 ${centered ? "text-center" : "max-w-2xl"}`}>
      <div className={`mb-4 flex items-center gap-3 md:mb-6 ${centered ? "justify-center" : ""}`}>
        {centered && <div className="h-px w-8 bg-brand-500 md:w-12" />}
        {!centered && <div className="h-px w-8 bg-brand-500 md:w-12" />}
        <span className="text-xs tracking-[0.2em] text-brand-400 uppercase md:text-sm md:tracking-[0.3em]">
          {tagline}
        </span>
        {centered && <div className="h-px w-8 bg-brand-500 md:w-12" />}
      </div>
      <h2 className="font-display text-3xl font-bold text-white md:text-4xl lg:text-5xl">
        <SplitText type="words" stagger={0.04}>
          {title}
        </SplitText>
      </h2>
    </div>
  );
}
