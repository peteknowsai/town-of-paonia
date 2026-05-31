# Grant Tracker — Research Notes & Provenance

How the grant data was assembled, so it can be trusted, audited, and refreshed.

## Sources

- **CivicClerk meeting archive** (`paoniaco.api.civicclerk.com`) — the town's
  agendas, minutes, and agenda packets. The OData API enumerates every meeting;
  the per-meeting `publishedFiles` give Minutes / Agenda Packet file IDs, and
  `GetMeetingFileStream(fileId=…,plainText=false)` returns the PDF.
- **Town website** (`townofpaonia.colorado.gov`) — news releases, Town
  Administrator quarterly reports, budget documents. (403s the standard fetch
  tool; reachable via curl with a browser User-Agent.)
- **Colorado DOLA EIAF awards database**, GOCO, CDOT, History Colorado, CWCB,
  USDOT, EPA, USDA, and federal award records — for verification and amounts.

## Method

1. **Enumerated** all meetings via the CivicClerk API, querying month-by-month
   to dodge a 15-result page cap: **458 meetings, 2018–2027**, across Town
   Board, Planning Commission, Tree Board, Zoning Board, and ad-hoc committees.
   **210 had readable documents** (195 minutes + 190 agenda packets).
2. **Extracted text** from every document with `pdftotext` (the CivicClerk
   plaintext stream only works for the most recent ~2 weeks). ~110 minutes had
   substantial text; 184 agenda packets yielded grant-keyword excerpts.
3. **Swept** the pre-extracted text with parallel reader agents, each combing a
   batch of meetings for every grant mention — awards, applications, resolutions
   to apply, matching-fund votes, agreements, denials, and grant-funded
   projects. Findings were deduped by program and reconciled against state and
   federal records. (361 raw mentions → 291 distinct program references.)

This is why the tracker holds grants the press releases never covered: it reads
the actual record, not the announcements.

## Added from the minutes sweep (not in any press release)

Spring/hydrogeology study stack ($197,973: CWCB + River District + Basin
Roundtable), Dorris Avenue sewer line (DOLA Tier I, $137,756), EIAF Comprehensive
Plan update ($59,850) and Code Revision ($25,000), utility asset inventory &
mapping (DOLA Tier I, $48,629), COVID-era Revitalizing Main Streets ($21,711),
lead service-line inventory ($10,000), SIPA Town Hall sound system ($6,500),
EPA Brownfields assessment (Twin Lakes), CDPHE "Shade Trees" ($4,990), VALE
victim-assistance ($5,050), ARPA relief ($369,233, two tranches), the town
skatepark grants ($26,500), Space to Create pre-development, plus the pending
SB24-174 housing-plan application. The GOCO Parks/Rec/Trails master plan figure
was corrected to $76,000 (from a press estimate of $57,000).

## Notable, but deliberately NOT shown as secured grants

- **Denied / withdrawn:** an AARP Apple Valley Park grant and a GOCO town-park
  revitalization proposal were denied; not counted.
- **Discussed only:** many programs surfaced as "we should apply" (DOLA CDBG,
  Source Water Protection, Charge Ahead EV, Dark Skies, regenerative-ag, a CPW
  trails letter of support). These belong in "what Paonia could pursue," not in
  secured totals.
- **Ambiguous figures left unstated:** the IHOP housing grant appeared at the
  same $59,850 as the EIAF Comprehensive Plan grant — likely a transcription
  collision — so the housing item is shown as "grant-funded" without a dollar
  figure rather than risk double-counting. The "Pass-Through Grant Fund" budget
  line is a mechanism, not a single grant, so it is excluded.

## Honesty rules in the dataset

- The $9.66M Drinking Water loan counts only its **$3M principal forgiveness** as
  grant money; loans are not grants.
- Grants won by local nonprofits (the Hearth Center, the Creative District
  coalition) are shown in a **separate section** and never folded into town
  totals.
- Every grant links to its source — a specific CivicClerk meeting, the DOLA
  database, or the funder.

## Refreshing

- Opportunities: regenerate `src/lib/grants.opportunities.ts` from the research
  workflow as funding cycles roll over.
- Town grants: add to `GRANTS` in `src/lib/grants.ts` as new awards appear in
  council minutes or the budget grant ledger (the May budget packet carries a
  full active-grant table — the single best annual snapshot).
