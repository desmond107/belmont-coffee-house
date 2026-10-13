import Link from "next/link";

export function BeanMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={className}>
      <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeOpacity=".35" />
      <g transform="rotate(-28 20 20)">
        <ellipse cx="20" cy="20" rx="8.5" ry="12.5" fill="#B8893B" />
        <path d="M20 8c-3.6 4 3.6 8 0 12s3.6 8 0 12" fill="none" stroke="#2B1A12" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group flex items-center gap-3 ${className}`} aria-label="Belmont Coffee House — home">
      <BeanMark className="h-10 w-10 transition-transform duration-500 group-hover:rotate-12" />
      <span className="leading-none">
        <span className="block font-serif text-[1.65rem] font-semibold tracking-[0.06em]">BELMONT</span>
        <span className="mt-0.5 block text-[0.56rem] font-semibold tracking-[0.42em] opacity-80">COFFEE HOUSE</span>
      </span>
    </Link>
  );
}
