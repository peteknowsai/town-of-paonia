// Grant portal data model for the Town of Paonia.
//
// This is a curated, source-cited dataset, not a live feed. Grants move slowly
// and the value here is a clear, honest picture a resident can read in a minute.
// Every entry should carry a source so the dashboard stays accountable.
//
// When the official site or council minutes publish something new, add it here.

export type GrantCategory =
  | "water"
  | "wastewater"
  | "parks-trails"
  | "streets-transportation"
  | "historic-preservation"
  | "wildfire"
  | "broadband"
  | "energy-transition"
  | "downtown"
  | "public-safety"
  | "planning"
  | "agriculture"
  | "arts-culture"
  | "environment"
  | "housing"
  | "youth-education"
  | "other";

// Who can chase a given opportunity. The portal is resident-facing, so it
// surfaces money the whole community can go after, not just the Town.
export type Applicant =
  | "town"
  | "nonprofit"
  | "both"
  | "business-or-resident"
  | "school";

// Lifecycle of money the town has actually engaged with.
export type GrantStatus =
  | "completed" // funded, work done
  | "awarded" // funded, money in hand or committed
  | "in-progress" // awarded and actively being spent
  | "under-review" // applied, awaiting a decision
  | "applied"; // submitted

export interface Grant {
  id: string;
  name: string;
  funder: string;
  // Numeric award in dollars when known, for totals and sorting.
  amount: number | null;
  // Display override when the amount is a range, in-kind, or not yet public.
  amountLabel?: string;
  year: number | null;
  category: GrantCategory;
  status: GrantStatus;
  // One or two plain sentences: what this paid for and why it mattered.
  purpose: string;
  // Who received it. Defaults to the Town; set when a Paonia nonprofit won it.
  recipient?: string;
  // False for grants that went to a local organization, not the Town itself.
  // Community grants are shown separately and never counted in town totals.
  isMunicipal?: boolean;
  source?: string;
  sourceLabel?: string;
  notes?: string;
}

// A program the Paonia community could pursue. Forward-looking: the point is
// what is out there and when it is due, not what has been filed.
export interface Opportunity {
  id: string;
  name: string;
  funder: string;
  awardRange: string;
  funds: string;
  // Why this is a plausible fit for Paonia specifically.
  fit: string;
  // Who can chase it.
  eligibleApplicant: Applicant;
  // Recurring rhythm, e.g. "spring & fall rounds".
  cycle?: string;
  // Free-text next due date, e.g. "April 15, 2026" or "rolling".
  nextDeadline?: string;
  // Short human label for the community alignment, e.g. "local food".
  communityTheme?: string;
  confidence?: "high" | "medium" | "low";
  link?: string;
  category: GrantCategory;
}

export interface CategoryMeta {
  label: string;
  // Short tag for tight spaces.
  short: string;
  // CSS color used for the category dot / chip accent.
  color: string;
}

export const CATEGORIES: Record<GrantCategory, CategoryMeta> = {
  water: { label: "Water", short: "Water", color: "#2f6f8f" },
  wastewater: { label: "Wastewater & Sewer", short: "Sewer", color: "#3a5a78" },
  "parks-trails": { label: "Parks & Trails", short: "Parks", color: "#4f7a3a" },
  "streets-transportation": {
    label: "Streets & Transportation",
    short: "Streets",
    color: "#6f6757",
  },
  "historic-preservation": {
    label: "Historic Preservation",
    short: "Historic",
    color: "#8a6d3b",
  },
  wildfire: { label: "Wildfire & Forest Health", short: "Wildfire", color: "#b1432a" },
  broadband: { label: "Broadband", short: "Broadband", color: "#5a4f8f" },
  "energy-transition": {
    label: "Energy & Just Transition",
    short: "Transition",
    color: "#a85a2a",
  },
  downtown: { label: "Downtown & Main Street", short: "Downtown", color: "#9a4b6b" },
  "public-safety": { label: "Public Safety", short: "Safety", color: "#7a3a3a" },
  planning: { label: "Planning & Capacity", short: "Planning", color: "#4a6a6a" },
  agriculture: { label: "Agriculture & Local Food", short: "Ag & Food", color: "#566b1c" },
  "arts-culture": { label: "Arts & Creative District", short: "Arts", color: "#7a4f9a" },
  environment: { label: "Environment & Watershed", short: "Environment", color: "#2e7d5b" },
  housing: { label: "Housing", short: "Housing", color: "#985a28" },
  "youth-education": { label: "Youth & Education", short: "Youth", color: "#3a6ea5" },
  other: { label: "Other", short: "Other", color: "#6f6757" },
};

export const APPLICANT_META: Record<Applicant, { label: string; short: string }> = {
  town: { label: "Town of Paonia can apply", short: "Town" },
  nonprofit: { label: "Local nonprofits", short: "Nonprofits" },
  both: { label: "Town or local partners", short: "Town or partners" },
  "business-or-resident": { label: "Businesses & residents", short: "Business/resident" },
  school: { label: "School district", short: "School" },
};

export const STATUS_META: Record<
  GrantStatus,
  { label: string; tone: "done" | "active" | "pending" }
> = {
  completed: { label: "Completed", tone: "done" },
  awarded: { label: "Awarded", tone: "done" },
  "in-progress": { label: "In progress", tone: "active" },
  "under-review": { label: "Under review", tone: "pending" },
  applied: { label: "Applied", tone: "pending" },
};

// ---------------------------------------------------------------------------
// Data. Replace and extend as new grants surface in council minutes, the
// official site, DOLA / GOCO / CDOT databases, and federal award records.
// Seeded below from research; each carries a source.
// ---------------------------------------------------------------------------

export const GRANTS: Grant[] = [
  // --- Safe Pathways for Paonia: three stacked transportation awards funding
  // one project, the 5th & Grand intersection rebuild. ---
  {
    id: "safe-pathways-build",
    name: "Safe Pathways: Federal BUILD Grant",
    funder: "U.S. Dept. of Transportation",
    amount: 1884901,
    year: 2025,
    category: "streets-transportation",
    status: "in-progress",
    purpose:
      "Rebuilds the 5th Street and Grand Avenue intersection, a school-zone corridor, for people on foot and bikes. The largest piece of the Safe Pathways project, funded almost entirely by grants with a $30,182 local match.",
    source:
      "https://townofpaonia.colorado.gov/news-article/town-of-paonia-awarded-nearly-19-million-federal-build-grant-for-safe-pathways-for",
    sourceLabel: "Town announcement",
    notes: "Awarded July 2025.",
  },
  {
    id: "safe-pathways-srts",
    name: "Safe Pathways: Safe Routes to School",
    funder: "Colorado Dept. of Transportation",
    amount: 872825,
    year: 2025,
    category: "streets-transportation",
    status: "in-progress",
    purpose:
      "Pedestrian and bike safety for students walking to school at 5th & Grand. Part of the Safe Pathways project.",
    source:
      "https://townofpaonia.colorado.gov/news-article/town-of-paonia-secures-over-188-million-in-cdot-grant-funding-for-pedestrian-and",
    sourceLabel: "Town announcement",
    notes: "Approved by the CDOT Transportation Commission, April 2025.",
  },
  {
    id: "safe-pathways-rms",
    name: "Safe Pathways: Revitalizing Main Streets",
    funder: "Colorado Dept. of Transportation",
    amount: 1010592,
    year: 2023,
    category: "streets-transportation",
    status: "in-progress",
    purpose:
      "Main-street and pedestrian-access improvements at 5th & Grand, combining two CDOT Revitalizing Main Streets awards. Part of the Safe Pathways project.",
    source:
      "https://townofpaonia.colorado.gov/sites/townofpaonia/files/documents/1st%20Quarter%202025%20TA%20Report_f.pdf",
    sourceLabel: "Town Administrator report",
    notes: "Awarded 2023.",
  },

  // --- Water system ---
  {
    id: "eiaf-west-water-loop",
    name: "West Water Loop Replacement",
    funder: "Colorado DOLA, Energy/Mineral Impact Assistance Fund",
    amount: 1000000,
    year: 2025,
    category: "water",
    status: "awarded",
    purpose:
      "Replaces the town's West Water distribution loop, a core piece of the drinking-water system.",
    source: "https://dlg.colorado.gov/EIAF-funding-awards",
    sourceLabel: "DOLA EIAF database",
    notes: "DOLA project 25-039.",
  },
  {
    id: "eiaf-tank-relining",
    name: "2-Million-Gallon Tank Relining",
    funder: "Colorado DOLA, Energy/Mineral Impact Assistance Fund",
    amount: 956000,
    year: 2024,
    category: "water",
    status: "in-progress",
    purpose:
      "Remediates and relines the interior of the town's two-million-gallon water tank. Phase I of the water capital plan; work was nearly complete in early 2025.",
    source:
      "https://townofpaonia.colorado.gov/sites/townofpaonia/files/documents/1st%20Quarter%202025%20TA%20Report_f.pdf",
    sourceLabel: "Town Administrator report",
    notes:
      "History to verify: reportedly rescinded after a missed 2022 audit, then reinstated. The town's 2025 reports list it as active.",
  },
  {
    id: "dwrf-water-overhaul",
    name: "Drinking Water System Overhaul",
    funder: "Colorado Water Resources & Power Development Authority",
    amount: 3000000,
    amountLabel: "$3M forgiven of a $9.66M loan",
    year: 2025,
    category: "water",
    status: "in-progress",
    purpose:
      "A $9.66 million low-interest loan package to modernize the drinking-water system, including $3 million the town never repays (federal infrastructure-law forgiveness). Only the forgiven portion is counted here as grant money.",
    source:
      "https://townofpaonia.colorado.gov/sites/townofpaonia/files/documents/1st%20Quarter%202025%20TA%20Report_f.pdf",
    sourceLabel: "Town Administrator report",
    notes: "Loan approved March 2025. Paonia qualifies as a disadvantaged community.",
  },
  {
    id: "watersmart-metering",
    name: "WaterSMART Planning Grant",
    funder: "U.S. Bureau of Reclamation",
    amount: 250000,
    year: 2024,
    category: "water",
    status: "in-progress",
    purpose:
      "Federal grant for raw-water metering and a comprehensive water-system plan, a step toward larger water-infrastructure funding. Design is underway.",
    source: "https://www.usbr.gov/watersmart/",
    sourceLabel: "Bureau of Reclamation",
    notes: "Applied Oct 2023, awarded. Notice to proceed and design in 2025-2026.",
  },

  // --- Streets & safety ---
  {
    id: "ss4a-safety-plan",
    name: "Safe Streets & Roads for All Plan",
    funder: "U.S. Dept. of Transportation",
    amount: 293974,
    year: 2024,
    category: "streets-transportation",
    status: "awarded",
    purpose:
      "Federal planning grant to write a Comprehensive Safety Action Plan for the town's streets, the gateway to future federal safety-construction money. Plan work begins 2026-2027.",
    source: "https://www.transportation.gov/grants/ss4a",
    sourceLabel: "USDOT SS4A",
    notes: "Awarded with a roughly $73,494 local match.",
  },

  // --- Parks, trails & planning (older track record) ---
  {
    id: "goco-hs-trail",
    name: "River Park to High School Trail",
    funder: "Great Outdoors Colorado",
    amount: 55350,
    year: 2021,
    category: "parks-trails",
    status: "completed",
    purpose:
      "Built a connecting trail from Paonia River Park to the junior/senior high school, with a conservation-corps crew and local partners.",
    source: "https://goco.org/news/blog/where-do-you-goco-october-2021-completed-projects",
    sourceLabel: "GOCO",
  },
  {
    id: "goco-river-park-signage",
    name: "River Park Educational Signage",
    funder: "Great Outdoors Colorado",
    amount: 45000,
    year: null,
    category: "parks-trails",
    status: "completed",
    purpose: "Wayfinding and educational signage throughout Paonia River Park.",
    source: "https://goco.org/news/blog/where-do-you-goco-october-projects",
    sourceLabel: "GOCO",
    notes: "Award year not confirmed.",
  },
  {
    id: "goco-master-plan",
    name: "Parks, Recreation & Trails Master Plan",
    funder: "Great Outdoors Colorado",
    amount: 76000,
    year: 2021,
    category: "planning",
    status: "completed",
    purpose:
      "Funded the town's Parks, Recreation and Trails Master Plan, setting a shared vision for parks and open space.",
    source: "https://paoniaco.portal.civicclerk.com/event/264/overview",
    sourceLabel: "Council minutes, Apr 13 2021",
  },

  // --- Surfaced from council minutes: the smaller grants and pipeline the
  // press releases never covered. ---
  {
    id: "spring-hydrogeology-study",
    name: "Spring Source & Hydrogeology Study",
    funder: "CWCB, Colorado River District & Gunnison Basin Roundtable",
    amount: 197973,
    year: 2025,
    category: "water",
    status: "awarded",
    purpose:
      "Stacked grants for a hydrogeological study of Paonia's spring-fed water supply (Wright Water Engineers): $147,973 from the Colorado Water Conservation Board, plus $25,000 each from the Colorado River District and the Basin Roundtable.",
    source: "https://paoniaco.portal.civicclerk.com/event/385/overview",
    sourceLabel: "Council minutes, Oct 28 2025",
  },
  {
    id: "dorris-sewer-eiaf",
    name: "Dorris Avenue Sewer Line Replacement",
    funder: "Colorado DOLA, EIAF (Tier I)",
    amount: 137756,
    year: 2023,
    category: "wastewater",
    status: "awarded",
    purpose:
      "DOLA grant covering about half the cost of replacing the Dorris Avenue sewer line (project bid roughly $299,400).",
    source: "https://paoniaco.portal.civicclerk.com/event/305/overview",
    sourceLabel: "Council minutes, Aug 8 2023",
  },
  {
    id: "dola-code-rewrite",
    name: "Municipal Code Rewrite",
    funder: "Colorado DOLA, EIAF",
    amount: 25000,
    year: 2025,
    category: "planning",
    status: "in-progress",
    purpose:
      "An EIAF grant (project A00278) funding a comprehensive rewrite of the town's municipal code (consultant Sustainable Futures), with a town match on the balance.",
    source: "https://paoniaco.portal.civicclerk.com/event/367/overview",
    sourceLabel: "Budget grant ledger, May 13 2025",
  },
  {
    id: "eiaf-comp-plan",
    name: "Comprehensive Plan Update",
    funder: "Colorado DOLA, EIAF",
    amount: 59850,
    year: 2025,
    category: "planning",
    status: "in-progress",
    purpose:
      "An EIAF grant (project A00232) funding an update to the town's Comprehensive Plan, the long-range guide for land use and growth.",
    source: "https://paoniaco.portal.civicclerk.com/event/367/overview",
    sourceLabel: "Budget grant ledger, May 13 2025",
  },
  {
    id: "lead-service-line",
    name: "Lead Service Line Inventory",
    funder: "State drinking-water program",
    amount: 10000,
    year: 2025,
    category: "water",
    status: "awarded",
    purpose:
      "Grant toward the federally required inventory of lead water-service lines (project estimated near $15,000).",
    source: "https://paoniaco.portal.civicclerk.com/event/385/overview",
    sourceLabel: "Council minutes, Oct 28 2025",
    notes: "Funder not named in the minutes.",
  },
  {
    id: "skatepark-grant",
    name: "Town Park Skatepark Improvements",
    funder: "Skatepark Project Grant & West Colorado Community Foundation",
    amount: 26500,
    year: 2023,
    category: "parks-trails",
    status: "in-progress",
    purpose:
      "Skatepark improvements at the town park, assembled from a $25,000 Skatepark Project Grant plus smaller community foundation grants.",
    source: "https://paoniaco.portal.civicclerk.com/event/285/overview",
    sourceLabel: "Council minutes, Aug 22 2023",
  },
  {
    id: "vale-victim-assistance",
    name: "Victim Assistance (VALE) Grant",
    funder: "VALE, 7th Judicial District",
    amount: 5050,
    year: 2022,
    category: "public-safety",
    status: "completed",
    purpose:
      "Victim Assistance and Law Enforcement pass-through grant supporting the municipal court.",
    source: "https://paoniaco.portal.civicclerk.com/event/169/overview",
    sourceLabel: "Council minutes, Jul 28 2022",
  },
  {
    id: "arpa-relief",
    name: "ARPA Federal Relief Funds",
    funder: "U.S. Treasury, American Rescue Plan Act",
    amount: 369233,
    year: 2022,
    category: "other",
    status: "completed",
    purpose:
      "The town's share of federal pandemic-recovery funds (a formula allocation, not a competitive grant), received in two tranches of $184,616 and put toward water-tank lining and an altitude valve.",
    source: "https://paoniaco.portal.civicclerk.com/event/270/overview",
    sourceLabel: "Council minutes, Aug 25 2022",
  },
  {
    id: "housing-needs-assessment",
    name: "Housing Needs Assessment & Action Plan",
    funder: "Colorado DOLA",
    amount: null,
    amountLabel: "Grant-funded",
    year: 2023,
    category: "housing",
    status: "completed",
    purpose:
      "Grant-funded consultant study producing a Paonia-specific Housing Needs Assessment and Housing Action Plan, adopted November 2023.",
    source: "https://paoniaco.portal.civicclerk.com/event/561/overview",
    sourceLabel: "Council minutes",
  },
  {
    id: "dola-sb24-174-housing",
    name: "Housing Plan Update (SB24-174)",
    funder: "Colorado DOLA",
    amount: null,
    amountLabel: "Applied",
    year: 2025,
    category: "housing",
    status: "applied",
    purpose:
      "Application for DOLA funding to update the Housing Needs Assessment and Action Plan to comply with new state law SB24-174.",
    source: "https://paoniaco.portal.civicclerk.com/event/385/overview",
    sourceLabel: "Council minutes, Oct 28 2025",
  },

  {
    id: "dola-tier1-asset-mapping",
    name: "Utility Asset Inventory & Mapping",
    funder: "Colorado DOLA, EIAF (Tier I)",
    amount: 48629,
    year: 2021,
    category: "planning",
    status: "completed",
    purpose:
      "A DOLA grant (matched dollar-for-dollar by the town) to inventory and map the town's water and sewer infrastructure, the groundwork for prioritizing repairs.",
    source: "https://paoniaco.portal.civicclerk.com/event/282/overview",
    sourceLabel: "Council minutes, Sep 14 2021",
  },
  {
    id: "covid-revitalizing-main-streets",
    name: "Revitalizing Main Streets (COVID outdoor dining)",
    funder: "Colorado Dept. of Transportation",
    amount: 21711,
    year: 2021,
    category: "downtown",
    status: "completed",
    purpose:
      "An earlier, smaller CDOT Revitalizing Main Streets grant for pandemic-era outdoor dining infrastructure around Town Hall: tables, bench seating, and bike racks.",
    source: "https://paoniaco.portal.civicclerk.com/event/282/overview",
    sourceLabel: "Council minutes, Sep 14 2021",
  },
  {
    id: "sipa-av-grant",
    name: "Town Hall Sound System",
    funder: "Colorado State Internet Portal Authority (SIPA)",
    amount: 6500,
    year: 2022,
    category: "other",
    status: "completed",
    purpose:
      "A SIPA micro-grant for an audio system in Town Hall, improving access to public meetings.",
    source: "https://paoniaco.portal.civicclerk.com/event/287/overview",
    sourceLabel: "Council minutes, Dec 13 2022",
  },
  {
    id: "epa-brownfields-twin-lakes",
    name: "Brownfields Assessment (Twin Lakes)",
    funder: "U.S. EPA, Brownfields program",
    amount: null,
    amountLabel: "EPA assessment",
    year: 2021,
    category: "environment",
    status: "awarded",
    purpose:
      "An EPA Brownfields assessment to test the Twin Lakes property for contamination, a first step toward putting idle land back into use.",
    source: "https://paoniaco.portal.civicclerk.com/event/301/overview",
    sourceLabel: "Council minutes, Oct 12 2021",
  },
  {
    id: "cdphe-shade-trees",
    name: "Shade Trees for Paonia",
    funder: "Colorado CDPHE (CDC SPAN)",
    amount: 4990,
    year: 2022,
    category: "environment",
    status: "awarded",
    purpose:
      "A public-health 'quick win' grant to plant shade trees in town, tied to heat resilience and walkability.",
    source: "https://paoniaco.portal.civicclerk.com/event/241/overview",
    sourceLabel: "Council minutes, Apr 14 2022",
  },
  {
    id: "space-to-create",
    name: "Space to Create Paonia (pre-development)",
    funder: "Colorado Creative Industries, DOLA & Gates Family Foundation",
    amount: null,
    amountLabel: "$150K+ pre-dev",
    year: 2019,
    category: "arts-culture",
    status: "awarded",
    purpose:
      "Pre-development funding for Space to Create, a state initiative to build affordable live/work housing and shared space for the town's artists and makers.",
    source: "https://paoniaco.portal.civicclerk.com/event/254/overview",
    sourceLabel: "Council minutes, Jan 22 2019",
    notes: "Stacked early funding (CCI $50K, project funds $100K, Gates, a $150K DOLA Space-to-Create fund).",
  },

  // --- Community grants: won by local nonprofits, not the Town. ---
  {
    id: "crg-hearth-center",
    name: "Hearth Community Center",
    funder: "Colorado Creative Industries / OEDIT",
    amount: 650000,
    year: 2022,
    category: "downtown",
    status: "awarded",
    recipient: "The Learning Council",
    isMunicipal: false,
    purpose:
      "A Community Revitalization Grant that built the Hearth Community Center downtown: nonprofit co-working space, a commercial kitchen for food access, a teen-run ice cream parlor, and gathering space.",
    source: "https://thelearningcouncil.org/community-revitalization-grant-recipient/",
    sourceLabel: "The Learning Council",
  },
  {
    id: "just-transition-creative-district",
    name: "Creative District Capacity",
    funder: "Colorado Office of Just Transition",
    amount: 75000,
    year: 2026,
    category: "arts-culture",
    status: "awarded",
    recipient: "North Fork Valley Creative Coalition",
    isMunicipal: false,
    purpose:
      "Three years toward an executive director for the coalition that runs the Paonia Creative District, plus a downtown space for small-business workshops.",
    source: "https://coloradosun.com/2026/03/06/office-of-just-transition-grant-north-fork-valley/",
    sourceLabel: "Colorado Sun",
  },
];

// Verified community-aligned opportunities live in a generated data file,
// regenerated from the research workflow as cycles refresh.
export { OPPORTUNITIES } from "./grants.opportunities";

// ---------------------------------------------------------------------------
// Derived helpers. Keep the page components thin.
// ---------------------------------------------------------------------------

export function formatUSD(amount: number | null): string {
  if (amount == null) return "n/a";
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(amount % 1_000_000 === 0 ? 0 : 1)}M`;
  }
  if (amount >= 1_000) {
    return `$${Math.round(amount / 1_000)}K`;
  }
  return `$${amount.toLocaleString("en-US")}`;
}

export function formatUSDFull(amount: number | null): string {
  if (amount == null) return "n/a";
  return `$${amount.toLocaleString("en-US")}`;
}

const RECEIVED_STATUSES: GrantStatus[] = ["completed", "awarded", "in-progress"];
const PENDING_STATUSES: GrantStatus[] = ["under-review", "applied"];

export function isReceived(g: Grant): boolean {
  return RECEIVED_STATUSES.includes(g.status);
}

export function isPending(g: Grant): boolean {
  return PENDING_STATUSES.includes(g.status);
}

export interface GrantStats {
  totalReceived: number;
  receivedCount: number;
  inProgressCount: number;
  pendingCount: number;
  pendingAmount: number;
  byCategory: { category: GrantCategory; total: number; count: number }[];
  span: { from: number; to: number } | null;
}

// Town-money stats only. Grants won by local nonprofits (isMunicipal:false) are
// filtered out here so they can never be folded into the town's totals, no
// matter what the caller passes in.
export function computeStats(grants: Grant[]): GrantStats {
  const municipal = grants.filter(isMunicipal);
  const received = municipal.filter(isReceived);
  const pending = municipal.filter(isPending);

  const totalReceived = received.reduce((sum, g) => sum + (g.amount ?? 0), 0);
  const pendingAmount = pending.reduce((sum, g) => sum + (g.amount ?? 0), 0);

  const catMap = new Map<GrantCategory, { total: number; count: number }>();
  for (const g of received) {
    const entry = catMap.get(g.category) ?? { total: 0, count: 0 };
    entry.total += g.amount ?? 0;
    entry.count += 1;
    catMap.set(g.category, entry);
  }
  const byCategory = [...catMap.entries()]
    .map(([category, v]) => ({ category, ...v }))
    .sort((a, b) => b.total - a.total);

  const years = received
    .map((g) => g.year)
    .filter((y): y is number => y != null);
  const span = years.length
    ? { from: Math.min(...years), to: Math.max(...years) }
    : null;

  return {
    totalReceived,
    receivedCount: received.length,
    inProgressCount: municipal.filter((g) => g.status === "in-progress").length,
    pendingCount: pending.length,
    pendingAmount,
    byCategory,
    span,
  };
}

// Split grants for the forward-looking layout. "Active" = money in motion now;
// "track record" = older completed/awarded wins kept for credibility.
export function isMunicipal(g: Grant): boolean {
  return g.isMunicipal !== false;
}

const ACTIVE_STATUSES: GrantStatus[] = ["in-progress", "under-review", "applied"];

export function isActive(g: Grant): boolean {
  return ACTIVE_STATUSES.includes(g.status);
}

// ---------------------------------------------------------------------------
// Deadline parsing: turn free-text "next due" into a sortable key so the
// "coming up" view can order opportunities by when they are actually due.
// ---------------------------------------------------------------------------

const MONTHS: Record<string, number> = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
};

export interface DeadlineInfo {
  // Every concrete calendar date found in the text, as sortable YYYYMMDD keys,
  // ascending. Empty when the text carries no real date (closed, undated, or a
  // bare year / fiscal-year range like "2026-27" that is not an actual deadline).
  keys: number[];
  // True when the program accepts applications on a rolling basis.
  rolling: boolean;
}

// These notes are free-text, often truncated, and frequently describe a closed
// or not-yet-posted cycle. We deliberately read only concrete, valid calendar
// dates out of them: a real month name with a year, or an ISO date with a month
// in 1-12. We do NOT invent a deadline from a bare year (that used to turn
// "Closed for 2026" into a fake Dec-31 deadline) and we reject fiscal-year
// ranges like "2026-27" (month "27" is not a month). If we cannot find a real
// future date, the program is simply left out of "coming up" rather than shown
// with a fabricated one.
// A YYYYMMDD key for a real calendar date, or null if the day does not exist
// (e.g. "2026-02-31" or "June 99, 2026"). The Date round-trip rejects impossible
// days, including non-leap Feb 29. A day of 1 stands in for month-only mentions.
function calendarKey(year: number, month: number, day: number): number | null {
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  const d = new Date(year, month - 1, day);
  if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) {
    return null;
  }
  return year * 10000 + month * 100 + day;
}

export function parseDeadline(text?: string): DeadlineInfo {
  if (!text) return { keys: [], rolling: false };
  const t = text.toLowerCase();
  const rolling =
    /rolling|ongoing|continuous|year[-\s]?round|anytime|no deadline|open now|recurring/.test(t);

  const keys = new Set<number>();
  let m: RegExpExecArray | null;
  const add = (k: number | null) => {
    if (k != null) keys.add(k);
  };

  // ISO date: 2026-03 or 2026-03-15. Month must be 01-12; the (?!\d) guard keeps
  // fiscal ranges ("2026-27", "2026-2027") from being misread as a date.
  const iso = /(20\d\d)-(0?[1-9]|1[0-2])(?:-([0-3]?\d))?(?!\d)/g;
  while ((m = iso.exec(t))) {
    add(calendarKey(+m[1], +m[2], m[3] ? +m[3] : 1));
  }

  // Month name (+ optional day) + year, e.g. "June 5, 2026" or "July 2026".
  const mn =
    /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+(\d{1,2})?(?:,?\s*)?(20\d\d)/g;
  while ((m = mn.exec(t))) {
    add(calendarKey(+m[3], MONTHS[m[1]], m[2] ? +m[2] : 1));
  }

  return { keys: [...keys].sort((a, b) => a - b), rolling };
}

export interface DatedOpportunity {
  opp: Opportunity;
  // The next deadline at or after the reference date, as a YYYYMMDD key.
  sortKey: number;
}

// Today as a YYYYMMDD key. Call this at request time (in a server component)
// and pass the result down, so date-sensitive views are computed once against a
// single reference date rather than drifting between server and client renders.
export function todayKey(d: Date = new Date()): number {
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

// Opportunities whose next concrete deadline is still ahead of `asOf`, soonest
// first. Powers the "coming up" calendar. `asOf` is a YYYYMMDD key supplied by
// the caller (computed at request time) so the list is never frozen at build
// time. Rolling, undated, closed, and already-passed deadlines are excluded
// here; the full set lives in "what Paonia could pursue".
export function upcomingOpportunities(
  opps: Opportunity[],
  asOf: number
): DatedOpportunity[] {
  const dated: DatedOpportunity[] = [];
  for (const opp of opps) {
    const next = parseDeadline(opp.nextDeadline).keys.find((k) => k >= asOf);
    if (next != null) dated.push({ opp, sortKey: next });
  }
  return dated.sort((a, b) => a.sortKey - b.sortKey);
}
