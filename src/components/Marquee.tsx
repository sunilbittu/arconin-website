export default function Marquee() {
  const text = "Architecture \u00B7 Design \u00B7 Innovation \u00B7 Spaces \u00B7 ";
  const repeated = text.repeat(4);

  return (
    <div className="relative overflow-hidden py-10 md:py-24" style={{ transform: "skewY(-2deg)" }}>
      <div className="marquee-track flex whitespace-nowrap">
        <span className="text-stroke marquee-text inline-block text-[12vw] font-bold uppercase leading-none tracking-wider md:text-[8vw]">
          {repeated}
        </span>
        <span className="text-stroke marquee-text inline-block text-[12vw] font-bold uppercase leading-none tracking-wider md:text-[8vw]">
          {repeated}
        </span>
      </div>
    </div>
  );
}
