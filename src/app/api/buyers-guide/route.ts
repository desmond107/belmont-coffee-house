import { buyersGuidePdf } from "@/lib/pdf";

export const dynamic = "force-static";

export async function GET() {
  const bytes = await buyersGuidePdf();
  return new Response(Buffer.from(bytes), {
    headers: { "Content-Type": "application/pdf", "Content-Disposition": `inline; filename="belmont-green-coffee-buyers-guide.pdf"` },
  });
}
