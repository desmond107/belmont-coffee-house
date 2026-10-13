import { Container } from "@/components/ui/Container";
import { Button, Arrow } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import type { ImageKey } from "@/content/images";

export function CtaBand({
  eyebrow = "Ready when you are",
  title = "Let's build your next container together.",
  text = "Tell us what you're looking for: grade, volume, destination and timeline. Our export desk will reply with offer samples and a quotation within one business day.",
  image = "port",
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
  image?: ImageKey;
}) {
  return (
    <section className="grain relative isolate overflow-hidden bg-espresso py-24 text-cream sm:py-32">
      <div className="absolute inset-0 -z-10">
        <Photo name={image} sizes="100vw" className="opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/85 to-espresso/40" />
      </div>
      <Container>
        <div className="max-w-2xl">
          <p className="eyebrow eyebrow-light">{eyebrow}</p>
          <h2 className="mt-4 text-4xl leading-tight text-cream! sm:text-5xl">{title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-cream/80">{text}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/quote">
              Request a Quote <Arrow />
            </Button>
            <Button href="/samples" variant="outline-light">
              Request Samples
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
