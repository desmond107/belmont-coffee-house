import Image from "next/image";
import Link from "next/link";

export function BrandMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <Image
      src="/belmont-logo.jpg"
      alt=""
      width={80}
      height={80}
      priority
      className={`rounded-full object-cover ring-1 ring-current/20 ${className}`}
    />
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group flex items-center gap-3 ${className}`} aria-label="Belmont Coffee House — home">
      <BrandMark className="h-11 w-11 transition-transform duration-500 group-hover:scale-105" />
      <span className="leading-none">
        <span className="block font-serif text-[1.65rem] font-semibold tracking-[0.06em]">BELMONT</span>
        <span className="mt-0.5 block text-[0.56rem] font-semibold tracking-[0.42em] opacity-80">COFFEE HOUSE</span>
      </span>
    </Link>
  );
}
