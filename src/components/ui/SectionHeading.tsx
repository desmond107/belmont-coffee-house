export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  light = false,
  className = "",
  as: H = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && <p className={`eyebrow mb-4 ${light ? "eyebrow-light" : ""}`}>{eyebrow}</p>}
      <H className={`text-4xl leading-[1.08] sm:text-5xl ${light ? "text-cream!" : ""}`}>{title}</H>
      {intro && <div className={`mt-5 text-lg leading-relaxed ${light ? "text-cream/80" : "text-muted"}`}>{intro}</div>}
    </div>
  );
}
