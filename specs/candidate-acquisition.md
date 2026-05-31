# Candidate Acquisition — Active Sourcing Strategy

*Spec for `specs/candidate-acquisition.md`. Publisher: Transparent Towns (independent). Companion to `specs/admin-search.md` (the public Prize Page + citizens' committee). This doc owns the OUTBOUND half of the funnel: finding and inviting values-aligned town administrators to look at Paonia. It is operator-run and off-site by design — nothing here adds a public dossier, score, or named-candidate surface to townofpaonia.co.*

---

## 1. The thesis

The Prize Page (`/administrator`) is a magnet: it states plainly who Paonia is and lets the right people select themselves in. Magnets are necessary but not sufficient. The strongest candidate for a 1,500-person town is a sitting administrator three valleys over who is quietly tired of fighting their own board about a surveillance contract — and who will never go looking for a job in Paonia, because they aren't looking for a job at all. A magnet does not reach passive candidates. **Active sourcing does.** This strategy is the reach the magnet can't generate on its own.

Active sourcing complements — never replaces — the two human layers the Prize Page spec is built around:

- **Outreach → Prize Page.** Every invitation's only call to action is "go read this page." The email does not screen, does not pitch a private process, does not ask for a resume. It points a well-chosen person at the public brochure and lets the page do the selling and the self-selection. The Prize Page is the destination; outreach is one of the roads to it (the others being the public channel-map postings).
- **Sourcing ≠ judging.** The citizens' committee judges. This pipeline decides only *whom to invite to look* — a benefit conferred, never an adverse action. No part of this system advances, ranks, or rejects a human. It puts a page in front of someone and stops.

**The legal asymmetry that makes this work** (and the line the whole doc defends): values-informed *screening* is dangerous; values-informed *invitation* is not. Title VII / EEOC liability attaches to adverse actions in selection — refusing to hire, rejecting, screening out. An invitation withholds nothing from anyone, so the disparate-treatment and disparate-impact theories that haunt belief-screening mostly don't reach it. **But the shield is conditional, not free.** The EEOC does police recruitment that disproportionately limits opportunity by protected class (its national-origin and race guidance warns that selectively-targeted and word-of-mouth recruiting can violate Title VII if the *result* skews a protected group out of the pool). So the shield holds **only as long as the targeting key is documented, job-relevant professional conduct** — surveillance/procurement decisions, ordinances staffed, budgets balanced, talks given — and never a protected-class proxy or imputed belief. That is the same "job-related and consistent with business necessity" standard that *defends* a selection criterion, applied at the much easier outreach stage. Get the key right and outreach is defensible. Let "alignment" drift into a stand-in for age/politics/religion and the shield collapses.

There is an on-brand irony worth naming, because it is also a design constraint: **we are recruiting against surveillance by refusing to surveil.** The whole alignment signal is "Paonia removed its facial-recognition cameras." A pipeline that builds identity dossiers, scores humans, or scrapes private profiles to do that recruiting would be exactly the thing the town just fought — and would hand every critic the headline. The guardrails in §5 are not compliance boilerplate; they are the product being consistent with itself.

---

## 2. Phase A — The Colorado sweep

Colorado first: cultural match (mountain/resort/Western-Slope towns face Paonia's exact growth-vs-soul tensions), short list (273 municipalities), lowest legal risk (one CAN-SPAM regime, public .gov records), and the warmest network (CCCMA/CML). Get the machine working on home turf before national.

### 2A. Build the administrator contact list (the spine + the email layer)

There is **no single source that gives every Colorado administrator with an email.** The build is two layers, and the second is 70% of the effort.

**Layer 1 — The spine (1 day). CML Municipal Directory PDF.**
`https://www.cml.org/docs/default-source/municipal-directory/cml-municipal-directory-2025.pdf` — free, no login, 317 pages, parseable. One `pdftotext` + regex pass yields all 271 member municipalities × `{muni, type (statutory/home-rule), county, CML district, phone, mailing address, official website, full named roster with exact titles}`. Entries are regular; the parser is robust in a day. This alone gets the correct *person and title* for the manager / administrator / clerk in every town.

Reality of the pool: ~273 munis total; **~114 list a Town/City Manager, ~39 a Town/City Administrator, ~166 a Clerk.** Roughly **150 munis (~55%) employ a manager or administrator**; the smallest ~120 run on a clerk (often part-time) — for those, the clerk *is* the contact. Paonia itself uses "Town Administrator." So the realistic Colorado target universe is **~150 manager/administrator records, plus a long tail of clerk-run towns** worth a lighter touch.

**Layer 2 — The email layer (3–5 days, load-bearing, maintenance-heavy). Per-town .gov websites.**
CML and DOLA publish names but **zero emails** (verified: no "@" across all 317 PDF pages). Emails live on each town's own Staff/Contact/Departments page — public government records, the project's premise. CML lists ~235 official site URLs. Build a polite, throttled scraper that, per muni, fetches the official site and extracts the email for the CML-named person; where none is published, derive the likely address from the domain pattern (`firstinitiallastname@townofX.gov`, `clerk@X.org`) and verify at send time (MX/SMTP probe), never blast unverified. Expect to hand-resolve a long tail of ~40–60 idiosyncratic small-town sites. **Cross-check against DOLA LGIS** (`https://dola.colorado.gov/dlg_lgis_ui_pu/`) — the authoritative filing-based system, JS-rendered, scrape-per-entity (no bulk export), where clerk/finance emails sometimes surface that CML lacks. Throttle and stay polite: LGIS's terms discourage aggressive automation.

**The warm overlay (do not scrape). CCCMA** (`coloradoccma.org/member-directory/`) is the highest-conversion segment — credentialed, mobility-minded managers — but it's login-gated (members only). Two legitimate plays, no scraping: (a) join CCCMA, or have an in-Colorado ally who's a member, to access the directory *for research*; (b) post the opening through CCCMA/CML job channels (the sanctioned way to reach this exact audience). Pair with the **ICMA Senior Advisor Program** (§3) for warm Colorado/Mountain-West name suggestions.

**Skip:** SOS (charters only), SDA (special districts, not munis), data.colorado.gov / Socrata (no CO municipal-officials dataset — verified, only cross-state noise).

**Maintenance:** refresh the CML spine annually (new PDF each October); re-verify emails quarterly. Small-town administrator churn is high — and that churn is itself the recruiting opportunity, so quarterly re-verification doubles as a fresh-lead scan.

### 2B. Record-based alignment evaluation (to PRIORITIZE invitations, never to reject)

This is the layer between "list of every administrator" and "send the invite." Its only job: **decide who is worth inviting first.** It produces a sort order, not a verdict on a human.

**The one rule that governs everything: evaluate conduct in office, not the person.** Every signal must trace to a documented professional act — a procurement decision, an ordinance staffed, a budget balanced, a talk given under a professional name. If a signal can only be inferred from who someone *is* (age, race, religion, perceived politics, where they live, "seems like"), it does not enter the system. This is both the ethical line and the legal one.

**The rubric — six signal families.** Each maps a Paonia value to job-relevant professional conduct. Signals are *flags for a human*, not points that gate anyone.

| # | Family | Counts (flags toward invite) | Does NOT count (never recorded) | Proof lives |
|---|---|---|---|---|
| **1** | **Surveillance & tech-procurement judgment** *(weighted highest — Paonia's defining recent issue)* | Declined / removed / sunset a facial-recognition / ALPR / cloud-surveillance system; staffed a surveillance-tech ordinance or CCOPS / vendor-vetting policy; ran privacy review *before* a tech buy; caught a vendor's data-ethics record in procurement (the due diligence Paonia's prior board skipped on Verkada's $2.95M FTC settlement); built data-retention/minimization policy | Personal views on policing or politics; party, donations, social posts; whether they "seem civil-libertarian" | Council minutes & agenda packets, staff procurement memos, RFP records, local news, GovTech/StateScoop, EFF Atlas of Surveillance |
| **2** | **Dark-sky & sensible land-use** | Passed/staffed an outdoor-lighting or dark-sky ordinance; DarkSky community-certification work; form-based code, scale/ridgeline/viewshed protection; resisted sprawl *through code* | Aesthetic preferences absent any official action | Municipal code (Municode / American Legal), DarkSky certified-places list, planning minutes, APA awards |
| **3** | **Agriculture, farmland & local food** | Established/funded a farmers market; farmland easements, ag-zoning, right-to-farm; agritourism / winery / cidery / value-added-ag licensing; water-rights stewardship for irrigated ag | Personal diet or hobby-farming | Budgets, econ-dev plans, code, USDA/state-ag grants, local-food coverage |
| **4** | **Arts, music & creative placemaking** | Funded public art / arts commission / creative-district designation; backed a festival fiscally; NEA "Our Town" or state creative-placemaking grants; adaptive reuse for cultural use | Personal taste in art/music | Budgets, CO Creative Industries district list, NEA grant DB, festival permits, arts-commission minutes |
| **5** | **Fiscal stewardship & transparency** | Clean audits, GFOA awards; balanced budgets / rebuilt reserves in a small jurisdiction; open-checkbook / public dashboard; competitive grants that stretched a small budget; documented public procurement process | — | ACFRs/audits, GFOA award lists, state-auditor filings, budgets, transparency portals |
| **6** | **Small-town fit & longevity** *(necessary context, not sufficient)* | Track record in small/rural (<~10k) jurisdictions; multi-year tenure (stability is job-relevant); lean-org / many-hats experience; open-meeting / engagement culture | Marital/family status, "rootedness," lifestyle inferences | ICMA tenure data, town sites, news archives, conference bios |

**Tier logic (for the human, not a score):**
- **Strong flag for review:** any documented **Family 1** signal, OR **two or more** signals across other families. Family 1 is weighted because surveillance/procurement judgment is Paonia's sharpest, most current alignment signal.
- **Worth a look:** one solid signal in Families 2–5 plus small-town fit (Family 6).
- **Not now:** no documented job-relevant signal found. This is **"we didn't find a reason to invite yet," never "rejected."** The system has no reject state.

**Where the signals live & how to gather them legitimately** (Tier-A primary, Tier-B corroborating): council minutes & agenda packets (Granicus/CivicPlus/PrimeGov portals; CORA/OML-public by law — reuse the town's existing CORA helper for volume), municipal codes (Municode / American Legal, full-text searchable for "dark sky," "surveillance," "right to farm," "creative district"), budgets/ACFRs/audits, GFOA award lists. Corroborate with regional news (Delta County Independent, High Country Spotlight, KVNF, Colorado Sun), ICMA public speaker/conference bios, grant databases (NEA, USDA, CO Creative Industries, DOLA), DarkSky and APA award lists. **Honor robots.txt and ToS. No LinkedIn scraping, full stop. No protected-class data, ever. Cache the citation, not just the conclusion** — every flag stores `{source_url, source_date, quoted_passage}` so a human can verify it and the record shows the basis was a public professional act.

### 2C. The AI-clerical-summary + human-approve workflow

**The LLM is a research clerk and highlighter — never a judge.** This is the same clerical posture the Prize Page spec mandates for resume summaries, applied to sourcing research.

It **may**: read a minutes PDF / news article / budget and *extract* candidate signals; *quote and cite* the exact passage and source; *tag* which rubric family a passage maps to; *draft a neutral summary* for a human; *surface uncertainty* ("ambiguous whether the administrator drove this or the council did").

It **must not**: output a numeric alignment score that auto-sorts people into invite/no-invite; auto-send any email or auto-advance any candidate; infer or guess protected characteristics; infer beliefs from acts ("removed cameras, so probably progressive" — forbidden; record the act, not the imputed belief); treat absence of evidence as a negative signal about a person.

**The enforced workflow (human-in-the-loop, structural):**
1. LLM produces a **candidate dossier**: name, jurisdiction, public .gov email, and a list of *cited* signal-passages with family tags and a plain-language summary.
2. The dossier carries a **mandatory `human_decision` field, null until a person sets it.** No downstream send can read a null. The data model makes a non-reviewed dossier **un-sendable by construction** (see §4).
3. A human reads the citations, confirms or rejects each signal, decides **invite / hold / pass**, and the reasoning is logged.
4. Only after a human marks "invite" does a candidate enter the outreach queue — and **the send itself is a second human gate**. A "draft all" button is fine; a "send all without review" button must not exist.

### 2D. CAN-SPAM-compliant outreach

The invitations are commercial-adjacent solicitation; comply fully as if commercial — it's cheap and removes all ambiguity. (A genuine 1:1 recruiting note to a public official arguably reads as relationship/transactional, which would relax some rules — **do not rely on that.**)

- **Accurate From / headers, non-deceptive subject** — e.g. `From: Transparent Towns <recruiting@mail.townofpaonia.co>`, subject states the real purpose ("Invitation: look at Paonia's Town Administrator opening"). No "RE:" tricks, no fake urgency.
- **Valid physical postal address in every message — the OPERATOR's** (real street, registered PO box, or CMRA mailbox). The operator is the sender; **do not use the Town's address** — that would imply Town sponsorship (see §5).
- **Clear, working opt-out**, honored within **10 business days** (we honor instantly), opt-out live ≥30 days (we keep it live permanently); maintain a **suppression list**, never re-mail an opt-out.
- **Email administrators at their public .gov work addresses** — these are public-records contact points for public officials. Appropriate and clean.
- **Penalty exposure is real: up to ~$53,088 per non-compliant email** (FTC's current inflation-adjusted max, set Jan 2025, in effect through 2026). Per-email multiplication is what makes sloppiness catastrophic at scale — treat compliance as structural, not best-effort.

---

## 3. Phase B — National small-town expansion

Once the Colorado machine works, the same engine widens. The people who fit Paonia cluster in a small number of networks. Ranked by fit; post jobs where allowed, direct-email only public .gov addresses, CAN-SPAM throughout, no LinkedIn scraping anywhere.

**Tier 1 — highest fit, reach first**

1. **ICMA — small-community/rural network + Job Center.** The strongest single channel: 4,000+ ICMA members work in communities under 50,000, with a dedicated "Small Towns, Rural Communities and Sustainability" program. **Post the recruitment on the Job Center, Category 1 (CAO-equivalent — the right category for a Town Administrator)**; Category 1 posts renew free for the same recruitment, run 60 days, and auto-include in the *Leadership Matters* newsletter. Upgrade to "Featured Job" for the launch window. **Source without posting** from the public monthly "Members Recommended to Receive Credential" lists (active, ethics-bound managers you can research and invite). Confirm exact pricing on the page (figures are images; first price change since 2012 took effect May 1, 2026) or via `advertising@icma.org`. No public API; member directory gated — honor that.
2. **ICMA Senior Advisor Program — the warm-intro engine.** 114 retired-CAO volunteers across 30 states who *individually identify and advise candidates* for small communities that don't use a search firm. Highest-leverage relationship channel. Reach the Colorado/Mountain-West advisor via CCCMA/CML, pitch Paonia's profile, ask for names. Free.
3. **ICMA Local Government Management Fellowship (LGMF) — the rural-aspirant pipeline.** Early-career NASPAA-MPA grads who self-select by small-town size and Mountain-West region; 19 alumni have become city/town/county managers. Ask LGMF staff for alumni who flagged small-town/rural/Mountain-West preferences and invite them; or become a host org (carries a stipend obligation). Sourcing alumni is free.
4. **State municipal leagues + state city/county management associations — the scalable national backbone.** Every state has both; the management associations are the better target (their members *are* the administrators) and most run their own job boards/newsletters. Scrape the **NLC public state-league table once** (`nlc.org/membership/state-municipal-leagues/` — 49 rows of public exec-director contacts), pair with the **ICMA state-affiliate directory**, and email each association a short "help us reach your members about Paonia + please circulate" note. No bulk-send tool/API exists; this is per-association email.
5. **Mountain/resort-town manager world.** Direct cultural match — CML/CCCMA members include Crested Butte, Telluride, Breckenridge, Vail, Aspen (managers already navigating tourism, character preservation, growth-vs-soul). Post on CCCMA/CML channels; get a note into CML District meetings for the West Elk / North Fork corridor. National analogs: UT, MT, NM, WY state management associations.

**Tier 2 — high values-fit, smaller/less direct pools**

6. **ELGL (Engaging Local Government Leaders).** The reform-minded, next-generation crowd — culturally the likeliest non-ICMA pool drawn to a dark-sky/anti-surveillance/arts town. Job board free for members (`elgljobs.com`); leverage their Slack/newsletter and #ELGLPopUps for sourcing. (ELGL is the one board the Prize Page channel-map already flags as having sanctioned SmartJobBoard RSS/XML feeds — the only programmatic-access option.)
7. **DarkSky International — policy-active members.** Precision filter for Paonia's named dark-sky value: 4,000+ Advocates, 100+ Delegates. The subset that matters is people who *drove lighting ordinances in local government* — job-relevant conduct, the legitimate targeting basis. Join the Advocates Slack, contact the Director of Engagement, look at Colorado/Mountain-West chapters. Sourcing, not posting.
8. **Strong Towns + Congress for the New Urbanism (CNU).** Incremental, human-scale, anti-sprawl ethos maps onto small-town-character preservation. Use Strong Towns' Local Conversations map for the Western Slope group; join CNU for member-DB access by discipline/region.
9. **USDN (Urban Sustainability Directors Network).** Good values match but *urban/larger-jurisdiction* by name and gated to sustainability directors (not town administrators). Secondary individual-sourcing pool only — can't easily post a town-admin job there.

**Tier 3 — niche signal sources + recruiter/board infrastructure**

10. **MPA program career offices that feed rural/small-town local gov** — KU (premier US city-management MPA), UNC Chapel Hill (School of Government), plus rural-pipeline programs (East Carolina, Morehead State, Nebraska–Omaha, Northern Kentucky) and BYU (Mountain-West). Email each MPA career office + ICMA student-chapter advisor; ask to circulate to small-town/Mountain-West-interested alumni. Free, early-career.
11. **SGR (Strategic Government Resources)** — #2 local-gov job board (2,000+ listings), "servant leadership" framing; broad, less values-filtered. Post the recruitment; SGR/GovHR also run small-town executive search if a recruiter is ever wanted. Paid.
12. **Americans for the Arts** — weakest/niche; use only to surface candidates who blend municipal management with arts/culture leadership, or to advertise the "arts town" angle. Paid Job Bank.

**National execution sequence:** (1) post on ICMA Job Center Cat-1 + ELGL + SGR, ICMA Featured for launch; (2) activate ICMA Senior Advisors + CCCMA/CML for warm names; (3) run the state-leagues + management-associations bulk outreach; (4) precision-source from DarkSky, Strong Towns/CNU, LGMF alumni, rural-feeder MPAs; (5) treat USDN + Americans for the Arts as secondary individual-sourcing pools.

**One legal caution before national:** a few states have stricter mini-CAN-SPAM / anti-solicitation rules, and individual jurisdictions' .gov acceptable-use policies vary. Quick per-state check before the national phase; Colorado-only Phase A is low-risk.

---

## 4. The tooling (Next / Convex / Cloudflare)

**Recommendation: Resend via the official `@convex-dev/resend` component.** Best fit for the house stack — it runs *inside* Convex as a durable workpool (queueing, batching, rate-limiting, exactly-once idempotency, retries, back-pressure), ships a webhook handler that writes delivery/bounce/complaint events straight into Convex tables, and integrates with React Email. SES-grade deliverability without operating SES's bounce/complaint plumbing. SES is the fallback only if volume ever explodes (it won't — hundreds/month).

**Repo reality (verified, May 2026):** the app is Next.js 15 + OpenNext/Cloudflare; the existing intake forms (`src/components/InterestForm.tsx`, `CommitteeForm.tsx`) post to plain Next.js API routes (`src/app/api/interest/route.ts`, `api/committee/route.ts`). **Convex and Clerk are not yet installed** — they're net-new adds for this work (and for Prize Page Phase 1/2). Editorial content already follows the `src/data/position.ts` convention. Plan for the Convex/Clerk introduction as part of this build, not as an existing given.

**Where each piece lives:**

- **The LLM call lives in a Convex `internalAction`** (actions can do network/secret calls; queries/mutations can't). The action holds the model API key as a Convex env var (never shipped to the browser), reads a candidate's stored research, drafts a per-recipient `draftSubject` + `draftBody` + the `factUsed` it cited, and writes a row with status `NEEDS_REVIEW`. Cloudflare doesn't block this — Resend is just HTTPS; the email logic is in Convex, not the Worker.
- **Personalization is grounded, not free-form.** The model gets only structured, job-relevant fields and must reference **exactly one** `alignmentSignal` by name, tie it to one Paonia value, ~120–160 words, plain voice, no em dashes, sign as Transparent Towns, **invent nothing**. Output includes `factUsed`, which must be one of the inputs. A hallucinated "I admired your work on [thing that isn't real]" to a public official is both a credibility disaster and a spam-filter trip — the review UI shows `factUsed` next to its `source_url` so the operator verifies the claim before sending.
- **The human gate is a Clerk-gated Next.js admin route** (`/admin/outreach`, operator-only). Per draft it shows recipient + verified .gov address, subject/body, `factUsed` with clickable source, tier suggestion, and **Approve / Edit / Reject**. Approve stamps `approvedBy` (Clerk user id) + `approvedAt` — the audit trail proving human-in-the-loop on every send. Only `APPROVED` rows can be enqueued.
- **The state machine** (Convex `outreach` table): `DRAFTING → NEEDS_REVIEW → APPROVED → QUEUED → SENT → {DELIVERED | BOUNCED | COMPLAINED | REPLIED}`, with `↘ SUPPRESSED` (opt-out / bounce / complaint — never re-enters).

**Data model (makes the guardrails structural, not aspirational):**

```ts
// convex/schema.ts (sketch)
candidates: defineTable({
  name: v.string(), jurisdiction: v.string(), state: v.string(),
  publicGovEmail: v.string(),
  signals: v.array(v.object({                         // citations mandatory
    family: v.string(), sourceUrl: v.string(),
    sourceDate: v.string(), quotedPassage: v.string(), llmSummary: v.string(),
  })),
  llmTierSuggestion: v.optional(v.string()),          // advisory only — never gates a send
  humanDecision: v.union(v.null(),                    // null = un-sendable BY CONSTRUCTION
    v.literal("invite"), v.literal("hold"), v.literal("pass")),
  humanReasoner: v.optional(v.string()),
  humanDecidedAt: v.optional(v.number()),
  // FORBIDDEN by schema — never add: age, race, religion, sex,
  //   nationalOrigin, disability, party, donations, inferredBeliefs
}),
outreach: defineTable({
  candidateId: v.id("candidates"),
  status: v.string(),                                 // the state machine above
  draftSubject: v.optional(v.string()), draftBody: v.optional(v.string()),
  factUsed: v.optional(v.string()),
  draftModel: v.optional(v.string()), draftPromptVersion: v.optional(v.string()),
  approvedBy: v.optional(v.string()), approvedAt: v.optional(v.number()),
  postalAddressVersion: v.optional(v.string()), templateVersion: v.optional(v.string()),
  sentAt: v.optional(v.number()),
}),
suppressions: defineTable({
  email: v.string(),
  reason: v.union(v.literal("unsubscribe"), v.literal("bounce"),
                  v.literal("complaint"), v.literal("manual")),
  createdAt: v.number(),
}).index("by_email", ["email"]),
// + the component's own emails / deliveryEvents tables
```

**CAN-SPAM enforced in code, at enqueue time** (a non-compliant send becomes structurally impossible):
- The enqueue mutation **throws if the recipient is in `suppressions`.** A hard bounce or `email.complained` webhook event **auto-inserts a suppression.** "We kept emailing someone who unsubscribed" is impossible by construction.
- The **operator's physical postal address** is injected in the template footer, not editable by the LLM.
- **One-click opt-out** via both the `List-Unsubscribe` / `List-Unsubscribe-Post` headers and a visible footer link, pointing to a public Convex HTTP endpoint (`convex/http.ts` GET/POST `/unsubscribe`, signed per-recipient token, no login, idempotent, live permanently). Honoring is instant.
- **Audit log** on every send: `sentAt`, `approvedBy`, `factUsed`, `templateVersion`, `postalAddressVersion`.

**Deliverability (where you actually win or lose the .gov inbox — Proofpoint/Mimecast/M365 Defender are common in muni IT):**
- Send from a **dedicated subdomain** `mail.townofpaonia.co` (isolates outreach reputation from the main site). Add **SPF + DKIM + DMARC** at Cloudflare (same zone). DKIM is non-negotiable (M365 won't enable it for custom domains by default; authenticated mail sees ~85–95% inbox vs sub-50%). Start DMARC `p=none`, collect reports, move to `p=quarantine`.
- **Warm up and pace.** New subdomain = zero reputation. ~10–20/day week one, double weekly, conservative per-day cap on top of the workpool. **Drip, don't blast** — spread across Mountain-time business hours; 300 emails at 9:00:00am looks like a cannon. Stop and investigate if bounce >3–5% or any complaint lands.
- **Plain, text-forward HTML.** Minimal images, no link shorteners, few links (the unsubscribe + the one Prize Page link). Real personalization is itself the best spam-filter defense.

**Tracking — deliberately not creepy (this is on-brand and load-bearing):**
- **No open-tracking pixel.** Turn it off. Using a tracking pixel on a "we removed our surveillance cameras" pitch — aimed at the exact people you're recruiting *because* they're anti-surveillance — is self-defeating and hypocritical. (Apple Mail Privacy Protection made open data garbage anyway.)
- **Track only server-side, aggregate signals:** delivery/bounce/complaint from webhooks (drives suppression), and **replies as the real conversion metric** — route `Reply-To` to an operator inbox, flag the row `REPLIED` by hand. Reply rate is the KPI, not open rate. If you want page-visit signal, a plain `?ref=outreach` UTM measured as aggregate traffic — never per-recipient click pixels.

**Build order:** (1) add `@convex-dev/resend`; define `candidates`/`outreach`/`suppressions` + component tables. (2) Cloudflare DNS: `mail.` subdomain + SPF/DKIM, DMARC `p=none`. (3) `convex/http.ts`: mount `/resend-webhook` (set `RESEND_WEBHOOK_SECRET`) and `/unsubscribe`. (4) Convex action: LLM drafting → grounded `NEEDS_REVIEW` rows. (5) Clerk-gated `/admin/outreach` review UI. (6) Enqueue mutation: suppression check + postal footer + `List-Unsubscribe` header + `resend.sendEmail`. (7) Disable open tracking; wire bounce/complaint → auto-suppress; set per-day cap + warmup. (8) Track replies in the operator inbox.

---

## 5. The hard guardrails

Not suggestions. These are what make the legal theory in §1 *true* rather than aspirational. They also align exactly with the Prize Page spec's legal list (`specs/admin-search.md` §"The legal reality").

1. **Targeting key = documented job-relevant professional CONDUCT only** (surveillance/procurement decisions, ordinances staffed, budgets balanced, talks given). Never belief, identity, politics, or a protected-class proxy. The moment "alignment" becomes a stand-in for age/race/religion/national-origin/politics, the outreach shield collapses and we're back in disparate-impact land.
2. **No protected-class data — collected, inferred, or stored — ever.** The schema *forbids* age/race/religion/sex/national-origin/disability/party/donations/inferred-beliefs fields. Record *that an administrator removed cameras*, never *that they hold civil-libertarian beliefs* — conduct is the record; belief is the forbidden inference. (Refusing to build a surveillance-style identity dossier is itself on-brand.)
3. **Invitation only — there is no reject state.** Absence of a flag means "no public reason to invite *yet*," not an adverse finding. The system confers a benefit and withholds nothing. The actual hire is the Board of Trustees' lawful, open process; this tool only widens the inbound pool.
4. **Human-in-the-loop on every flag and every send**, logged, with the cited public-record basis attached. The LLM stays clerical (extract, quote, cite, tag, summarize, flag uncertainty) — it never scores-to-auto-sort, never auto-sends, never auto-advances.
5. **CAN-SPAM, full compliance** (§2D / §4): accurate headers, non-deceptive subject, operator's valid physical postal address, working one-click opt-out honored within 10 days, permanent suppression list. ~$53,088/email exposure — structural enforcement at enqueue time, not best-effort.
6. **No LinkedIn scraping, full stop.** *hiQ*'s CFAA point favored scrapers but LinkedIn won on contract/unfair-competition on remand and sued Proxycurl into shutdown in 2025. Use ICMA bios, town .gov pages, public records, CORA, licensed aggregators — genuine public sources only. Honor robots.txt and ToS; throttle; don't bypass logins (CCCMA, LGIS).
7. **Outreach uses the OPERATOR's identity and address, not the Town's.** From-line is Transparent Towns / the operator; the physical postal address is the operator's; the email points to the *independent* Prize Page and discloses that this is an independent demonstration, not the Town's official process. Using the Town's name/address would falsely imply Town sponsorship — the exact conflict the Prize Page spec works to defuse given Pete's mayoral run and the recall.

A note for counsel, consistent with the Prize Page spec: the conduct-only targeting is also the structural mitigation for Colorado's lawful-off-duty-activity statute (**C.R.S. 24-34-402.5**) and First Amendment patronage doctrine (*Elrod/Branti*) for a nonpartisan ICMA-style role. Same discipline, outbound side.

---

## 6. Week-one sprint — first batch of Colorado invitations

The goal of week one is a **small, hand-verified first batch** out the door — not the whole 150-town list. Prove the pipeline and the deliverability on a dozen, then scale.

- **Day 1 — Spine.** Parse the CML 2025 PDF → a clean table of all ~271 munis with the named manager/administrator (and clerk) per town. Confirm the ~150 manager/administrator records that are the real target universe.
- **Day 1 (parallel) — Domain + DNS.** Stand up `mail.townofpaonia.co` at Cloudflare with SPF + DKIM + DMARC `p=none`. This needs to propagate and warm, so it starts day one regardless of where the code is.
- **Days 2–4 — Email layer.** Build the throttled per-town scraper (official site staff/contact pages, CML URLs), DOLA LGIS cross-check, domain-pattern fallback with send-time MX/SMTP verification. Accept a hand-resolved long tail. Target: **verified emails for the first ~30–40 manager/administrator towns** (not all 150 — enough to source a first batch).
- **Days 2–4 (parallel) — Plumbing.** Install Convex + Clerk; add the `@convex-dev/resend` component and the `candidates`/`outreach`/`suppressions` schema; mount `/resend-webhook` and `/unsubscribe`; wire auto-suppress on bounce/complaint; disable open tracking; set a conservative per-day cap.
- **Days 4–5 — Evaluate + draft a dozen.** Run the LLM clerk over the first ~30–40, producing cited dossiers tagged to the six families. Hand-pick the **~10–15 strongest Family-1 / multi-signal flags** as the first batch. The action drafts grounded `NEEDS_REVIEW` invitations (one cited fact each, pointing to `/administrator`).
- **Day 5 — Human gate + first send.** In `/admin/outreach`, the operator reads each draft, verifies `factUsed` against its source link, edits/approves. Approved rows enqueue; the workpool drips them across Mountain-time business hours under the warmup cap. **Watch deliverability** — bounces auto-suppress, replies route to the operator inbox.

Honest effort/risk: the email-resolution scraper is the load-bearing, maintenance-heavy piece (and where week one can slip — budget the long tail). Convex/Clerk being net-new means the plumbing day has real setup cost. Deliverability from a cold subdomain is the other risk — which is exactly why DNS and warmup start on day one and the first batch is a dozen, not a hundred.

---

## 7. How this feeds the funnel

Active sourcing is the top of a funnel whose every downstream stage is already specified in `specs/admin-search.md`. The clean handoff:

```
Outreach (operator, off-site, this doc)
   → invitation email, one CTA: "read this page"
        → Prize Page  /administrator  (public brochure; the page does the selling)
             → Confidential "raise your hand"  (public no-login Convex intake;
                  held by Transparent Towns in confidence, NOT a CORA record,
                  NOT handed to the Town as a raw list)
                  → Citizens' committee  (residents judge; AI summarizes resumes
                       clerically, never scores/ranks/recommends)
                       → Consenting finalist  (record + publish consent captured)
                            → Public Town interview  (Board of Trustees' lawful,
                                 open process — the publication trigger, by design)
```

The load-bearing properties of this handoff:

- **The outreach email is a road to the magnet, not a parallel process.** It never asks for a resume, never pitches a private pipeline, never implies the recipient is being evaluated. It points a well-chosen person at the public page and stops. All actual interest capture happens on the Prize Page's confidential intake, under that page's confidentiality promises.
- **Confidential-by-default → public-by-consent ordering is preserved end to end.** A sitting administrator three valleys over is exactly who this outreach targets, and exactly who *cannot* afford an early public footprint. The invitation respects that: it routes them to a page that holds interest in confidence and only flips to public when *they* choose to advance to a Town interview. Get the ordering backwards and you'd repel the strong passive candidate the whole effort exists to attract.
- **No information bleeds from outbound to the public surface.** Sourcing dossiers, alignment tiers, and the contact list live operator-side in Convex (Clerk-gated), never on townofpaonia.co. The Prize Page spec *kills* public named-candidate profiles and any "who we screened out and why" artifact in a ~1,500-person town; this doc honors that — the outbound pipeline produces zero public artifacts about any named human.
- **The two human gates compound.** Outbound has its own human-in-the-loop (invite decision + send approval, this doc); inbound has the citizens' committee (the judging, the Prize Page spec). No software decides anything at any stage. Outreach merely *widens the mouth of the funnel* with values-aligned, conduct-sourced invitations; the town's residents and Board do all the deciding, in the open.

**Bottom line:** the Prize Page waits for the right people to find it; this pipeline goes and taps them on the shoulder — using only their public professional record, with a human approving every name and every send, pointing them at the public page, and storing nothing about them that a court, a critic, or the town they just left could turn into a weapon. The legal shield (outreach, not screening) is real but conditional. It holds only as long as the guardrails in §5 hold — so they are not optional, they are the strategy.
