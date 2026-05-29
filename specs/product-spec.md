# Product Spec — town-of-paonia

## Goal

Show, by working example, what the Town of Paonia's website should do for residents. Simplify the official site's information and point to it.

## Audience

Paonia residents who want to engage with town government and find the current official site and CivicClerk portal hard to use.

## Features (v1)

### 1. Meeting tracker
- List upcoming Board of Trustees and committee meetings: date, time, agenda link, location, join link.
- "Happening now" banner: when a meeting is live, surface it at the top of the homepage with a one-click join link and the agenda.
- Source: official agendas and minutes (CivicClerk / townofpaonia.colorado.gov), kept in sync.

### 2. CORA request helper
- Guided flow that walks a resident through a Colorado Open Records Act request to the Town.
- Output: a ready-to-send request. The workspace `cora-file` pattern is a reference.

### 3. Simplified town info
- Human-readable agendas, minutes, contacts, key dates. The official content, made navigable.

### 4. Footer
- Every page identifies the site as published by Transparent Towns, independent of the Town government, and links to the official town site at townofpaonia.colorado.gov.

## Campaign ties

- A public home for the citizen administrator search (`../mayor-pete/admin-search`).
- A "solutions not problems" proof point for the mayoral run.

## Stack

Reuse paonia-truth-feed: Next.js 15, Cloudflare Workers (OpenNext), Tailwind 4, brutalist Courier.
