#!/usr/bin/env node
// Sync Paonia's public meetings from the Town's CivicClerk portal into
// src/data/meetings.ts. Run: npm run sync:meetings
//
// Why this exists: the official .gov calendar is JavaScript-rendered and blocks
// bots, but the CivicClerk OData API behind it is public. That is the
// authoritative feed, and it includes work sessions, special meetings, training
// sessions, and reschedules that a "2nd and 4th Tuesday" rule cannot see.
//
// We pull every public body, not just the Board of Trustees: Planning
// Commission, Tree Board, ad hoc committees, and the Zoning Board of
// Adjustments all meet in public too. Each meeting is tagged with a body so the
// site can default to the Board and let residents switch to "all".
//
// CivicClerk quirk: startDateTime is the LOCAL wall-clock time with a bogus "Z"
// suffix (e.g. "2026-06-02T18:30:00Z" means 6:30 PM Mountain, not UTC). We
// reinterpret it in America/Denver and write an ISO string with the right offset.

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const API = "https://paoniaco.api.civicclerk.com/v1/Events";
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/130.0 Safari/537.36";
const WINDOW_BACK_DAYS = 60;
const WINDOW_FWD_DAYS = 180;

const ymd = (d) => d.toISOString().slice(0, 10);

// The offset (-06:00 MDT / -07:00 MST) that America/Denver uses on a given date.
function denverOffset(naive) {
  const probe = new Date(naive + "Z");
  const tz = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Denver",
    timeZoneName: "short",
  })
    .formatToParts(probe)
    .find((p) => p.type === "timeZoneName")?.value;
  return tz === "MST" ? "-07:00" : "-06:00";
}

function toMountainISO(startDateTime) {
  const naive = startDateTime.replace(/(\.\d+)?Z?$/, "");
  return naive + denverOffset(naive);
}

function kindOf(name, template) {
  const s = `${name} ${template || ""}`.toLowerCase();
  if (s.includes("work session")) return "work-session";
  if (s.includes("special")) return "special";
  if (s.includes("training")) return "training";
  if (s.includes("regular")) return "regular";
  return "other";
}

// Map a CivicClerk category/name to a clean public body. The feed's "General"
// category is a catch-all, so fall back to inspecting the event name. Returns
// [bodyKey, bodyLabel].
function classifyBody(category, name) {
  const c = (category || "").toLowerCase();
  const n = (name || "").toLowerCase();
  const test = (re) => re.test(c) || re.test(n);
  if (test(/town board|board of trustees/)) return ["board", "Board of Trustees"];
  if (test(/planning/)) return ["planning", "Planning Commission"];
  if (test(/tree/)) return ["tree", "Tree Board"];
  if (test(/zoning|adjustment/)) return ["zoning", "Zoning Board of Adjustments"];
  if (test(/ad hoc|short.?term rental/)) return ["adhoc", "Ad Hoc Committee"];
  // "General" / training that is really the Board sitting for training.
  if (test(/board training|trustee/)) return ["board", "Board of Trustees"];
  return ["other", "Public Meeting"];
}

async function fetchEvents(fromISO, toISO) {
  const filter = `startDateTime ge ${fromISO} and startDateTime le ${toISO}`;
  let url = `${API}?$orderby=startDateTime&$filter=${encodeURIComponent(filter)}`;
  const out = [];
  while (url) {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`CivicClerk API ${res.status} ${res.statusText}`);
    const data = await res.json();
    out.push(...(data.value || []));
    url = data["@odata.nextLink"] || null;
  }
  return out;
}

const q = (s) => JSON.stringify(s);

async function main() {
  const now = new Date();
  const from = new Date(now.getTime() - WINDOW_BACK_DAYS * 864e5);
  const to = new Date(now.getTime() + WINDOW_FWD_DAYS * 864e5);
  const events = await fetchEvents(`${ymd(from)}T00:00:00Z`, `${ymd(to)}T23:59:59Z`);

  const seen = new Set();
  const meetings = events
    .filter((e) => e.isPublished === "Published" && !e.isDeleted)
    // Drop cancelled meetings: a resident should not see one as upcoming.
    .filter((e) => !/cancel+ed|cancelled|canceled/i.test(e.eventName || ""))
    .filter((e) => (seen.has(e.id) ? false : seen.add(e.id)))
    .map((e) => {
      const [bodyKey, body] = classifyBody(
        e.categoryName || e.eventCategoryName,
        e.eventName
      );
      return {
        eventId: e.id,
        start: toMountainISO(e.startDateTime),
        title: e.eventName,
        kind: kindOf(e.eventName, e.eventTemplateName),
        body,
        bodyKey,
        eventUrl: `https://paoniaco.portal.civicclerk.com/event/${e.id}/files`,
      };
    })
    .sort((a, b) => (a.start < b.start ? -1 : 1));

  if (meetings.length === 0) {
    throw new Error("No events returned; aborting so existing data is not wiped.");
  }

  const rows = meetings
    .map(
      (m) =>
        `  { eventId: ${m.eventId}, start: ${q(m.start)}, title: ${q(m.title)}, kind: ${q(
          m.kind
        )}, body: ${q(m.body)}, bodyKey: ${q(m.bodyKey)}, eventUrl: ev(${m.eventId}) },`
    )
    .join("\n");

  const file = `// AUTO-GENERATED by scripts/sync-meetings.mjs from the Town's CivicClerk
// portal (paoniaco.portal.civicclerk.com). Do not edit by hand; run
// \`npm run sync:meetings\` to refresh. The daily GitHub Action commits a
// fresh copy whenever the Town's calendar changes (see the commit date).
//
// Every public body the Town posts (Board of Trustees, Planning Commission,
// Tree Board, ad hoc committees, Zoning Board of Adjustments), so work sessions
// and reschedules a date rule would miss are included. CivicClerk stores start
// times as local wall-clock with a bogus Z; the sync reinterprets them in
// America/Denver.

export type MeetingKind =
  | "regular"
  | "work-session"
  | "special"
  | "training"
  | "other";

export type BodyKey =
  | "board"
  | "planning"
  | "tree"
  | "adhoc"
  | "zoning"
  | "other";

export interface RawMeeting {
  eventId: number;
  start: string;
  title: string;
  kind: MeetingKind;
  body: string;
  bodyKey: BodyKey;
  eventUrl: string;
}

const ev = (id: number) => \`https://paoniaco.portal.civicclerk.com/event/\${id}/files\`;

export const RAW_MEETINGS: RawMeeting[] = [
${rows}
];
`;

  const root = join(dirname(fileURLToPath(import.meta.url)), "..");
  writeFileSync(join(root, "src", "data", "meetings.ts"), file, "utf8");
  console.log(`Wrote ${meetings.length} meetings to src/data/meetings.ts`);
  const byBody = {};
  for (const m of meetings) byBody[m.bodyKey] = (byBody[m.bodyKey] || 0) + 1;
  console.log("By body:", JSON.stringify(byBody));
  for (const m of meetings)
    console.log(`  ${m.start}  ${m.bodyKey.padEnd(9)} ${m.kind.padEnd(13)} ${m.title}`);
}

main().catch((e) => {
  console.error("sync-meetings failed:", e.message);
  process.exit(1);
});
