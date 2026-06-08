import { mutation, query, internalQuery, internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";

// Records a recall-campaign supporter who wants to stay involved. Called
// server-side by the /api/recall route, which validates first. No gatekeeping:
// anyone can sign up to get updates or offer to help.
export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    help: v.array(v.string()),
    note: v.optional(v.string()),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("recall", { ...args, createdAt: Date.now() });
    return { id };
  },
});

// Returns the full supporter list, newest first, for the admin dashboard.
//
// This holds people's names, emails, and phone numbers for a contentious
// recall, and Convex HTTP query endpoints are public, so the list is gated by a
// shared secret checked HERE, server-side: without the right key it returns
// null. The /admin/supporters page holds the key in env and passes it through.
export const list = query({
  args: { key: v.string() },
  handler: async (ctx, { key }) => {
    const expected = process.env.ADMIN_KEY;
    if (!expected || key !== expected) return null;
    return await ctx.db.query("recall").order("desc").collect();
  },
});

// Supporters who signed up in the last 24 hours. Internal: only the digest
// action can call it, so it needs no key.
export const recentSignups = internalQuery({
  args: {},
  handler: async (ctx) => {
    const since = Date.now() - 24 * 60 * 60 * 1000;
    const rows = await ctx.db.query("recall").order("desc").collect();
    return rows.filter((r) => r.createdAt >= since);
  },
});

// Once-a-day digest email of new supporters. Scheduled by convex/crons.ts.
// Sends through Resend (RESEND_API_KEY + DIGEST_FROM + DIGEST_TO in Convex env).
// If nothing new came in, it sends nothing rather than a daily "0 signups".
export const sendDigest = internalAction({
  args: {},
  handler: async (ctx): Promise<{ sent: boolean; reason?: string; count?: number }> => {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.DIGEST_FROM; // e.g. "Recall updates <updates@townofpaonia.co>"
    const to = process.env.DIGEST_TO; // e.g. "petefromsf@gmail.com"
    if (!apiKey || !from || !to) return { sent: false, reason: "email not configured" };

    const rows = await ctx.runQuery(internal.recall.recentSignups, {});
    if (rows.length === 0) return { sent: false, reason: "nothing new" };

    const helpLabels: Record<string, string> = {
      petition: "sign",
      gather: "gather signatures",
      host: "host / spread the word",
      updates: "keep posted",
    };
    const lines = rows.map((r) => {
      const help = r.help.map((h) => helpLabels[h] ?? h).join(", ") || "no preference";
      const phone = r.phone ? ` · ${r.phone}` : "";
      const note = r.note ? `\n     note: ${r.note}` : "";
      return `• ${r.name} — ${r.email}${phone}\n     wants to: ${help}${note}`;
    });
    const text =
      `${rows.length} new recall signup${rows.length === 1 ? "" : "s"} in the last 24 hours:\n\n` +
      lines.join("\n\n") +
      `\n\nSee everyone at https://townofpaonia.co/admin/supporters`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        subject: `${rows.length} new recall signup${rows.length === 1 ? "" : "s"}`,
        text,
      }),
    });
    return { sent: res.ok, count: rows.length };
  },
});
