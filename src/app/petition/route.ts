// The petition page is a self-contained editorial page with its own styles
// and charts, so it bypasses the site layout. On Cloudflare the worker serves
// it through the ASSETS binding (public/ files); during next dev and the
// build, node fs reads it directly.
export async function GET(request: Request) {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = getCloudflareContext() as {
      env?: { ASSETS?: { fetch: (input: URL | Request) => Promise<Response> } };
    };
    if (env?.ASSETS) {
      const res = await env.ASSETS.fetch(new URL("/petition-content.html", request.url));
      return new Response(res.body, {
        status: res.status,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  } catch {
    // not running on the Cloudflare adapter; fall through to fs
  }
  const { readFileSync } = await import("node:fs");
  const { join } = await import("node:path");
  const html = readFileSync(join(process.cwd(), "public", "petition-content.html"), "utf8");
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
