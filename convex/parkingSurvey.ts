import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Records one downtown parking survey response. Called server-side by the
// /api/parking-survey route, which validates and shapes the args first. Open
// to the public (no gate); the survey is meant to be filled by anyone downtown.
export const submit = mutation({
  args: {
    businessName: v.optional(v.string()),
    businessOwner: v.optional(v.string()),
    businessAddress: v.optional(v.string()),
    block: v.optional(v.string()),
    roles: v.array(v.string()),
    enoughParking: v.optional(v.string()),
    hardestTimes: v.array(v.string()),
    barrier: v.optional(v.string()),
    barrierDetail: v.optional(v.string()),
    parkWhere: v.array(v.string()),
    position: v.optional(v.string()),
    comments: v.optional(v.string()),
    followUpContact: v.optional(v.string()),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("parkingSurvey", { ...args, createdAt: Date.now() });
    return { id };
  },
});
