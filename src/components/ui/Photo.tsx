import Image from "next/image";
import { images, type ImageKey } from "@/content/images";

const showBriefs =
  process.env.NEXT_PUBLIC_SHOW_PHOTO_BRIEFS === "true" ||
  (process.env.NODE_ENV !== "production" && process.env.NEXT_PUBLIC_SHOW_PHOTO_BRIEFS !== "false");

/**
 * Site photo by registry key. Fills its (relatively positioned) parent unless
 * `fill={false}`. In development, placeholder photos display their brief so
 * you can see exactly which real shot belongs where.
 */
export function Photo({
  name,
  className = "",
  sizes = "100vw",
  priority = false,
  fill = true,
  alt,
}: {
  name: ImageKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  alt?: string;
}) {
  const img = images[name];
  return (
    <>
      {fill ? (
        <Image src={img.src} alt={alt ?? img.alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`} />
      ) : (
        <Image src={img.src} alt={alt ?? img.alt} width={img.width} height={img.height} sizes={sizes} priority={priority} className={className} />
      )}
      {showBriefs && img.placeholder && (
        <span className="pointer-events-none absolute bottom-2 left-2 z-10 max-w-[80%] rounded-sm bg-black/60 px-2 py-1 text-[10px] leading-tight text-white/90">
          Placeholder · {img.brief}
        </span>
      )}
    </>
  );
}
