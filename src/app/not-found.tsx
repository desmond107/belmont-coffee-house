import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[80vh] items-center bg-espresso pt-32 pb-20 text-cream">
      <Container narrow>
        <p className="eyebrow eyebrow-light">404</p>
        <h1 className="mt-4 text-6xl text-cream!">This lot has already shipped.</h1>
        <p className="mt-5 max-w-xl text-lg text-cream/80">The page you&apos;re looking for doesn&apos;t exist or has moved. Try our coffee catalogue or get in touch.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/coffee">Browse coffees</Button>
          <Button href="/" variant="outline-light">Back to home</Button>
        </div>
      </Container>
    </section>
  );
}
