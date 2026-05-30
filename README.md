# town-of-paonia

A demonstration of what a genuinely useful Town of Paonia website could be. Public site at townofpaonia.co, published by Transparent Towns.

The site points residents to the official town site (townofpaonia.colorado.gov) and shows, by example, what a town web presence should do for the people who actually use it.

## What it does for residents

- Town meetings, made easy. Show upcoming meetings clearly. When a meeting is happening now, surface it at the top of the page with a one-click link to join and the agenda.
- CORA requests, made easy. A guided helper that walks a resident through creating a Colorado Open Records Act request to the Town.
- A simplified, human version of what is currently spread across the official site and the CivicClerk portal: agendas, minutes, contacts, key dates.

## Also serves

- Part of Pete's run for mayor, a working proof of "solutions not problems."
- A public home for the citizen administrator search (see `../mayor-pete/admin-search`).

## Footer

Every page identifies the site as published by Transparent Towns, independent of the Town government, and links to the official town site at townofpaonia.colorado.gov.

## Stack

Next.js 15 (App Router, React 19), Cloudflare Workers via OpenNext, Tailwind 4, brutalist Courier aesthetic, shared with paonia-truth-feed. See `CLAUDE.md` and `specs/product-spec.md`.

## Deploy

Live at https://townofpaonia.co (Cloudflare Workers). Every push to `main` auto-deploys via GitHub Actions (`.github/workflows/deploy.yml`). Manual deploy: `npm run deploy`. Local dev: `npm run dev`.

Currently live: the home page and `/recall`. The meeting tracker and CORA helper are next.

## Workspace

Sibling to `../paonia-truth-feed` (facts) and `../mayor-pete` (campaign).
