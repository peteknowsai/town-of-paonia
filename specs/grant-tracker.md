# Spec — Grant Tracker

## Goal

Make the flow of grant money into the Town of Paonia legible to a resident who
has no idea what is going on with town grants. Not a staff tool. Not a grant
management system. A public, plain-language window: what has the town secured,
what is moving now, and what is still on the table.

## Audience

Residents who want to understand and follow town finances but find grant money
buried inside council minutes and budget line items. They should grasp the
picture in under a minute, then be able to drill into any single grant with a
source link.

## What it answers, top to bottom

1. **Headline numbers** — total grant dollars secured, how many are active right
   now, dollars pending decision, and how many open programs the town could
   pursue.
2. **Where the money went** — received dollars broken down by category
   (water, parks, streets, historic, wildfire, etc.) as clickable bars that
   filter the list below.
3. **Happening now & pending** — grants in progress or awaiting a decision. This
   is the timely layer that matches the site's "what is the town doing right
   now" ethos.
4. **Grants secured** — the full filterable, sortable record of awards.
5. **On the table** — open or recurring programs Paonia is eligible for but has
   not necessarily applied to. A map of opportunity, clearly distinct from
   filed applications.
6. **Methodology** — how the data is compiled and sourced.

## Data model

`src/lib/grants.ts` holds typed data and all derived helpers, so page and
components stay thin.

- `Grant` — a grant the town has engaged with. Carries `amount` (numeric, for
  totals/sorting), optional `amountLabel` (for ranges/in-kind/undisclosed),
  `year`, `category`, `status`, a plain-language `purpose`, and a `source` URL.
- `Opportunity` — a program the town could pursue: `awardRange`, what it
  `funds`, why it `fits` Paonia, `cycle`/`deadline`, and a `link`.
- `GrantStatus` lifecycle: `applied` → `under-review` → `awarded` →
  `in-progress` → `completed`. "Received" = awarded/in-progress/completed;
  "pending" = applied/under-review.
- `CATEGORIES` maps each category to a label and an accent color used across
  chips, dots, and bars.
- `computeStats()` derives the headline numbers and category breakdown.

## Sourcing

Curated by hand, every figure source-linked. Primary sources: Town of Paonia
council minutes/agendas, Colorado DOLA (incl. Energy/Mineral Impact Assistance
Fund), GOCO, CDOT, History Colorado / State Historical Fund, Colorado Water
Conservation Board, USDA Rural Development, EPA, and federal award records
(USAspending.gov). It is a curated snapshot, not a live government feed.

This is deliberately a static dataset. Grants move slowly; correctness and
clear sourcing matter more than real-time sync. Updating means editing
`GRANTS` / `OPPORTUNITIES` in `src/lib/grants.ts`.

## Aesthetic

Inherits the site's newsprint-editorial system: Fraunces + Newsreader, civic
blue and brick red on warm paper. The dashboard reads like a well-set
financial page in a small-town paper, not a SaaS analytics screen.

## Future

- Resident "flag a missing or wrong grant" path (ties to the CORA helper).
- Pull candidate opportunities automatically from DOLA/GOCO feeds for staff to
  vet, surfacing them here once confirmed.
- Per-grant detail pages with timeline and document links.

## Integration note

Built in isolation (branch `worktree-grant-portal`) as a self-contained
route (`/grants`) plus `lib/grants.ts` and `components/GrantDashboard.tsx`. It
touches only those files, the header nav, and a CSS block, so it merges cleanly
into the main site build.
