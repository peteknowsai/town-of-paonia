import { NextResponse } from "next/server";

// Admin login for the supporter dashboard. Compares the submitted key to the
// ADMIN_KEY env var and, on a match, sets it as an httpOnly cookie. The Convex
// list query re-checks the same key, so the cookie alone never leaks data.
const adminKey = process.env.ADMIN_KEY;

// Length-aware constant-time-ish compare, to avoid leaking the key by timing.
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function POST(req: Request) {
  let body: { key?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const key = String(body.key ?? "");
  if (!adminKey || !key || !safeEqual(key, adminKey)) {
    return NextResponse.json({ ok: false, error: "wrong key" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_key", key, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
