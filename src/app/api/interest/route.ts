import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

// Receives a confidential expression of interest and persists it to Convex.
// Confidential by default: stored to Transparent Towns, not shared with the
// Town unless the candidate later advances to an interview.
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

  const currentRole = String(body.currentRole ?? "").trim() || undefined;
  const note = String(body.note ?? "").trim() || undefined;
  const publishAck = Boolean(body.publishAck);

  try {
    const client = new ConvexHttpClient(convexUrl);
    await client.mutation(api.interest.submit, { name, email, currentRole, note, publishAck });
  } catch {
    return NextResponse.json({ ok: false, error: "could not save, please try again" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
