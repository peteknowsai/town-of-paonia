# CLAUDE.md — town-of-paonia

## What this is

A public site at townofpaonia.co, published by Transparent Towns, demonstrating what a useful Town of Paonia website could be. It simplifies what the official site (townofpaonia.colorado.gov) offers and helps residents engage: meeting tracking with a live "happening now" join link, a guided CORA request helper, and an open, public Town Administrator search at /administrator. Every page footer identifies the publisher as Transparent Towns, independent of the Town government, and links to the official site.

Transparent Towns is the publishing brand. Keep it the named author of the site so it stands on its own rather than reading as a candidate's personal project.

## Stack

Next.js 15 App Router, React 19, Cloudflare Workers via OpenNext, Tailwind 4. Config patterns came from `../paonia-truth-feed`. Push to `main` auto-deploys to townofpaonia.co via `.github/workflows/deploy.yml` (runs tests, builds OpenNext, deploys).

The aesthetic is editorial newsprint, not brutalist Courier: Fraunces + Newsreader serifs, warm paper (#f6f3ec), civic-blue (#1f3a4d), brick-red accent (#b1432a). See `src/app/globals.css`.

Convex is now in use (prod deployment `academic-elephant-432`) to persist the `/administrator` funnels. Functions live in `convex/` and deploy with `npx convex deploy`; the app calls them via the HTTP `/api/mutation` endpoint with fetch, not the Convex client (the client pulls in `node:https`, which the Workers runtime cannot load). The build needs `NEXT_PUBLIC_CONVEX_URL`. Clerk is planned for a gated admin view but not yet wired. See `specs/roadmap.md`.

## Voice

Plain, helpful, resident-first. No em dashes. This is a service to citizens.
