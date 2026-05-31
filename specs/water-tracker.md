# Spec — Water Rebuild Tracker (`/water`)

## What it is

A public, plain-language dashboard of the Town of Paonia's water-system rebuild.
It gives a resident who is not following the issue a bird's-eye view in one
screen: the vision, where each big project stands, where the problems and wins
are, who is paying for it, and how it has tracked over time. It is a
transparency tool, not a progress-report for staff, so it cites its sources and
is explicit about how confident each fact is.

It lives at `/water` and is published by Transparent Towns, independent of the
Town government.

## Design principles

1. **Never publish an unverified number.** Every fact carries a `confidence`
   (`high` / `medium` / `low`) shown as a colored dot, and links to its source.
   Where a fact could not be verified, it is left out rather than guessed - the
   same rule the rest of this site follows. What we do not know is shown openly
   in a "What we don't know yet" section.
2. **Sourced to the Town's own record.** The backbone is the Board of Trustees'
   meeting packets and minutes, cross-checked against state/federal grant-award
   data and news. Meeting-record citations point at the Town's CivicClerk
   portal.
3. **Bold and scannable.** Status is the organizing idea: color-coded alert
   cards, a per-project stage stepper, and a grants-vs-loans funding bar.
4. **Self-contained and portable.** The feature does not depend on the rest of
   the evolving site. It ships its own data module, its own scoped CSS module,
   and its own components, so it integrates cleanly whenever the surrounding
   site settles. It deliberately does not edit `globals.css`.

## Files

| File | Role |
| --- | --- |
| `src/app/water/page.tsx` | Server component. Renders all sections, each gated on data presence. |
| `src/app/water/WaterProjectCard.tsx` | Client component. One project card: status badge, stage stepper, expandable drill-in. |
| `src/app/water/water.module.css` | Scoped styles. Reuses the global `:root` design tokens; defines its own layout + a small status-color system. |
| `src/data/water.ts` | The single source of truth. Typed data model + the `WATER` object. The page reads only from here. |
| `src/data/water.test.ts` | Data-integrity tests (Node built-in runner). Guards the invariants the page relies on, including the no-em-dash house rule. |

## Sections (in order)

1. **Header** - title, plain overview, last-updated date.
2. **The goal** - the vision band (where the rebuilt system is headed).
3. **Holistic vision, brass tacks first** - the `approachNote` band. Holds the
   tension the dashboard exists to show: a real, grant-funded whole-watershed
   strategy (the 2023 Bureau of Reclamation WaterSMART "Water Strategy," the
   CWCB-funded spring hydrogeology study, the deferred Roeber Reservoir storage
   and gravity-conveyance options) versus the narrower, urgent Phase 1 fixes
   actually being built. The honest finding: these were never rival plans; the
   engineers recommended the cheap fixes first and the town did exactly that,
   with the holistic strategy now being written (Wright Water, through 2027).
5. **Where it stands right now** - alert cards: `problem` (red), `watch`
   (amber), `success` (green), `info` (blue). Sorted problems-first.
6. **The numbers** - KPI strip (water loss %, connections, miles of main,
   rates, plant capacity, population).
7. **The big projects** - the centerpiece. Each card shows a status badge, a
   `Planning -> Design -> Funded -> Building -> Complete` stepper with the
   current stage highlighted, key meta, and a "More detail" drill-in (what it
   is, scope, why it matters, funding breakdown, sources).
8. **Where the money comes from** - a grants-vs-loans bar plus a table of every
   grant/loan with funder, amount, type, and what it funds.
9. **How it has tracked** - a dated milestone timeline.
10. **What we don't know yet** - the open questions, phrased for residents to ask
   the Town.
11. **Foot note + sources** - the data-confidence note and the full source list.

## Data model

See `src/data/water.ts` for the full typed interfaces. Top level (`WaterData`):
`vision`, `overview`, `approachNote`, `dataConfidenceNote`, `lastUpdated`, `projects[]`,
`funding[]`, `alerts[]`, `kpis[]`, `timeline[]`, `openQuestions[]`,
`allSources[]`. Project `status` is an enum
(`planning | design | funded | bidding | construction | substantially-complete | complete | stalled | unknown`)
that the card maps onto the 5-node stepper.

## How the data was sourced (ingestion pipeline)

The official site (`townofpaonia.colorado.gov`) blocks automated fetches and the
meeting portal is a JavaScript app, so neither is directly readable. The data
was instead pulled from CivicClerk's public OData API that backs the portal:

- **Events**: `https://paoniaco.api.civicclerk.com/v1/Events`
  - Filter by `categoryName eq 'Town Board'` and a `startDateTime` window.
  - Paginate with the `@odata.nextLink` (`$skiptoken`).
  - Each event embeds a `publishedFiles` array with `fileId`, `type`
    (`Agenda` / `Agenda Packet` / `Minutes`), and a PDF `url`.
- **Document text**:
  `https://paoniaco.api.civicclerk.com/v1/Meetings/GetMeetingFileStream(fileId={id},plainText=false)`
  returns the PDF. (`plainText=true` is generated lazily and is often empty, so
  download the PDF and run `pdftotext`.)

Pipeline (scripts live in the job's tmp dir, not the repo):
1. Enumerate all Town Board meetings in the window; inventory their documents.
2. Download every Minutes + Agenda Packet PDF; extract text with `pdftotext`.
3. Keyword-scan each for water relevance to focus the deep read.
4. Fan out one reader per water-relevant document to extract sourced facts with
   verbatim quotes and the meeting date.
5. Consolidate findings into discrete claims across the timeline; cross-check
   against a parallel web sweep of grant-award lists (DOLA, USDA Rural
   Development, CWRPDA) and news.
6. Adversarially verify every material claim (dollar amounts, dates, statuses)
   against the source documents.
7. Synthesize the verified facts into the `WaterData` shape.

## Tests

`src/data/water.test.ts` runs on Node's built-in test runner with native
TypeScript support (Node 22+, which the project's CI already uses):

```
node --test src/data/water.test.ts
```

It checks that every project, funding row, alert, and KPI carries at least one
real source URL, that all status/kind/confidence values are in range, that
`relatedProject` references resolve, that `percentComplete` stays 0-100 or null,
and that no em or en dashes slip into the copy (the site's house style). A bad
data edit fails here instead of shipping. `npx tsc --noEmit` and `next build`
are the other gates.

## Updating

When the Town publishes new packets/minutes or a new grant is awarded, update
`src/data/water.ts`. Re-running the ingestion pipeline against a newer date
window regenerates the data. Bump `lastUpdated`. Keep the confidence honest:
demote anything you cannot re-confirm.

## Integration note (for the surrounding site)

The page is reachable at `/water` but is not yet linked from the nav, because
the site's header is being rebuilt in parallel. To surface it, add one line to
the nav in `src/components/SiteHeader.tsx`:

```tsx
<Link href="/water">Water</Link>
```

and optionally a quick-action card on the homepage. The footer's publisher
notice already applies site-wide, so no footer change is needed.
