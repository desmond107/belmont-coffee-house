import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CartView } from "@/components/shop/CartView";

export const metadata: Metadata = { title: "Your cart", robots: { index: false } };

export default function CartPage() {
  return (
    <>
      <div className="h-24 bg-espresso sm:h-28" />
      <section className="py-14 sm:py-20">
        <Container>
          <h1 className="mb-10 text-5xl">Your cart</h1>
          <CartView />
        </Container>
      </section>
    </>
  );
}
