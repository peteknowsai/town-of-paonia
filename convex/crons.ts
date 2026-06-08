import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

// Once a day, email the campaign a digest of new recall signups.
// 14:00 UTC is 8:00 AM in Paonia during Mountain Daylight Time.
const crons = cronJobs();

crons.daily(
  "recall signup digest",
  { hourUTC: 14, minuteUTC: 0 },
  internal.recall.sendDigest,
);

export default crons;
