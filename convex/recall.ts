import { mutation } from "./_generated/server";
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
