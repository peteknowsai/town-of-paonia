import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Records a confidential expression of interest. Called server-side by the
// /api/interest route, which validates first. Stored confidential to
// Transparent Towns; not shared with the Town unless the candidate advances.
export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    currentRole: v.optional(v.string()),
    note: v.optional(v.string()),
    publishAck: v.boolean(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("interest", { ...args, createdAt: Date.now() });
    return { id };
  },
});
