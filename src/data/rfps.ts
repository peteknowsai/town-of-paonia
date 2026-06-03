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
  { name: "Peckham & McKenney", base: "Glenwood Springs, CO", co: true, note: "Western Slope based; specializes in local-government executive search." },
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
