# Spec — The Administrator Search ("The Job")

A public tool on **townofpaonia.co** that does the single most expensive thing a $30,000
executive-search firm does — the recruitment brochure that sells the town to the right
candidate — as a free, honest, living web page, plus a clean way for the right people to
raise their hand. Published by Transparent Towns, offered to the Town for $1 to use or
ignore, and run either way.

## The core bet: self-selection, not surveillance

Paonia just removed its Verkada facial-recognition cameras. The wrong way to recruit a
values-aligned administrator is to build software that scores, ranks, or profiles human
beings — that is the exact thing the town just fought. The right way is the opposite:
**state plainly and loudly who Paonia is, and let the right people select themselves in
and the wrong people select themselves out.** No algorithm judges anyone. The honesty does
the filtering. This is legally bulletproof, more effective than any belief-screen, and it
is the same ethic that drove the camera fight, applied to hiring.

That sentence — *"No software scores or judges anyone here. People raise their hand on
their own, and people read every reply."* — goes on the page, near the top.

## Who judges: a citizens' committee, in the open

No software decides anything, and neither does one politician. Candidates funnel to a
**citizens' committee** — a cross-section of Paonia residents — who talk to them and form the
recommendation the Board acts on. This is the human layer the research says you can never
automate (executive hiring is ~80% human judgment), done as a civic act instead of a firm's
private call. It is also what makes the whole thing legally clean: the judging is human,
visible, and accountable, not an algorithm inferring fit from someone's record.

**AI's only role in evaluation is clerical:** read a submitted resume and summarize it for the
committee, the way a paralegal preps a file. It never scores, ranks, or recommends. The
committee judges.

**The transparency payoff:** with the candidate's explicit consent, finalist conversations are
recorded and published to the town. A $30k firm does every interview behind closed doors; here
the town watches its own citizens talk to the people who want to run it. That is the single
most powerful free-vs-$30k demonstration in the whole tool, and it doubles as the
"solutions not problems" proof for the campaign — far better than any hand-maintained counter.

**Confidential by default, public by consent — and the ordering is load-bearing.** A sitting
administrator in another town cannot do a recorded, published interview early without risking
their current job. So the early stage with the committee stays private; **the trigger for
publication is advancing to interview with the Town** — because everything with the Town is
public, by definition. The candidate consents to that at intake: they acknowledge, when they
raise their hand, that *if they choose to advance to a Town interview, their application and
that conversation become public.* They know the deal going in; the operator flips the switch
only when they advance. The committee is a private civic project, not a public body, so it is
not bound by open-meetings rules — which is precisely what lets the early stage stay
confidential while the Town stage is openly public. Get the ordering backwards and you screen
out exactly the strong passive candidates the entire search exists to attract.

The committee's own membership is **open and self-nominated** — anyone in town can sign up; no
gatekeeping. Pete recruits broadly and is *not* on it.

Committee-specific guardrails (in addition to the legal list below):
- **AI summarizes, never scores.** No fit score, no ranking, no AI recommendation — a resume
  summary for human eyes, clearly labeled as such.
- **Explicit per-candidate written consent to record AND to publish**, captured before any
  recording. (Colorado is one-party-consent for recording, but publishing someone's likeness
  and words needs their consent regardless.) No consent → no recording, no publication, no
  penalty to the candidate.
- **The committee's composition is the credibility linchpin.** Given the recall and the
  mayoral run, it must read as a genuine cross-section of the town, not hand-picked allies.
  Pete should visibly *not* control who sits on it or who gets hired — that boundary is the
  whole defense against "this is a political instrument."
- **Light moderation of published conversations** so a candidate or member doesn't defame a
  third party (the former administrator, the mayor) on tape that Transparent Towns publishes.
  Keep it on the candidate and the job.

## Why this shape (and not the others)

Five strategic frames were generated and adversarially critiqued on three lenses (legal /
ethical defensibility; resident trust + free-vs-$30k clarity; buildability + real funnel
effectiveness). Average scores:

| Frame | Avg | Legal | Resident | Build+Effect |
|---|---|---|---|---|
| **The Prize Page** (recommended) | **7.7** | 6 | **9** | **8** |
| The Canvass (broadcast everywhere) | 7.3 | 7 | 8 | 7 |
| Search Firm in a Box (full ATS) | 6.7 | 6 | 7 | 7 |
| The Search in the Open (live dashboard) | 6.5 | 6 | — | 7 |
| The Values-Matching Sourcer (dossiers) | 6.3 | 6 | 6 | 7 |

The Prize Page wins because its entire public surface is **prose + one opt-in form** — zero
scoring, zero PII storage, zero ops burden — and it is the artifact residents can read and
be proud of *today*. We graft in the two best ideas from the runners-up: the Canvass's
"Where this job is posted" channel map (the real funnel), and a "behind closed doors vs. in
the open" ledger (the sharpest free-vs-$30k device). We explicitly **kill** the
named-candidate sourcer and the applicant-tracker from the public product — they detonate
the surveillance and conflict landmines the town just fought over.

## The legal reality (read this first)

These are hard guardrails, not suggestions. The work is for a **public, nonpartisan** role,
run by a **mayoral candidate** — both facts narrow what's defensible.

1. **No automated values/belief screen. No algorithmic cut.** Nothing scores, ranks, rejects,
   or profiles any human. Values alignment happens through self-selection (the page) and human
   judgment (the citizens' committee). AI may *summarize* a submitted resume for the committee
   — clerical prep, clearly labeled, never a score or a recommendation. State this on the page.
2. **The "ideal candidate" section is type-enforced.** Every entry requires a job-relevant
   professional *competency* + a *public-record basis*. No free-form identity / belief /
   lifestyle bullets — forbidden at the schema level so a reviewer catches a violation in
   the diff. This is the structural mitigation for EEOC proxy-discrimination, Colorado's
   lawful-off-duty-activity statute (**C.R.S. 24-34-402.5**), and First Amendment patronage
   doctrine (*Elrod / Branti*) for a nonpartisan ICMA-style role.
3. **Camera/surveillance language is pure historical record** — *"In [date] the Town removed
   its Verkada cameras after public concern"* — never a second-person litmus test ("if you
   believe X, wrong town") and never a loyalty requirement ("must be someone who would never
   bring it back"). Record and competence, not a political test.
4. **No LinkedIn scraping, ever.** hiQ ultimately lost (breach of contract, $500k, fake
   accounts); Proxycurl was sued and shut down in 2025. Off-site sourcing uses only licensed
   aggregators and genuinely public sources. The MVP republishes no one.
5. **No public named-candidate profiles, and no "who we screened out and why" artifact.** In
   a ~1,500-person pool, any "anonymized" rejection rationale re-identifies a real person and
   becomes a defamation + discovery magnet. Killed entirely.
6. **CAN-SPAM is baked into the outreach template** (Phase 3, off-site): accurate from-headers
   identifying Transparent Towns, non-deceptive subject, the *operator's* valid physical
   postal address (not the Town's — avoid implying sponsorship), working opt-out honored
   within 10 days, human-in-the-loop send, suppression list. Penalty is up to ~$53,088 per
   email.
7. **Prominent in-body disclosures** (not buried in the footer): (a) Pete is a mayoral
   candidate involved in the recall; (b) this is an independent demonstration, not the Town's
   official process; (c) the Board of Trustees alone authorizes and conducts the legal hire;
   (d) raising your hand here is not an application to the Town.
8. **Transparent Towns holds the intake in confidence; it is not handed to the Town as a raw
   list.** TT is a private publisher, not a government body, so its database is not a CORA
   record — which is exactly what lets you promise candidates real confidentiality, cleanly.
   The committee brings *willing, qualified* candidates forward; it does not dump everyone who
   raised a hand on the Board. State retention + a working delete contact; warn sitting-employee
   applicants. Never promise candidates privacy and the Town data-ownership at the same time.
9. **Gate the $1 bid — not the page — on a written Colorado municipal-ethics + campaign-finance
   opinion + a public recusal pledge.** The bid is the self-dealing attack surface. The page
   is defensible civic commentary. See "The $1 bid" below.
10. **Frame the cost comparison against typical published RFP scopes, never as disparagement
    of an identifiable firm.** Never name or make identifiable the firm that wins Paonia's RFP.

## The $1 bid (optional, later)

The tool gets built and run regardless of the RFP — that's decided. The $1 bid is just a
device to force the tool onto the Town's evaluation matrix when the RFP drops; it is *not* a
dependency for anything here. Park it.

One note for when you do circle back: a mayoral candidate bidding on a Town contract has a
conflict optic (possible prohibited-interest / in-kind-contribution question), so a quick
Colorado municipal-ethics read + a public recusal pledge ("if elected, I recuse from the
Board vote on the hire") would defuse it cheaply. But that's a footnote to revisit, not a
blocker. The page and the search run on their own legs.

Either way, the conflict is an asset, not a liability, if you name it: *"I'm running for
mayor — that's exactly why every name and source here is public, and the Board, not me,
decides."*

## MVP scope

| # | Feature | Pri | Effort |
|---|---|---|---|
| 1 | **Prose recruitment brochure** at `/administrator` — Why Paonia (Dark Sky, Waldorf-inspired school, organic/biodynamic ag, North Fork arts, West Elks); What this job actually is; The real challenges now (administrator resigned, trust to rebuild, the surveillance reckoning as factual record); How Paonia works (statutory town, Board of Trustees, ~1,500 people); What it pays. Real Paonia photography via Cloudflare Images so it reads as a magazine spread, not a memo. | P0 | M |
| 1b | **The citizens' committee, introduced** — who they are and how the search works; candidates funnel to residents, not to software. The legitimacy story. | P0 | S |
| 2 | **Conduct-only "Who we're looking for"** — rendered from a typed schema; each entry = `{competency, evidence}`; belief/identity bullets impossible by type. | P0 | S |
| 3 | **"Behind closed doors vs. in the open" ledger** — the 7 search phases, what a firm bills + conceals vs. what this page does in the open, with sourced conservative costs and a `replaces`/`scaffolds` honesty label per row. | P0 | M |
| 4 | **Top resident note + conflict + authority + creepy-AI pre-empt** — a short plain band near the top, not a buried sidebar. | P0 | S |
| 5 | **"Where this job is posted" channel map** — curated, source-linked, Tier-1 (firms use) vs. values-overlay (firms miss), with a `postingAuthority: official \| community` label per row. No response counts. | P1 | M |
| 6 | **Confidential "raise your hand" funnel** — a public Convex-backed form (no candidate login). Confidential by default; at intake the candidate acknowledges that advancing to a Town interview makes it public. Held by Transparent Towns, not handed to the Town. | P0 | S |
| 6b | **Open committee sign-up** — a public Convex-backed form for any resident to volunteer for the citizens' committee. No gatekeeping. | P0 | S |
| 7 | **Machine-enforced status/freshness** — `status: open \| paused \| filled` + dated stamp; a `computeStatus` helper swaps the form for a dated closed-notice when flipped. Kills the stale-page risk. | P0 | S |
| 8 | **Home card + nav link** — one quick-action card on `/` and a "The Job" link in the masthead. | P1 | S |

## Data model

Stack (confirmed): **Next.js + Convex (database) + Clerk (auth) + Cloudflare (storage/images)**.
The earlier "no DB" framing was wrong — Convex/Clerk are the house stack. The discipline is
*where* each lives, not avoiding them.

**Split editorial content from dynamic state.** Editorial copy has no reason to be in a DB and
benefits from living in the repo (versioned, reviewable in the diff — which is how the
conduct-only candidate guardrail stays auditable). Dynamic state goes in Convex.

**In the repo — `src/data/position.ts`** (a *new* convention; there's no `src/data/` yet, and
the only existing prose route is `/recall`):

```ts
// Static editorial content for /administrator — versioned, diff-reviewable.

export type IdealCandidate = {
  competency: string; // job-relevant professional competency
  evidence: string;   // the kind of PUBLIC-RECORD basis that demonstrates it
  // By design there is NO belief / identity / lifestyle field. This is the
  // C.R.S. 24-34-402.5 / EEOC-proxy / Elrod-Branti mitigation, kept in git so a
  // reviewer catches a violation in the diff — NOT in a DB an operator can edit live.
};

export type LedgerRow = {
  phase: string; firmDoes: string; weDo: string;
  coverage: "replaces" | "scaffolds";
  openArtifactUrl?: string;
};

export type Channel = {
  name: string; tier: "tier1" | "values-overlay" | "broad";
  audience: string; cost: string; postMethod: string;
  postingAuthority: "official" | "community"; liveUrl?: string;
};
// + prose sections, costSources[], and image refs (Cloudflare Images IDs).
```

**In Convex — the dynamic, operational state:**

```ts
// convex/schema.ts (sketch)
candidates: defineTable({
  name: v.string(),
  email: v.string(),
  note: v.optional(v.string()),
  resumeFileId: v.optional(v.string()),   // Cloudflare storage ref; confidential
  aiSummary: v.optional(v.string()),      // clerical resume summary for the committee
  stage: v.union(                          // human-set by the committee, not AI
    v.literal("interest"), v.literal("conversation"), v.literal("finalist"), v.literal("closed")),
  confidential: v.boolean(),               // candidate's own choice; default true
  recordConsent: v.boolean(),              // explicit, default false
  publishConsent: v.boolean(),             // explicit, default false
  createdAt: v.number(),
  // NO fit score, NO ranking. aiSummary is clerical only; the committee judges.
}),
committee: defineTable({                   // the citizens doing the judging, shown on the page
  name: v.string(), bio: v.optional(v.string()), publicMember: v.boolean(),
}),
conversations: defineTable({               // published finalist talks
  candidateId: v.id("candidates"),
  mediaFileId: v.string(),                 // Cloudflare storage; published ONLY if publishConsent
  publishedAt: v.optional(v.number()),
}),
searchStatus: defineTable({                // single row; controls the page
  status: v.union(v.literal("open"), v.literal("paused"), v.literal("filled")),
  asOf: v.number(),
  showCount: v.boolean(),                  // operator toggle for the public live count
}),
```

- **Clerk gates the operator dashboard ONLY. Candidates never log in** — auth on the
  "raise your hand" path would kill the funnel. The intake form is public and frictionless.
- **Cloudflare Images** hosts the brochure photography (Paonia night sky / Dark Sky, the
  orchards, Main Street, the school). A recruitment brochure lives on imagery; this is what
  makes the page read as a magazine spread rather than a memo.
- **The DB makes the freshness control automatic, not hand-maintained.** `searchStatus`
  flips `open → filled` from the dashboard and the page swaps the form for a dated
  closed-notice live. The optional public count (`showCount`) is a *real* number derived from
  `interests`, so it is never stale — which removes the only reason the panel had killed a
  public counter.

## The "behind closed doors vs. in the open" ledger (content)

Costs are sourced and conservative — say **"$20k–$28k and up,"** never a bare "$30k." Anchor:
Minturn, CO / KRW Associates **$19,500 all-in**; GovHR / Missouri City ~$23k; Marshalltown
~$24.5k; Raftelis / Kalamazoo ~$45k (larger city, high end).

| Phase | A firm does (billed, concealed) | This page does (in the open) | Coverage |
|---|---|---|---|
| 1. Needs assessment + candidate profile | Private council interviews → a profile you never see | The profile is the page; the criteria are public | replaces |
| 2. **Position profile / brochure** | A designed PDF, ~$8–12k of the fee, mailed and buried | **You are reading it.** Free, public, updatable | replaces |
| 3. Advertising + passive sourcing | Posts to 3–4 boards; cold-calls from a private database | Public channel map (15+); outreach human-sent, off-site | replaces ads / scaffolds sourcing |
| 4. Screening | Private scoring + a "screened out and why" report | *Deliberately not built* — re-identifies people in a small town | — |
| 5. Background / references | Vendor checks on finalists | Board's process; we don't touch it | scaffolds |
| 6. Interview facilitation | Interview kit: dossiers, questions, scoring sheets | Templates the Board can use; the Board runs it | scaffolds |
| 7. Offer / negotiation / onboarding | Salary benchmarking, relays offer, first-year goals | Public comp range; the Board negotiates | scaffolds |

Honesty about `replaces` vs. `scaffolds` is *more* persuasive than an inflated "replaces the
whole $30k" claim.

## The channel map (content)

**Tier 1 — where town administrators actually look (firms use these):**
- ICMA Job Center — national, the credentialed crowd. Paid. (post manually)
- Colorado Municipal League CareerLink — **free for member towns** (Paonia is likely a member)
- Colorado City/County Management Association (CCCMA) — CO state ICMA affiliate, small-town jobs
- ELGL — younger/innovation-minded; ~$250 unlimited; SmartJobBoard RSS/XML (best programmatic access)

**Values overlays — where the *aligned* candidates are (firms miss these):**
- DarkSky International community channels
- Strong Towns + Congress for the New Urbanism — small-town / walkability people
- USDN (Urban Sustainability Directors Network)
- Americans for the Arts job bank
- MPA programs — CU Denver, CSU

**Broad reach:** GovernmentJobs.com / NEOGOV (~$199, most traffic), Careers in Government
(~$275), Indeed (organic), LinkedIn (post-only; never scrape).

For a single hire the leverage is **broadcasting outward**, not aggregating inbound jobs. Only
SmartJobBoard-backed boards (ELGL) expose sanctioned feeds; everything else is manual post or
ToS-restricted. Per-row `postingAuthority` is honest about which Tier-1 rows are "official"
(town adopted) vs. "community-published, links to the official req" at launch.

## Site integration

The real repo state (verified): routes are `/` (home), `/recall`. Nav links to `/`,
`/cora`, `/recall`, but `/cora` and the meeting tracker are not built yet ("Coming"). The
aesthetic is **editorial newsprint** — Fraunces + Newsreader serifs, warm paper, civic-blue
+ brick-red — *not* the "brutalist Courier" that CLAUDE.md still says (CLAUDE.md is stale on
this; the brochure reads beautifully in the real system). The proven pattern to clone is
`src/app/recall/page.tsx` (prose-first, `.shell-narrow`, `.prose`, `.eyebrow`, `.byline`,
`.ed-list`, `.rule`, `.cta`).

- `/administrator` — the page (nav label **"The Job"**)
- `/` — add one quick-action card linking to `/administrator`
- `SiteHeader.tsx` — add a "The Job" link alongside Meetings, Records, The Recall
- Convex backs the intake + status from Phase 1; a Clerk-gated `/administrator/committee`
  dashboard arrives in Phase 2 (operator/committee only — candidates never log in)

A separate agent owns site design/layout, so coordinate before building so this doesn't
collide with an in-flight redesign.

## Phased roadmap

- **Phase 0 — (parallel, non-blocking) committee + legal eyeball.** Start recruiting the
  citizens' committee — its credibility is the product, so begin early and visibly broad. A
  lawyer reads the conduct-only candidate wording against C.R.S. 24-34-402.5 / *Elrod-Branti*
  and the record/publish consent form. The $1 bid's ethics question is parked.
- **Phase 1 — Ship the Prize Page + confidential intake.** `src/app/administrator/page.tsx` +
  `src/data/position.ts` + the Convex `candidates`/`searchStatus` tables + nav link + home
  card. Brochure prose with real Cloudflare-hosted Paonia photography, conduct-only candidate
  section, the citizens'-committee intro, ledger, channel map, disclosures, creepy-AI pre-empt,
  the confidential no-login "raise your hand" form, live status. Demos the whole free-vs-$30k
  thesis on day one.
- **Phase 2 — Committee dashboard (Clerk-gated).** A private workspace for the committee:
  see expressions of interest, receive resumes (Cloudflare storage), an AI *clerical* resume
  summary, and set each candidate's stage by hand. No scoring, no ranking — this is the
  legally-safe "review" step, done by people. The off-site broadcast runs in parallel:
  AI-drafted, human-edited, human-posted audience-tuned variants to the channel map, plus
  AI-drafted/human-sent CAN-SPAM-compliant outreach sourced only from licensed aggregators and
  genuinely public records (never LinkedIn scraping).
- **Phase 3 — Published finalist conversations (the transparency centerpiece).** Consent-gated
  recording + publish flow (`recordConsent` / `publishConsent`): the town watches its own
  citizens talk to the willing finalists. This is the strongest free-vs-$30k proof and the
  campaign's "solutions not problems" exhibit. Light moderation before anything goes public.

## Open questions for Pete

1. **The $1 bid:** will you get the Colorado municipal-ethics/campaign-finance opinion and
   make the public recusal pledge before submitting to BidNet?
2. **Route + nav name:** `/administrator` with nav "The Job" — confirm, or prefer `/search` /
   `/the-job`?
3. **Separation from `/recall`:** sharing an author with the recall page during the campaign
   compounds the conflict read. Cross-link them, or keep them voice/visually separate?
4. **The citizens' committee:** how are members chosen, and how do we make that visibly
   nonpartisan given the recall/mayoral context? This is the credibility linchpin.
5. **Compensation:** real sourced number, or a range labeled "proposed; the Board sets the
   actual figure"?
6. **Camera removal date:** the actual month/year the Verkada cameras came down, to state it
   as record. (The `/recall` page, as written, says two were still filming — so this needs the
   current fact.)
7. **Channel map at launch:** which Tier-1 boards (ICMA, CML, CCCMA) can you post to *now* vs.
   only after town adoption? Sets which rows are "official" vs. "community" at launch.
8. **Published conversations:** confirm the confidential-by-default → consenting-finalist-public
   ordering, and who holds the record/publish consent form (TT, with the candidate's signature).

## Sources

- KRW / Minturn CO Town Manager ($19,500 all-in) — small-CO-town comparable
- Raftelis / Kalamazoo proposal (3-phase, $45k, service guarantee, brochure samples)
- GovHR/MGT (Missouri City ~$23k; Marshalltown ~$24.5k)
- Page, AZ City Manager recruitment brochure (Duffy Group) — section structure model
- Highland, CA City Manager RFP — scope of services + "screened out and why" requirement
- hiQ v. LinkedIn (consent judgment, breach of ToS); Proxycurl shutdown 2025
- EEOC prohibited practices; SHRM on political screening; C.R.S. 24-34-402.5 (verify with counsel)
- FTC CAN-SPAM compliance guide
- ICMA Job Center; CML CareerLink; CCCMA; ELGL (SmartJobBoard RSS/XML); USDN; Strong Towns; DarkSky
