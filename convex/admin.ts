import { internalQuery, internalMutation } from "./_generated/server";
import { v } from "convex/values";

// Internal-only (not callable from the public client). Read submissions from
// the CLI with: npx convex run admin:listInterest   /  admin:listCommittee
// Use the Convex dashboard for the friendly view.

export const listInterest = internalQuery({
  args: {},
  handler: async (ctx) => ctx.db.query("interest").order("desc").collect(),
});

export const listCommittee = internalQuery({
  args: {},
  handler: async (ctx) => ctx.db.query("committee").order("desc").collect(),
});

// Remove a single submission (e.g. spam, or a test row) by id.
export const deleteSubmission = internalMutation({
  args: { id: v.union(v.id("interest"), v.id("committee")) },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
