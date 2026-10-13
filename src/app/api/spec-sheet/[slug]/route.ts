import { getProduct, products } from "@/content/products";
import { specSheetPdf } from "@/lib/pdf";

export const dynamic = "force-static";
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return new Response("Not found", { status: 404 });
  const bytes = await specSheetPdf(product);
  return new Response(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="belmont-${slug}-spec-sheet.pdf"`,
    },
  });
}
