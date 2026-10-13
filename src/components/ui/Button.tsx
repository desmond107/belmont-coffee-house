import Link from "next/link";

type Variant = "gold" | "dark" | "outline" | "outline-light" | "link";

const styles: Record<Variant, string> = {
  gold: "bg-gold text-espresso hover:bg-gold-light",
  dark: "bg-espresso text-cream hover:bg-roast",
  outline: "border border-espresso/30 text-espresso hover:border-espresso hover:bg-espresso hover:text-cream",
  "outline-light": "border border-cream/50 text-cream hover:bg-cream hover:text-espresso",
  link: "text-gold-deep underline-offset-4 hover:underline px-0! py-0!",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-[2px] px-6 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed";

export function Button({
  href,
  variant = "gold",
  className = "",
  children,
  external,
  ...rest
}: {
  href?: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = `${base} ${styles[variant]} ${className}`;
  if (href) {
    if (external || href.startsWith("http") || href.startsWith("/api/"))
      return (
        <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      );
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className={`h-3.5 w-3.5 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  );
}
