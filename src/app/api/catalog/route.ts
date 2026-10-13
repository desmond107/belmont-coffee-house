import { products } from "@/content/products";
import { catalogPdf } from "@/lib/pdf";

export const dynamic = "force-static";

export async function GET() {
  const bytes = await catalogPdf(products);
  return new Response(Buffer.from(bytes), {
    headers: { "Content-Type": "application/pdf", "Content-Disposition": `inline; filename="belmont-export-catalogue.pdf"` },
  });
}
