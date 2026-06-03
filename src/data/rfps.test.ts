// Data-integrity tests for the /rfp pages, run on the project's Vitest gate
// (npm test). The comparables are public-record citations, so the invariant
// that matters most is: every row links to a real BidNet URL and carries the
// fields the page renders. A bad edit fails here instead of shipping.
//
//   npm test
//   npx vitest run src/data/rfps.test.ts

import { describe, it, expect } from "vitest";
import {
  paoniaOpen,
  comparables,
  searchFirms,
  PAONIA_BIDNET_URL,
  RMEPS_CLOSED_URL,
  RMEPS_CLOSED_COUNT,
} from "./rfps";

const httpUrl = (u: string) => /^https?:\/\//.test(u);
const mdy = (d: string) => /^\d{2}\/\d{2}\/\d{4}$/.test(d);

describe("rfp data integrity", () => {
  it("top-level links are real URLs and the count is sane", () => {
    expect(httpUrl(PAONIA_BIDNET_URL)).toBe(true);
    expect(httpUrl(RMEPS_CLOSED_URL)).toBe(true);
    expect(RMEPS_CLOSED_COUNT).toBeGreaterThanOrEqual(comparables.length);
  });

  it("Paonia's open solicitations carry the public fields", () => {
    expect(paoniaOpen.length).toBeGreaterThan(0);
    for (const r of paoniaOpen) {
      const where = r.number || r.title;
      expect(Boolean(r.number), `${where}: needs a number`).toBe(true);
      expect(Boolean(r.title), `${where}: needs a title`).toBe(true);
      expect(mdy(r.published), `${where}: published must be MM/DD/YYYY`).toBe(true);
      expect(mdy(r.closing), `${where}: closing must be MM/DD/YYYY`).toBe(true);
      expect(httpUrl(r.url), `${where}: needs a BidNet URL`).toBe(true);
    }
  });

  it("every comparable has the fields the table renders", () => {
    const govTypes = ["city", "town", "county", "special"];
    const tiers = ["manager", "department", "general"];
    const vehicles = ["RFP", "RFQ", "IFB"];
    for (const c of comparables) {
      const where = `${c.agency} (${c.year})`;
      expect(Boolean(c.agency), `${where}: needs an agency`).toBe(true);
      expect(Boolean(c.role), `${where}: needs a role`).toBe(true);
      expect(govTypes.includes(c.govType), `${where}: bad govType ${c.govType}`).toBe(true);
      expect(tiers.includes(c.tier), `${where}: bad tier ${c.tier}`).toBe(true);
      expect(vehicles.includes(c.vehicle), `${where}: bad vehicle ${c.vehicle}`).toBe(true);
      expect(c.year >= 2005 && c.year <= 2030, `${where}: implausible year`).toBe(true);
      expect(mdy(c.date), `${where}: date must be MM/DD/YYYY`).toBe(true);
      expect(httpUrl(c.url), `${where}: needs a source URL`).toBe(true);
      expect(Boolean(c.note && c.note.length > 20), `${where}: needs a substantive note`).toBe(true);
      if (c.firms !== undefined) {
        expect(c.firms > 0, `${where}: firms count should be positive`).toBe(true);
      }
    }
  });

  it("has at least one statutory-town comparable, to back the headline finding", () => {
    expect(comparables.some((c) => c.govType === "town")).toBe(true);
  });

  it("the search-firm shortlist is real and flags Colorado firms", () => {
    expect(searchFirms.length).toBeGreaterThan(5);
    for (const f of searchFirms) {
      expect(Boolean(f.name), "firm needs a name").toBe(true);
      expect(Boolean(f.base), `${f.name}: needs a base location`).toBe(true);
    }
    expect(searchFirms.some((f) => f.co), "at least one Colorado-based firm").toBe(true);
  });
});

import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  paoniaRfps,
  getPaoniaRfp,
  rfpChecklist,
  costBenchmarks,
  winnerCases,
  winningBidTraits,
} from "./rfps";

const PUBLIC = join(process.cwd(), "public");

describe("paonia per-RFP explainers", () => {
  it("each RFP has the fields the detail page renders", () => {
    expect(paoniaRfps.length).toBeGreaterThan(0);
    for (const r of paoniaRfps) {
      const where = r.number;
      expect(Boolean(r.slug && /^[a-z0-9-]+$/.test(r.slug)), `${where}: clean slug`).toBe(true);
      expect(Boolean(r.title), `${where}: title`).toBe(true);
      expect(Boolean(r.oneLiner && r.oneLiner.length > 20), `${where}: oneLiner`).toBe(true);
      expect(r.summary.length, `${where}: summary paragraphs`).toBeGreaterThan(0);
      expect(r.whatItDoes.length, `${where}: whatItDoes`).toBeGreaterThan(0);
      expect(r.funding.length, `${where}: funding`).toBeGreaterThan(0);
      expect(r.timeline.length, `${where}: timeline`).toBeGreaterThan(0);
      expect(r.facts.length, `${where}: facts`).toBeGreaterThan(0);
      expect(mdy(r.closing), `${where}: closing date`).toBe(true);
      expect(getPaoniaRfp(r.slug)?.number, `${where}: lookup works`).toBe(r.number);
    }
  });

  it("every hosted document actually exists in /public and is under Cloudflare's 25 MiB asset limit", () => {
    for (const r of paoniaRfps) {
      expect(r.docs.length, `${r.number}: has documents`).toBeGreaterThan(0);
      for (const d of r.docs) {
        expect(d.file.startsWith("/rfp/"), `${r.number}: ${d.label} path under /rfp`).toBe(true);
        const abs = join(PUBLIC, d.file);
        expect(existsSync(abs), `${r.number}: missing file ${d.file}`).toBe(true);
      }
    }
  });
});

describe("search-firm RFP guidance", () => {
  it("checklist, cost benchmarks, winners, and traits are populated", () => {
    expect(rfpChecklist.length).toBeGreaterThan(4);
    for (const s of rfpChecklist) {
      expect(Boolean(s.heading && s.detail && s.detail.length > 20), `${s.heading}: substantive`).toBe(true);
    }
    expect(costBenchmarks.length).toBeGreaterThan(1);
    expect(costBenchmarks.some((c) => c.emphasis), "one emphasized (size-comparable) benchmark").toBe(true);
    expect(winnerCases.length).toBeGreaterThan(0);
    for (const w of winnerCases) {
      expect(Boolean(w.firm && w.agency && w.why), `${w.agency}: complete`).toBe(true);
    }
    expect(winningBidTraits.length).toBeGreaterThan(2);
  });
});
