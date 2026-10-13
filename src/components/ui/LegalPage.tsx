import { Container } from "./Container";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <div className="bg-espresso pt-40 pb-16 text-cream">
        <Container narrow>
          <p className="eyebrow eyebrow-light">Legal</p>
          <h1 className="mt-4 text-5xl text-cream!">{title}</h1>
          <p className="mt-4 text-sm text-cream/70">Last updated: {updated}</p>
        </Container>
      </div>
      <section className="py-16 sm:py-20">
        <Container narrow>
          <p className="mb-10 border-l-2 border-gold bg-parchment p-4 text-sm text-muted">
            [Template text. Have this policy reviewed by a qualified legal adviser before launch.]
          </p>
          <div className="prose-belmont">{children}</div>
        </Container>
      </section>
    </>
  );
}
