import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Records an open, self-nominated committee sign-up. Called server-side by
// the /api/committee route, which validates first. No gatekeeping: any
// resident can sign up.
export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    connection: v.optional(v.string()),
    why: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("committee", { ...args, createdAt: Date.now() });
    return { id };
  },
});
