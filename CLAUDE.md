# CLAUDE.md — town-of-paonia

## What this is

A public site at townofpaonia.co, published by Transparent Towns, demonstrating what a useful Town of Paonia website could be. It simplifies what the official site (townofpaonia.colorado.gov) offers and helps residents engage: meeting tracking with a live "happening now" join link, and a guided CORA request helper. Every page footer identifies the publisher as Transparent Towns, independent of the Town government, and links to the official site.

Transparent Towns is the publishing brand. Keep it the named author of the site so it stands on its own rather than reading as a candidate's personal project.

## Stack

Reuse the paonia-truth-feed stack: Next.js 15 App Router, React 19, Cloudflare Workers via OpenNext, Tailwind 4, brutalist Courier aesthetic. Pull config patterns from `../paonia-truth-feed` (next.config, wrangler / OpenNext, tailwind). Keep it lean: this does not need Convex or Clerk unless a feature requires it.

## Voice

Plain, helpful, resident-first. No em dashes. This is a service to citizens.
