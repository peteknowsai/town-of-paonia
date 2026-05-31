// Data-integrity tests for the water tracker, run on the project's Vitest
// gate (npm test). These guard the invariants the /water page relies on, so a
// bad data edit fails loudly in CI instead of shipping.
//
//   npm test            (runs all suites)
//   npx vitest run src/data/water.test.ts

import { describe, it, expect } from "vitest";
import {
  WATER,
  type ProjectStatus,
  type AlertKind,
  type Confidence,
  type FundingType,
  type TimelineStatus,
  type Source,
} from "./water";

const STATUS: ProjectStatus[] = [
  "planning", "design", "funded", "bidding", "construction",
  "substantially-complete", "complete", "stalled", "unknown",
];
const KINDS: AlertKind[] = ["success", "watch", "problem", "info"];
const CONF: Confidence[] = ["high", "medium", "low"];
const FTYPES: FundingType[] = ["grant", "loan", "match", "mixed", "unknown"];
const TLS: TimelineStatus[] = ["done", "in-progress", "planned", "unknown"];

function okSources(srcs: Source[], where: string) {
  expect(Array.isArray(srcs) && srcs.length > 0, `${where}: must cite at least one source`).toBe(true);
  for (const s of srcs) {
    expect(Boolean(s.title && s.title.length > 0), `${where}: source needs a title`).toBe(true);
    expect(Boolean(s.url && /^https?:\/\//.test(s.url)), `${where}: source needs a real URL (${s.url})`).toBe(true);
  }
}

describe("water data integrity", () => {
  it("top-level narrative fields are present", () => {
    for (const k of ["vision", "overview", "approachNote", "dataConfidenceNote"] as const) {
      expect(Boolean(WATER[k] && WATER[k].length > 20), `${k} should be a substantive string`).toBe(true);
    }
    expect(Boolean(WATER.lastUpdated && WATER.lastUpdated.length >= 4), "lastUpdated should be set").toBe(true);
  });

  it("projects are well-formed and have unique ids", () => {
    const ids = new Set<string>();
    expect(WATER.projects.length > 0, "expected at least one project").toBe(true);
    for (const p of WATER.projects) {
      expect(ids.has(p.id), `duplicate project id: ${p.id}`).toBe(false);
      ids.add(p.id);
      expect(STATUS.includes(p.status), `${p.id}: bad status ${p.status}`).toBe(true);
      expect(CONF.includes(p.confidence), `${p.id}: bad confidence`).toBe(true);
      expect(Boolean(p.summary && p.statusNote && p.whyItMatters), `${p.id}: missing required prose`).toBe(true);
      expect(
        p.percentComplete === null || (p.percentComplete >= 0 && p.percentComplete <= 100),
        `${p.id}: percentComplete out of range`,
      ).toBe(true);
      okSources(p.sources, `project ${p.id}`);
    }
  });

  it("funding rows are well-formed", () => {
    expect(WATER.funding.length > 0, "expected funding rows").toBe(true);
    for (const f of WATER.funding) {
      expect(FTYPES.includes(f.type), `funding ${f.source}: bad type ${f.type}`).toBe(true);
      expect(CONF.includes(f.confidence), `funding ${f.source}: bad confidence`).toBe(true);
      expect(
        f.amountNumeric === null || typeof f.amountNumeric === "number",
        `funding ${f.source}: amountNumeric must be number|null`,
      ).toBe(true);
      okSources(f.sources, `funding ${f.source}`);
    }
  });

  it("alerts and kpis are well-formed", () => {
    for (const a of WATER.alerts) {
      expect(KINDS.includes(a.kind), `alert "${a.title}": bad kind`).toBe(true);
      expect(CONF.includes(a.confidence), `alert "${a.title}": bad confidence`).toBe(true);
      okSources(a.sources, `alert "${a.title}"`);
    }
    for (const k of WATER.kpis) {
      expect(CONF.includes(k.confidence), `kpi "${k.label}": bad confidence`).toBe(true);
      okSources(k.sources, `kpi "${k.label}"`);
    }
  });

  it("timeline entries use valid statuses", () => {
    for (const t of WATER.timeline) {
      expect(TLS.includes(t.status), `timeline "${t.label}": bad status ${t.status}`).toBe(true);
      expect(Boolean(t.date && t.label), "timeline entry missing date or label").toBe(true);
    }
  });

  it("relatedProject references resolve to a real project", () => {
    const ids = new Set(WATER.projects.map((p) => p.id));
    for (const a of WATER.alerts) {
      if (a.relatedProject) {
        expect(ids.has(a.relatedProject), `alert "${a.title}": relatedProject ${a.relatedProject} not found`).toBe(true);
      }
    }
  });

  it("house style: no em or en dashes anywhere in the copy", () => {
    // The site voice forbids em dashes. Catch them in data, not in review.
    const bad = /[—–]/;
    const walk = (v: unknown, path: string) => {
      if (typeof v === "string") {
        expect(bad.test(v), `em/en dash found at ${path}: "${v.slice(0, 60)}"`).toBe(false);
      } else if (Array.isArray(v)) {
        v.forEach((x, i) => walk(x, `${path}[${i}]`));
      } else if (v && typeof v === "object") {
        for (const [k, val] of Object.entries(v)) walk(val, `${path}.${k}`);
      }
    };
    walk(WATER, "WATER");
  });

  it("allSources is populated and valid", () => {
    okSources(WATER.allSources, "allSources");
  });
});
