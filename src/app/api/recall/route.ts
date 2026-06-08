import { NextResponse } from "next/server";
import { validateRecall, type RecallArgs } from "@/lib/forms";

// Receives a recall-campaign supporter sign-up and persists it to Convex.
//
// Calls the deployment's HTTP mutation endpoint directly with fetch rather than
// the Convex client, which pulls in a WebSocket (node:https) dependency the
// Cloudflare Workers runtime cannot load. Plain fetch works natively.
//
// Convex is the source of truth (full record: phone, how-they-help, note). If a
// Resend audience is configured we also mirror the email there as a best-effort
// side step, so broadcasts (with their built-in unsubscribe) are two clicks
// away. A Resend failure never fails the request: the contact is already saved.
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const resendKey = process.env.RESEND_API_KEY;
const resendAudienceId = process.env.RESEND_RECALL_AUDIENCE_ID;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad request" }, { status: 400 });
  }

  const v = validateRecall(body);
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
      body: JSON.stringify({ path: "recall:submit", args: v.args, format: "json" }),
    });
    const data = (await res.json().catch(() => ({}))) as { status?: string };
    if (!res.ok || data.status !== "success") {
      return NextResponse.json({ ok: false, error: "could not save, please try again" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ ok: false, error: "could not save, please try again" }, { status: 502 });
  }

  // Best-effort mirror into Resend so the list is ready to broadcast to.
  await mirrorToResend(v.args);

  return NextResponse.json({ ok: true });
}

async function mirrorToResend(args: RecallArgs) {
  if (!resendKey || !resendAudienceId) return;
  const [firstName, ...rest] = args.name.split(/\s+/);
  try {
    await fetch(`https://api.resend.com/audiences/${resendAudienceId}/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: args.email,
        first_name: firstName || undefined,
        last_name: rest.join(" ") || undefined,
        unsubscribed: false,
      }),
    });
  } catch {
    // Swallow: the supporter is already saved in Convex, the source of truth.
  }
}
