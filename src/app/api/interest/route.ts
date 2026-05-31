import { NextResponse } from "next/server";
import { validateInterest } from "@/lib/forms";
import { SEARCH_PUBLISHED } from "@/data/position";

// Receives a confidential expression of interest and persists it to Convex.
//
// Calls the deployment's HTTP mutation endpoint directly with fetch rather than
// the Convex client, which pulls in a WebSocket (node:https) dependency the
// Cloudflare Workers runtime cannot load. Plain fetch works natively.
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

export async function POST(req: Request) {
  // Search is unpublished: reject writes until SEARCH_PUBLISHED is true.
  if (!SEARCH_PUBLISHED) return new NextResponse(null, { status: 404 });
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad request" }, { status: 400 });
  }

  const v = validateInterest(body);
  if (v.kind === "drop") return NextResponse.json({ ok: true });
  if (v.kind === "invalid") {
    return NextResponse.json({ ok: false, error: v.error }, { status: v.status });
  }

  if (!convexUrl) {
    return NextResponse.json({ ok: false, error: "storage not configured" }, { status: 500 });
  }

  try {
    const res = await fetch(`${convexUrl}/api/mutation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: "interest:submit", args: v.args, format: "json" }),
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
