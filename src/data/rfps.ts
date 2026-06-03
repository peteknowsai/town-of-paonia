// Single source of truth for /rfp and /rfp/executive-search.
//
// Two kinds of data live here:
//   1. paoniaOpen  — what the Town of Paonia currently has out to bid.
//   2. comparables — executive-search-firm RFPs from other Colorado
//      municipalities, gathered from BidNet / the Rocky Mountain e-Purchasing
//      System (RMEPS), the same system Paonia posts on.
//
// Why this is here, in git: it is editorial research that backs the cost and
// process argument on /administrator. Keeping it versioned means a reviewer can
// check every figure against its BidNet source in the diff.
//
// Sourcing notes (read before editing numbers):
//   - BidNet shows CLOSED solicitations in full to the public; OPEN ones are
//     locked to registered members. That is why Paonia's current RFPs below
//     carry only the public fields (title, dates) and link out for the rest.
//   - "firms" is BidNet's document-request count: vendors who downloaded the
//     RFP. It is a ceiling on interest, not the number who actually bid.
//   - Awarded values are almost always "undisclosed" on BidNet.
//   - RMEPS only covers member agencies and roughly the last ~18 years. Many
//     small towns post solicitations only on their own websites, so absence
//     from this list is not absence of a search.

export type PaoniaRfp = {
  number: string;
  title: string;
  published: string; // MM/DD/YYYY
  closing: string; // MM/DD/YYYY
  url: string;
};

// Pulled from bidnetdirect.com/colorado/townofpaonia. Detail fields are locked
// to registered vendors, so we link out rather than restating them.
export const paoniaOpen: PaoniaRfp[] = [
  {
    number: "RFP 2026-02",
    title: "Raw Water Monitoring",
    published: "05/05/2026",
    closing: "06/03/2026",
    url: "https://www.bidnetdirect.com/colorado/solicitations/open-bids/RFP-2026-02-Raw-Water-Monitoring/0000423239",
  },
  {
    number: "RFP 2026-01",
    title: "West Loop 8-Inch Water Main Replacement",
    published: "05/05/2026",
    closing: "06/08/2026",
    url: "https://www.bidnetdirect.com/colorado/solicitations/open-bids/RFP-2026-01-West-Loop-8-Inch-Water-Main-Replacement/0000410459",
  },
];

export const PAONIA_BIDNET_URL = "https://www.bidnetdirect.com/colorado/townofpaonia";

// ---------------------------------------------------------------------------
// Per-RFP citizen explainers. These power /rfp/[slug]. The point is to make a
// town solicitation legible to a resident without a BidNet login: what the
// project is, where, who is paying, the deadlines, and the actual documents,
// self-hosted so nobody hits a paywall. Content is drawn from the solicitation
// and its public pre-bid meeting minutes; the bid documents themselves are
// mirrored under /public/rfp/<slug>/ (large engineering sets are optimized for
// the web from the originals).
// ---------------------------------------------------------------------------

export type RfpDoc = {
  label: string;
  file: string; // path under /public
  size: string; // human-readable
  note?: string;
};

export type RfpEvent = {
  date: string; // MM/DD/YYYY
  label: string;
  done: boolean;
};

export type RfpFact = { label: string; value: string };
export type RfpPerson = { name: string; role: string };
export type RfpFunding = { source: string; kind: "loan" | "grant"; detail: string };

export type PaoniaRfpDetail = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  status: "open" | "closed";
  closing: string; // MM/DD/YYYY
  oneLiner: string;
  summary: string[];
  whatItDoes: string[];
  where: string;
  funding: RfpFunding[];
  cost: string;
  timeline: RfpEvent[];
  people: RfpPerson[];
  howItWorks: string[];
  facts: RfpFact[];
  docs: RfpDoc[];
  bidnetUrl: string;
};

export const paoniaRfps: PaoniaRfpDetail[] = [
  {
    slug: "2026-02-raw-water-monitoring",
    number: "RFP 2026-02",
    title: "Raw Water Monitoring",
    shortTitle: "Raw Water Monitoring",
    status: "open",
    closing: "06/03/2026",
    oneLiner:
      "New monitoring equipment at four of the town's mountain source-water sites, so operators can watch the raw water supply in real time instead of driving to each spring.",
    summary: [
      "The town's drinking water starts as “raw water” at mountain springs and intakes before it ever reaches the treatment plant. Today the town cannot watch those sources remotely. This project installs monitoring equipment and telemetry at four raw-water sites so operators can track flow and conditions from town and spot problems sooner.",
      "It is the second of two water projects the town put out to bid this spring, both paid for with the same mix of a state loan and a state grant. The first is the West Loop water main replacement.",
    ],
    whatItDoes: [
      "Installs monitoring equipment and SCADA telemetry at four raw-water sites: the German Creek / Lakefork 80:20 split box, the treatment plant pressure-break (blowoff) box, the Old Original / Reynolds Spring confluence, and the Lakefork spring.",
      "Adds bypass lines so source water keeps flowing while equipment is installed.",
      "Gives operators a real-time picture of how much source water the town actually has.",
    ],
    where:
      "Four remote sites in the hills above town. The Lakefork spring sits in Gunnison County; the other three are in Delta County. Contractors stage at the Lamborn Tank site.",
    funding: [
      {
        source: "CDPHE Drinking Water Revolving Fund (DWRF)",
        kind: "loan",
        detail: "A low-interest state loan for drinking-water infrastructure.",
      },
      {
        source: "DOLA Energy/Mineral Impact Assistance Fund (EIAF)",
        kind: "grant",
        detail: "A state grant; the same grant helps pay for both water projects.",
      },
    ],
    cost: "Not yet public. The price is set when the Board awards the bid; bids were opened June 3, 2026.",
    timeline: [
      { date: "05/05/2026", label: "RFP published", done: true },
      { date: "05/12/2026", label: "Mandatory pre-bid meeting at Town Hall", done: true },
      { date: "05/28/2026", label: "Last day for bidder questions", done: true },
      { date: "06/03/2026", label: "Sealed bids due 12:01 PM, opened in public at Town Hall", done: false },
    ],
    people: [
      { name: "Jordan Redden", role: "Lead Utility Operator (main contact)" },
      { name: "Stefen Wynn", role: "Town Administrator" },
      { name: "Douglas Schwenke, PE / BJ Elkins", role: "Project engineers (RESPEC)" },
    ],
    howItWorks: [
      "Only contractors who attended the mandatory pre-bid meeting could bid.",
      "Bidders post a 5% bid bond, plus performance and payment bonds at the contract price.",
      "Because state and federal money pays for it, Davis-Bacon prevailing wages and American Iron & Steel / Build America rules apply.",
      "Bids are sealed paper bids, opened and read aloud in public.",
      "The SCADA control work runs through the town's sole-source integrator, Mountain Peaks.",
      "The contractor warranties the work for two years.",
    ],
    facts: [
      { label: "Monitoring sites", value: "4" },
      { label: "Paid by", value: "State loan + grant" },
      { label: "Bids due", value: "June 3, 2026" },
      { label: "Bid / perf / payment bond", value: "5% / 10% / 10%" },
      { label: "Warranty", value: "2 years" },
      { label: "Bids drawn", value: "66 plan holders" },
    ],
    docs: [
      { label: "Project Bid Manual", file: "/rfp/2026-02/bid-manual.pdf", size: "17 MB", note: "The full specifications, contract terms, and bid forms. Optimized for the web." },
      { label: "Bid Drawing Set", file: "/rfp/2026-02/drawings.pdf", size: "24 MB", note: "Engineering drawings for all four sites." },
      { label: "Addendum 1", file: "/rfp/2026-02/addendum-1.pdf", size: "82 KB", note: "Official change to the RFP." },
      { label: "Pre-bid meeting agenda & minutes", file: "/rfp/2026-02/prebid-agenda-minutes.pdf", size: "131 KB" },
      { label: "Pre-bid sign-in sheet", file: "/rfp/2026-02/prebid-signin.pdf", size: "0.9 MB", note: "Who showed up to bid." },
    ],
    bidnetUrl:
      "https://www.bidnetdirect.com/colorado/solicitations/open-bids/RFP-2026-02-Raw-Water-Monitoring/0000423239",
  },
  {
    slug: "2026-01-west-loop-water-main",
    number: "RFP 2026-01",
    title: "West Loop 8-Inch Water Main Replacement",
    shortTitle: "West Loop Water Main",
    status: "open",
    closing: "06/08/2026",
    oneLiner:
      "Replaces the last of the old steel water mains on the town's west loop with new pipe, and gives affected homes new service lines and meters.",
    summary: [
      "Two pipelines carry treated water from the Mt. Lamborn Water Treatment Plant into town. This project replaces the remaining 8-inch steel pipe on the west loop with new PVC or HDPE pipe, on a new alignment along Lamborn Mesa Road.",
      "It is the larger of the two water projects out to bid this spring, paid for by the same state loan and grant. Homeowners along the route get new service lines and meters as part of the work.",
    ],
    whatItDoes: [
      "Replaces or abandons aging steel water lines in four pipe segments, with two new pressure-reducing valve (PRV) vaults.",
      "Bores pipe underground on two segments instead of open trenching, to limit disruption.",
      "Replaces residential service lines and meters for affected homes (homeowners have been notified).",
      "Restores and resurfaces the roads afterward.",
    ],
    where: "The west loop: Lamborn Mesa Road to O Road to Lamborn Drive.",
    funding: [
      {
        source: "CDPHE Drinking Water Revolving Fund (DWRF)",
        kind: "loan",
        detail: "A low-interest state loan for drinking-water infrastructure.",
      },
      {
        source: "DOLA Energy/Mineral Impact Assistance Fund (EIAF)",
        kind: "grant",
        detail: "A state grant; the same grant helps pay for both water projects.",
      },
    ],
    cost: "Not yet public. The price is set when the Board awards the bid; bids are opened June 8, 2026.",
    timeline: [
      { date: "05/05/2026", label: "RFP published", done: true },
      { date: "05/12/2026", label: "Mandatory pre-bid meeting at Town Hall", done: true },
      { date: "05/22/2026", label: "Addendum 2 issued", done: true },
      { date: "06/02/2026", label: "Last day for bidder questions", done: true },
      { date: "06/08/2026", label: "Sealed bids due 12:01 PM, opened in public at Town Hall", done: false },
    ],
    people: [
      { name: "Derek Heiniger", role: "Public Works Utility Operator" },
      { name: "Stefen Wynn", role: "Town Administrator" },
      { name: "James Starnes, PE", role: "Engineer of Record (RESPEC)" },
    ],
    howItWorks: [
      "Only contractors who attended the mandatory pre-bid meeting could bid.",
      "Bidders post a 5% bid bond, plus performance and payment bonds at the contract price.",
      "Because state and federal money pays for it, Davis-Bacon prevailing wages and American Iron & Steel / Build America rules apply.",
      "Bids are sealed paper bids, opened and read aloud in public.",
      "The contractor coordinates each home's new service line with the owner, and warranties the work for two years.",
    ],
    facts: [
      { label: "Pipe segments", value: "4" },
      { label: "New PRV vaults", value: "2" },
      { label: "Homes", value: "New service lines + meters" },
      { label: "Paid by", value: "State loan + grant" },
      { label: "Bids due", value: "June 8, 2026" },
      { label: "Bids drawn", value: "96 plan holders" },
    ],
    docs: [
      { label: "Project Bid Manual", file: "/rfp/2026-01/bid-manual.pdf", size: "24 MB", note: "The full specifications, contract terms, and bid forms. Optimized for the web." },
      { label: "Bid Drawing Set", file: "/rfp/2026-01/drawings.pdf", size: "16 MB", note: "Engineering drawings, including the project-location sheets." },
      { label: "Addendum 1", file: "/rfp/2026-01/addendum-1.pdf", size: "100 KB" },
      { label: "Addendum 2", file: "/rfp/2026-01/addendum-2.pdf", size: "15 MB" },
      { label: "Addendum 3", file: "/rfp/2026-01/addendum-3.pdf", size: "7 MB", note: "Optimized for the web." },
      { label: "Pre-bid meeting minutes", file: "/rfp/2026-01/prebid-minutes.pdf", size: "118 KB" },
      { label: "Pre-bid sign-in sheet", file: "/rfp/2026-01/prebid-signin.pdf", size: "1.3 MB", note: "Who showed up to bid." },
    ],
    bidnetUrl:
      "https://www.bidnetdirect.com/colorado/solicitations/open-bids/RFP-2026-01-West-Loop-8-Inch-Water-Main-Replacement/0000410459",
  },
];

export function getPaoniaRfp(slug: string): PaoniaRfpDetail | undefined {
  return paoniaRfps.find((r) => r.slug === slug);
}

export type Comparable = {
  agency: string;
  // "city" (home rule), "town" (statutory), "county", or "special".
  govType: "city" | "town" | "county" | "special";
  county: string;
  role: string; // the position the search was for
  // How directly it maps to a Town Administrator search.
  tier: "manager" | "department" | "general";
  year: number;
  date: string; // publication date, MM/DD/YYYY
  // RFP, RFQ (qualifications-based), or IFB (invitation for bid).
  vehicle: "RFP" | "RFQ" | "IFB";
  number?: string; // the agency's solicitation number
  firms?: number; // BidNet document-request count
  awardedTo?: string; // winning firm, when BidNet published an award
  pricing?: string;
  note: string;
  url: string;
};

// Curated from the 72 closed "executive search" solicitations on RMEPS. The
// manager-tier rows are the real comparables for a Town Administrator search;
// the rest show the range of how Colorado governments structure these.
export const comparables: Comparable[] = [
  {
    agency: "City of Durango",
    govType: "city",
    county: "La Plata",
    role: "City Manager",
    tier: "manager",
    year: 2019,
    date: "10/02/2019",
    vehicle: "RFP",
    number: "Executive Search Consultant 2019",
    firms: 25,
    awardedTo: "Slavin Management Consultants",
    note:
      "Asked for firms that specialize in City Manager recruitment or have extensive executive-level government search experience. The clearest, best-documented comparable: BidNet shows both the full field of 25 firms that pulled the RFP and the award.",
    url: "https://www.bidnetdirect.com/colorado/city-of-durango/solicitations/Executive-Search-Consultant-to-assist-City-Council-with-hiring-for-City-Manager/0000223990",
  },
  {
    agency: "City of Evans",
    govType: "city",
    county: "Weld",
    role: "City Manager",
    tier: "manager",
    year: 2022,
    date: "06/10/2022",
    vehicle: "RFP",
    number: "CM-2022",
    firms: 11,
    note:
      "Sought skilled independent executive search consultants to run the search for a new City Manager, on a tight timeline (selection targeted within ~5 months). Firms that pulled it included CPS HR Consulting, Baker Tilly, and ATTAC Group.",
    url: "https://www.bidnetdirect.com/colorado/city-of-evans/solicitations/City-of-Evans-Executive-Search-Firm-City-Manager/0000291626",
  },
  {
    agency: "City of Commerce City",
    govType: "city",
    county: "Adams",
    role: "City Manager",
    tier: "manager",
    year: 2020,
    date: "07/09/2020",
    vehicle: "RFP",
    number: "RFPCM01",
    firms: 21,
    pricing: "Lump sum",
    note:
      "An informal RFP for a national recruitment of a City Manager: attract, interview, and help the Council select. Priced as a single lump sum, awarded all-or-none.",
    url: "https://www.bidnetdirect.com/colorado/city-of-commerce-city/solicitations/Request-for-Proposals-for-Executive-Search-Firm-for-City-Manager/0000241430",
  },
  {
    agency: "City of Thornton",
    govType: "city",
    county: "Adams",
    role: "City Manager",
    tier: "manager",
    year: 2017,
    date: "01/17/2017",
    vehicle: "RFQ",
    number: "113-17",
    firms: 24,
    note:
      "Notable for the vehicle: a Request for Qualifications, not an RFP. Thornton asked firms to prove their qualifications first and negotiated scope and price after, rather than scoring priced proposals up front.",
    url: "https://www.bidnetdirect.com/colorado/city-of-thornton/solicitations/City-Manager-Executive-Search-Services/0000102969",
  },
  {
    agency: "Clear Creek County",
    govType: "county",
    county: "Clear Creek",
    role: "Deputy County Manager & Finance Director",
    tier: "manager",
    year: 2024,
    date: "04/01/2024",
    vehicle: "IFB",
    number: "24-01",
    firms: 22,
    pricing: "Lump sum",
    note:
      "A small mountain county bundling two executive hires into one search. Run by the County Manager's office as an invitation for bid. A useful model for combining roles in a lean government.",
    url: "https://www.bidnetdirect.com/colorado/clearcreekcounty/solicitations/CCC-REQUEST-FOR-BIDS-EXE-SEARCH-RECRUITMENT-Dep-Cty-Mger-Finance-Director/0000347929",
  },
  {
    agency: "City of Cortez",
    govType: "city",
    county: "Montezuma",
    role: "General Services Director & Library Director",
    tier: "department",
    year: 2024,
    date: "06/07/2024",
    vehicle: "RFP",
    number: "01-HR-2024",
    firms: 66,
    pricing: "Lump sum",
    note:
      "The closest in size and setting to Paonia: a small southwestern Colorado city recruiting for two department heads at once. Required municipal-government executive recruitment expertise; drew the largest field on this list (66 firms downloaded it).",
    url: "https://www.bidnetdirect.com/colorado/city-of-cortez/solicitations/EXECUTIVE-SEARCH-RECRUITMENT-SERVICE/0000354804",
  },
  {
    agency: "City of Grand Junction",
    govType: "city",
    county: "Mesa",
    role: "City Manager",
    tier: "manager",
    year: 2015,
    date: "07/10/2015",
    vehicle: "RFP",
    note: "A Western Slope City Manager search, the largest city in the region.",
    url: "https://www.bidnetdirect.com/colorado/solicitations/closed-bids?keywords=executive+search",
  },
  {
    agency: "City of Longmont",
    govType: "city",
    county: "Boulder",
    role: "City Manager",
    tier: "manager",
    year: 2011,
    date: "04/15/2011",
    vehicle: "RFP",
    number: "0000017084",
    note: "A Front Range City Manager search, run as a formal RFP.",
    url: "https://www.bidnetdirect.com/colorado/city-of-longmont/solicitations/Executive-Search-Firm-City-Manager-Position/0000017084",
  },
  {
    agency: "City of Englewood",
    govType: "city",
    county: "Arapahoe",
    role: "City Manager",
    tier: "manager",
    year: 2014,
    date: "03/24/2014",
    vehicle: "RFP",
    number: "0000025179",
    note: "Titled an executive recruitment for City Manager.",
    url: "https://www.bidnetdirect.com/colorado/city-of-englewood/solicitations/Executive-Recruitment-for-City-Manager/0000025179",
  },
  {
    agency: "Town of Windsor",
    govType: "town",
    county: "Weld / Larimer",
    role: "Chief of Police",
    tier: "department",
    year: 2024,
    date: "01/05/2024",
    vehicle: "RFP",
    note:
      "One of the few solicitations on RMEPS posted by an actual Town (not a city) for an executive search firm. Windsor is a large statutory town; the role was Chief of Police, not the manager.",
    url: "https://www.bidnetdirect.com/colorado/townofwindsor/solicitations/Executive-Search-Firm-for-Recruitment-for-Chief-of-Police/0000338913",
  },
  {
    agency: "Town of Timnath",
    govType: "town",
    county: "Larimer",
    role: "Town legal services",
    tier: "general",
    year: 2020,
    date: "10/16/2020",
    vehicle: "RFP",
    note:
      "A small Front Range town using an executive search firm to recruit legal services. The other example of a statutory Town turning to a search firm.",
    url: "https://www.bidnetdirect.com/colorado/town-of-timnath/solicitations/Executive-Search-Firm-for-Recruitment-of-Legal-Services/0000247416",
  },
  {
    agency: "City of Pueblo",
    govType: "city",
    county: "Pueblo",
    role: "HR consulting & executive recruitment (on-call)",
    tier: "general",
    year: 2025,
    date: "11/03/2025",
    vehicle: "RFP",
    note:
      "The most recent on the list: an on-call contract for HR consulting plus executive recruitment, rather than a single named search. A model for a standing arrangement.",
    url: "https://www.bidnetdirect.com/colorado/city-of-pueblo/solicitations/Request-for-Proposal-for-HR-Consulting-Executive-Recruitment-Services/0000403462",
  },
];

// Executive search firms that pulled the City of Durango's City Manager RFP
// (2019), filtered to those that actually do municipal executive search. This
// is a real, checkable shortlist of who competes for Colorado manager searches.
// "co" flags a Colorado-based firm.
export type SearchFirm = { name: string; base: string; co?: boolean; note?: string };

export const searchFirms: SearchFirm[] = [
  { name: "Columbia Ltd", base: "Colorado Springs, CO", co: true, note: "Founded by a former Colorado county/city manager; won the Cortez search. Sells a ~12-week timeline and a one-year replacement warranty." },
  { name: "Peckham & McKenney", base: "Glenwood Springs, CO", co: true, note: "Western Slope presence; specializes in local-government executive search." },
  { name: "KRW Associates", base: "Littleton, CO", co: true, note: "Colorado firm built around former Colorado city managers and chiefs." },
  { name: "Lee & Burgess Associates of Colorado", base: "Centennial, CO", co: true },
  { name: "Alpine Leadership", base: "Bayfield, CO", co: true },
  { name: "Slavin Management Consultants", base: "Norcross, GA", note: "Won the Durango City Manager search." },
  { name: "Strategic Government Resources (SGR)", base: "Keller, TX", note: "One of the largest national local-government recruiters." },
  { name: "CPS HR Consulting", base: "Sacramento, CA" },
  { name: "Colin Baenziger & Associates", base: "Riverdale, UT" },
  { name: "The Novak Consulting Group (Raftelis)", base: "Cincinnati, OH" },
  { name: "Management Partners", base: "Cincinnati, OH" },
  { name: "Baker Tilly", base: "Madison, WI" },
  { name: "MGT Impact Solutions", base: "Tampa, FL" },
];

// How many closed "executive search" solicitations RMEPS lists statewide.
export const RMEPS_CLOSED_COUNT = 72;
export const RMEPS_CLOSED_URL =
  "https://www.bidnetdirect.com/colorado/solicitations/closed-bids?keywords=executive+search";

// ---------------------------------------------------------------------------
// Practical guidance for a Town Administrator search RFP. Three things the
// mayor asked for: what to put in our RFP, what towns pay, and what winning
// bids look like. Cost and winner facts are sourced; where a figure could not
// be confirmed from a public record, we say so rather than guess.
// ---------------------------------------------------------------------------

// What a good municipal executive-search RFP asks for. Drawn from the standard
// structure of the Colorado City Manager RFPs in the table above (e.g. Durango,
// Evans, Commerce City) plus what the confirmed winners actually delivered.
export type RfpSection = { heading: string; detail: string };

export const rfpChecklist: RfpSection[] = [
  {
    heading: "Scope of work, in phases",
    detail:
      "Spell out each phase: build the candidate profile, advertise and recruit, screen and interview, check backgrounds and references, support the Board's final selection and the offer. Say which phases the firm owns and which the Board keeps.",
  },
  {
    heading: "A clear deliverables list",
    detail:
      "Recruitment brochure, an advertising plan with the specific job boards and networks, a screened candidate slate with written assessments, reference and background reports, and a final hiring recommendation.",
  },
  {
    heading: "Timeline",
    detail:
      "Ask for a week-by-week schedule. Colorado manager searches typically run about 12 to 16 weeks from kickoff to offer; a firm that can't commit to a schedule is a flag.",
  },
  {
    heading: "A fixed, itemized fee",
    detail:
      "Require a flat professional fee plus a not-to-exceed cap on expenses (advertising, travel, background checks), quoted as one lump sum. This is how Commerce City and Cortez wrote theirs, and it prevents open-ended billing.",
  },
  {
    heading: "A replacement guarantee",
    detail:
      "The single clause that separates serious firms: if the hire leaves or is dismissed within a set period (usually one to two years), the firm re-runs the search at no professional fee. Make it a required term.",
  },
  {
    heading: "Relevant Colorado experience and references",
    detail:
      "Ask specifically for recent town/city manager or administrator searches in Colorado, with the client, the year, and a contact to call. Small-town and Western-Slope experience matters more than national volume.",
  },
  {
    heading: "The team who will actually do the work",
    detail:
      "Name the lead recruiter and who else touches the search. Many of these firms are built around one or two principals; you are hiring that person, not a logo.",
  },
  {
    heading: "Equal, transparent evaluation criteria",
    detail:
      "Publish how proposals will be scored (experience, approach, references, fee) and how candidates will be assessed against the job, so the process is defensible and open.",
  },
];

// What towns pay. Verified or clearly-labeled benchmarks; exact Colorado
// contract fees are rarely published (see costNote).
export type CostBenchmark = { label: string; amount: string; detail: string; emphasis?: boolean };

export const costBenchmarks: CostBenchmark[] = [
  {
    label: "Minturn, Colorado",
    amount: "$19,500",
    detail:
      "All-in town manager search by a Colorado firm, for a town about Paonia's size. The closest real comparable.",
    emphasis: true,
  },
  {
    label: "Typical small-town search",
    amount: "$18,000 – $28,000",
    detail: "A flat professional fee plus advertising, travel, and background-check expenses.",
  },
  {
    label: "A mid-size city search",
    amount: "~$45,000",
    detail: "What the same work runs a larger city with a bigger field and more travel.",
  },
];

export const costNote =
  "Here is the catch for a transparency site: Colorado towns routinely publish the new hire's salary but bury the search firm's fee in council agenda packets and minutes. None of the fees in the comparables table above are posted on BidNet. The amounts are public records — they are just not surfaced. The reliable way to get an exact figure is a records request to the town clerk citing the solicitation number.";

// What winning bids looked like. Confirmed from public records by our research.
export type WinnerCase = {
  agency: string;
  firm: string;
  base: string;
  role: string;
  year: number;
  why: string;
  sourced: boolean;
};

export const winnerCases: WinnerCase[] = [
  {
    agency: "City of Durango",
    firm: "Slavin Management Consultants",
    base: "Norcross, GA",
    role: "City Manager",
    year: 2019,
    why: "A public-sector-only search firm with decades of city/county manager placements. Durango's council bought the safe, known specialist; Slavin ran the public forum and advised on naming only finalists the city was willing to hire.",
    sourced: true,
  },
  {
    agency: "City of Englewood",
    firm: "Slavin Management Consultants",
    base: "Norcross, GA",
    role: "City Manager",
    year: 2014,
    why: "Same firm, same playbook: a nationwide search that drew 101 applications, narrowed to six then two. Repeat Colorado work compounds a firm's credibility with the next council.",
    sourced: true,
  },
  {
    agency: "City of Cortez",
    firm: "Columbia Ltd",
    base: "Colorado Springs, CO",
    role: "General Services & Library Directors",
    year: 2024,
    why: "Founded by a former Colorado county/city manager. It had already placed Cortez's manager, attorney, and two other directors, and sells a ~12-week timeline with a one-year replacement warranty. Incumbency and a local track record won it, not low price.",
    sourced: true,
  },
];

// The pattern across the confirmed winners.
export const winningBidTraits: string[] = [
  "They specialize in government. Every confirmed winner is a public-sector-only executive-search shop, not a general staffing recruiter.",
  "They have a Colorado or regional track record, and they name it. Incumbency and recent local placements beat national volume.",
  "They shift the risk. A one-to-two-year replacement guarantee, in writing, is the clause that closes the sale.",
  "They commit to a timeline. A concrete ~12–16 week schedule signals they have done this before.",
  "Price is rarely the deciding factor. These cluster in the $18k–$45k band; councils pick on trust and track record, not the low bid.",
];
