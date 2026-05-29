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

Reuses the paonia-truth-feed stack: Next.js 15 (App Router, React 19), Cloudflare Workers via OpenNext, Tailwind 4, brutalist Courier aesthetic. Not yet stood up. See `CLAUDE.md` and `specs/product-spec.md`.

## Workspace

Sibling to `../paonia-truth-feed` (facts) and `../mayor-pete` (campaign).
