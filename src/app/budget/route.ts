import { readFileSync } from "node:fs";
import { join } from "node:path";

// The budget narrative is a self-contained editorial page with its own styles
// and charts, so it bypasses the site layout. force-static bakes it at build
// time into a plain static response; fs only runs on the build machine.
export const dynamic = "force-static";

export function GET() {
  const html = readFileSync(join(process.cwd(), "content", "budget.html"), "utf8");
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
