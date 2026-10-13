import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CheckoutForm } from "@/components/shop/CheckoutForm";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <>
      <div className="h-24 bg-espresso sm:h-28" />
      <section className="relative py-14 sm:py-20">
        <Container>
          <h1 className="mb-10 text-5xl">Checkout</h1>
          <CheckoutForm />
        </Container>
      </section>
    </>
  );
}
