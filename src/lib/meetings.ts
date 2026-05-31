// Schedule logic over the real Board of Trustees meeting records in
// src/data/meetings.ts. No rule-based date math: a meeting exists only if it is
// on the Town's calendar, so work sessions, special meetings, and reschedules
// all show up, and nothing is invented.

import { RAW_MEETINGS, type RawMeeting, type MeetingKind } from "@/data/meetings";

export type { MeetingKind };

export interface Meeting {
  /** URL slug: the ISO date, or date + event id when a date has two meetings. */
  id: string;
  /** CivicClerk event id, stable across syncs. */
  eventId: number;
  dateISO: string;
  /** "Tuesday, June 2, 2026" */
  dateLabel: string;
  /** "Tue, Jun 2" */
  shortLabel: string;
  /** "Jun" — for the stacked date block. */
  month: string;
  /** "2" — for the stacked date block. */
  day: string;
  /** "6:30 PM" */
  timeLabel: string;
  /** Official event title, e.g. "Board Agenda Work Session". */
  title: string;
  kind: MeetingKind;
  body: string;
  /** CivicClerk event page: agenda, packet, minutes, recording. */
  eventUrl: string;
  isPast: boolean;
  isLive: boolean;
}

// A meeting counts as "live" from its start until a generous end-of-window, so
// the join path stays useful for the whole meeting.
const LIVE_WINDOW_MS = 3 * 60 * 60 * 1000;
const TZ = "America/Denver";

function partsInDenver(d: Date) {
  const f = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).formatToParts(d);
  const get = (t: string) => f.find((p) => p.type === t)?.value ?? "";
  return { weekday: get("weekday"), month: get("month"), day: get("day"), year: get("year") };
}

function decorate(m: RawMeeting, now: Date): Meeting {
  const startMs = Date.parse(m.start);
  const nowMs = now.getTime();
  const isLive = nowMs >= startMs && nowMs < startMs + LIVE_WINDOW_MS;
  const isPast = nowMs >= startMs + LIVE_WINDOW_MS;
  const d = new Date(startMs);

  const full = partsInDenver(d);
  const dateISO = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d); // en-CA gives YYYY-MM-DD
  const short = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(d);
  const monthShort = new Intl.DateTimeFormat("en-US", { timeZone: TZ, month: "short" }).format(d);
  const timeLabel = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    hour: "numeric",
    minute: "2-digit",
  }).format(d);

  return {
    id: dateISO, // may be made unique by allDecorated when a date repeats
    eventId: m.eventId,
    dateISO,
    dateLabel: `${full.weekday}, ${full.month} ${full.day}, ${full.year}`,
    shortLabel: short,
    month: monthShort,
    day: full.day,
    timeLabel,
    title: m.title,
    kind: m.kind,
    body: m.body,
    eventUrl: m.eventUrl,
    isPast,
    isLive,
  };
}

export interface Schedule {
  live: Meeting | null;
  next: Meeting | null;
  upcoming: Meeting[];
  recent: Meeting[];
}

function allDecorated(now: Date): Meeting[] {
  const list = RAW_MEETINGS.map((m) => decorate(m, now)).sort((a, b) =>
    a.dateISO < b.dateISO ? -1 : a.dateISO > b.dateISO ? 1 : 0
  );
  // A single date can hold more than one Town Board meeting (e.g. a work
  // session and a regular meeting). Keep the clean date slug when a date is
  // unique, and disambiguate with the event id when it is not, so static params
  // never collide.
  const counts = new Map<string, number>();
  for (const m of list) counts.set(m.dateISO, (counts.get(m.dateISO) ?? 0) + 1);
  for (const m of list) {
    if ((counts.get(m.dateISO) ?? 0) > 1) m.id = `${m.dateISO}-${m.eventId}`;
  }
  return list;
}

export function getSchedule(now: Date = new Date()): Schedule {
  const all = allDecorated(now);
  const live = all.find((m) => m.isLive) ?? null;
  const future = all.filter((m) => !m.isPast && !m.isLive);
  const past = all.filter((m) => m.isPast).reverse();
  return { live, next: future[0] ?? null, upcoming: future, recent: past };
}

export function getMeeting(id: string, now: Date = new Date()): Meeting | null {
  if (!/^\d{4}-\d{2}-\d{2}(-\d+)?$/.test(id)) return null;
  return allDecorated(now).find((m) => m.id === id) ?? null;
}

export function meetingParams(): { id: string }[] {
  // Stable across requests; uses the records directly so it does not depend on
  // the current time.
  const now = new Date(0);
  return allDecorated(now).map((m) => ({ id: m.id }));
}

export function kindLabel(k: MeetingKind): string {
  const map: Record<MeetingKind, string> = {
    regular: "Regular meeting",
    "work-session": "Work session",
    special: "Special meeting",
    training: "Training session",
    other: "Meeting",
  };
  return map[k];
}

// A neutral, plain-language description of what each kind of meeting is.
export function kindBlurb(k: MeetingKind, body: string): string {
  const map: Record<MeetingKind, string> = {
    regular: `A regular meeting of the ${body}. Anyone can attend in person or watch online.`,
    "work-session": `A work session where the ${body} reviews the upcoming agenda. Open to the public.`,
    special: `A special meeting of the ${body}, called for specific business. Open to the public.`,
    training: `A training session for the ${body}. Open to the public.`,
    other: `A meeting of the ${body}. Open to the public.`,
  };
  return map[k];
}
