import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Backing store for the /administrator search funnels.
export default defineSchema({
  // Confidential expressions of interest from prospective administrators.
  // Confidential by default; only becomes public if the candidate advances
  // to an interview with the Town (publishAck records that they understand).
  interest: defineTable({
    name: v.string(),
    email: v.string(),
    currentRole: v.optional(v.string()),
    note: v.optional(v.string()),
    publishAck: v.boolean(),
    createdAt: v.number(),
  }),

  // Open, self-nominated sign-ups for the citizens' committee.
  committee: defineTable({
    name: v.string(),
    email: v.string(),
    connection: v.optional(v.string()),
    why: v.optional(v.string()),
    createdAt: v.number(),
  }),
});
