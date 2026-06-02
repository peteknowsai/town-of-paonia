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

  // Downtown parking survey responses. Filled online (scanned from the printed
  // sheet's QR, or on the web) and stored here. Every field is optional so a
  // partial answer is still recorded; multi-select questions are string arrays.
  parkingSurvey: defineTable({
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
    createdAt: v.number(),
  }),
});
