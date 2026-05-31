import { NextResponse } from "next/server";

// Receives an open, self-nominated committee sign-up and persists it to Convex.
//
// Calls the deployment's HTTP mutation endpoint directly with fetch rather than
// the Convex client, which pulls in a WebSocket (node:https) dependency the
// Cloudflare Workers runtime cannot load. Plain fetch works natively.
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad request" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "name and a valid email are required" }, { status: 422 });
  }

  if (!convexUrl) {
    return NextResponse.json({ ok: false, error: "storage not configured" }, { status: 500 });
  }

  const args = {
    name,
    email,
    connection: String(body.connection ?? "").trim() || undefined,
    why: String(body.why ?? "").trim() || undefined,
  };

  try {
    const res = await fetch(`${convexUrl}/api/mutation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: "committee:submit", args, format: "json" }),
    });
    const data = (await res.json().catch(() => ({}))) as { status?: string };
    if (!res.ok || data.status !== "success") {
      return NextResponse.json({ ok: false, error: "could not save, please try again" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ ok: false, error: "could not save, please try again" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
