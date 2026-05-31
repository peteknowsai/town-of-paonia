# Roadmap: Admin Search tool to fully complete

Status of record as of this planning pass. The inbound tool is **live** on
townofpaonia.co: the `/administrator` page, and both funnels (confidential
interest, open committee sign-up) persisting to the prod Convex deployment
`academic-elephant-432`. What follows is everything between here and "done,"
organized as milestones. Each milestone is its own branch, squash-merged to
`main`, which auto-deploys to Cloudflare.

Two tracks: finishing the **inbound** tool to production grade (fast, low risk),
and building the **outbound** acquisition engine (the large, legally loaded
build). They are independent; inbound does not depend on outbound.

---

## M0 — Content truth-up (small, no new infra)

The page is honest but has two placeholders that should be real before we drive
traffic.

- Verkada camera removal: state the actual month/year as record, replacing
  "recently" (`src/data/position.ts:103`).
- `asOf` freshness stamp (`position.ts:66`): confirm "Spring 2026" or set a date.
- Final copy pass: committee placeholder language, pay note, any stale line.

**Done when:** no TODOs in `position.ts`; merged.

## M1 — Make the live funnel trustworthy (half day)

Today a submission lands silently in Convex. Nobody is notified, and the API
routes are open POST endpoints that bots will eventually find.

- **Notification email** to the operator on every submission (interest and
  committee). Without this, a candidate who raises their hand can sit unseen.
- **Confirmation email** to the submitter. Closes the loop, reinforces the
  confidentiality promise in writing.
- **Spam defense:** honeypot field + Cloudflare Turnstile (on brand: not Google
  reCAPTCHA) + a basic per-IP rate limit at the route.

**External dependency:** Resend account + API key + a verified sending domain
(SPF/DKIM/DMARC DNS on townofpaonia.co or a mail subdomain). Operator sets up the
account and DNS; code wiring is ours.

**Done when:** a submission emails the operator and the submitter; bot
submissions are rejected; merged.

## M2 — Read and manage submissions in-app (Clerk-gated, ~1 day)

Replaces reading via the Convex dashboard / CLI.

- Install Clerk; gate `/admin`.
- Inbox: list interest + committee submissions, newest first, with notes.
- The **consent switch** from the original design: mark a candidate as
  "advancing to a Town interview," which flips their record from confidential to
  public (the confidential-by-default to public-by-consent mechanic). This is the
  one piece of real product logic, not just a list view.

**External dependency:** Clerk account + application + publishable/secret keys.
Operator creates the app; code wiring is ours.

**Done when:** operator can log in, read every submission, and toggle a
candidate public; merged.

## M3 — Outbound acquisition engine: Colorado (the big one, gated)

Builds the Colorado-first sourcing engine specced in `candidate-acquisition.md`.
This sends email to real public officials, so it is **human-approved at every
step** and nothing mass-sends without an explicit operator trigger. Sub-phased so
each piece is verifiable and the legally loaded part comes last.

- **M3a — Target list (data only, no sending).** Build the CO list: CML
  Municipal Directory as the spine, per-town `.gov` staff-page email scraping for
  contacts. Store with provenance. ~150 towns run a manager/administrator.
- **M3b — Alignment scoring (clerical, never a filter).** Score each town/admin
  on documented public conduct as a *sort order for outreach*, never a rejection
  filter (the legal asymmetry: inviting is defensible, screening is the landmine).
  Every flag stored with its public-record citation. The operator approves every
  name; the AI only drafts and ranks.
- **M3c — Resend outbound + compliance (test batch only).** Suppression list
  enforced at enqueue so a non-compliant send is structurally impossible.
  CAN-SPAM compliant: physical postal address, working unsubscribe, honest
  headers. No open-tracking pixel (we do not surveil the people we recruit
  *because* they are anti-surveillance). Send to a tiny test batch (operator + a
  friendly) and verify deliverability and unsubscribe.
- **M3d — First real batch (operational, operator-triggered).** On the
  operator's go, send the first ~12 Colorado invitations. Iterate on reply rate
  (the KPI; not opens).

**Hard rule:** no outreach to a real official's inbox without the operator
pulling the trigger. M3a/M3b/M3c are mergeable code; M3d is an operational act.

**Done when:** the list is built, scored, and the operator has sent and verified
a test batch and is positioned to run the sweep at will.

## M4 — Production hygiene: tests, CI, docs, cleanup (half day)

- **Tests:** validation + persistence for the API routes and Convex mutations
  (CLAUDE.md: a feature is not done without tests).
- **Convex CI auto-deploy:** add a workflow step so functions deploy on push
  instead of by hand. Operator adds `CONVEX_DEPLOY_KEY` as a GitHub secret.
- **Docs:** update `specs/` and `CLAUDE.md` to reflect reality (Convex is now in
  use; the aesthetic is editorial, not the brutalist Courier the file still
  claims). Add a short runbook for reading/managing submissions.
- **Rotate the prod Convex deploy key** (it was pasted into a chat transcript).
- Delete the merged worktree branch.

**Done when:** tests pass in CI, functions auto-deploy, docs match reality, key
rotated; merged.

---

## Recommended sequence

M0 → M1 → M2 → (M4 partial: rotate key + Convex CI now, they are cheap and cut
risk) → M3 → (M4 remainder).

Rationale: make the inbound side bulletproof and observable *before* pointing an
outbound firehose at it. M3 is where the legal and cost exposure lives, so it
goes last and slowest, behind explicit human gates.

## Human-action gates (what only the operator can do)

- Provide a Resend account + API key, and add sending-domain DNS (M1, M3).
- Create a Clerk app + provide keys (M2).
- Add `CONVEX_DEPLOY_KEY` as a GitHub secret (M4 CI).
- Confirm the Verkada removal date (M0), or approve researching it.
- Pull the trigger on any real outbound batch (M3d).
- Rotate the prod deploy key (M4).
