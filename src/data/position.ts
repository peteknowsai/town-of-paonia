// Single source of truth for /administrator — the Town Administrator search.
// Editorial content lives here (versioned, diff-reviewable) on purpose: the
// conduct-only candidate criteria below are a legal guardrail, and keeping them
// in git means a reviewer catches a violation in the diff, not after the fact.
//
// Dynamic state (expressions of interest, committee sign-ups, search status)
// belongs in Convex once it is wired. See specs/admin-search.md.

export type SearchStatus = "open" | "paused" | "filled";

// Each criterion MUST be a job-relevant professional competency plus the kind of
// PUBLIC-RECORD basis that demonstrates it. By design there is no field for
// belief, identity, or lifestyle. Do not add one.
export type IdealCandidate = {
  competency: string;
  evidence: string;
};

export type LedgerRow = {
  phase: string;
  firmDoes: string; // billed, and behind closed doors
  weDo: string; // in the open
  coverage: "replaces" | "scaffolds" | "declined";
};

export type Channel = {
  name: string;
  tier: "tier1" | "values" | "broad";
  audience: string;
  note?: string;
};

export type CostPoint = {
  label: string;
  amount: string;
  detail: string;
};

// Placeholder composition. The committee is being recruited now; membership is
// open and self-nominated (see the sign-up). These slots show the cross-section
// we are aiming for, not real people.
export type CommitteeSlot = {
  role: string;
  blurb: string;
};

export type Position = {
  status: SearchStatus;
  asOf: string; // human-readable stamp
  title: string;
  place: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
  challenges: string[];
  pay: { range: string; note: string };
  idealCandidate: IdealCandidate[];
  committee: { lead: string; members: CommitteeSlot[] };
  ledger: LedgerRow[];
  channels: Channel[];
  costPoints: CostPoint[];
};

export const position: Position = {
  status: "open",
  asOf: "Spring 2026",
  title: "Town Administrator",
  place: "Paonia, Colorado",

  intro:
    "Paonia is looking for a Town Administrator. This page is the job, told honestly. " +
    "It is the part of a search that a firm would charge a town tens of thousands of dollars to produce, " +
    "and it is free, public, and written by people who actually live here.",

  sections: [
    {
      heading: "Why Paonia",
      body: [
        "Paonia is a small town of about 1,500 people on the high mesas of the North Fork Valley, under the West Elk Mountains in western Colorado. It is orchard and vineyard country, organic and biodynamic farms, a working main street, and some of the darkest night skies left in the state.",
        "It is also a town with a Waldorf-inspired public school, a real arts and music scene, and a population that pays attention to how it is governed. People here notice when something is off, and they say so. That is not a warning. It is the best part of the job.",
        "This is not a place that wants to become somewhere else. The right administrator is someone who sees what Paonia already is and helps it stay that way while it runs well.",
      ],
    },
    {
      heading: "What this job actually is",
      body: [
        "The Town Administrator is the chief executive the Board of Trustees hires to run the day to day work of the town: the budget, the staff, the water and public works, the contracts, the permits, and the thousand small things that keep a town working.",
        "In a town this size you do not direct the work from a distance. You do the work. The administrator wears many hats and answers to a Board of elected trustees, who answer to their neighbors.",
      ],
    },
    {
      heading: "How Paonia works",
      body: [
        "Paonia is a statutory town governed by a Board of Trustees. The Board sets policy and hires the administrator. The administrator carries it out and serves the whole town, not any one faction.",
        "The Board, not this page and not the people who built it, makes the hire. What this page does is tell you the truth about the job so the right person comes forward.",
      ],
    },
  ],

  challenges: [
    "The town is between administrators. This is an open, real search, not a formality.",
    "Trust between residents and town hall needs rebuilding after a turbulent stretch. The right person treats that as the job, not an annoyance.",
    "In spring 2026 the Board voted to disable and then remove the Verkada surveillance cameras the town had installed in public spaces months earlier, after sustained public pressure about filming residents and children. We want an administrator who understands why a town would not want that, not one who has to have it explained.",
    "It is a lean organization. The administrator does real work with a small staff and a small budget, in a place where water, agriculture, and a tourism economy all have to be balanced honestly.",
  ],

  pay: {
    range: "$85,000 to $120,000",
    note:
      "That is the salary range the Board of Trustees set for its last administrator search, in 2023. The Board sets the actual compensation and may revisit the range. We would rather be honest about it now than waste a good candidate's time later.",
  },

  // Conduct and record only. Every line is something a person has DONE, that you
  // can check in a public record. Nothing here is about who someone is.
  idealCandidate: [
    {
      competency: "Sound judgment on technology and surveillance procurement",
      evidence:
        "A public record of how you have handled vendor contracts and resident privacy: what you bought, what you declined, and why.",
    },
    {
      competency: "Fiscal stewardship of a small or rural government",
      evidence:
        "Balanced budgets, clean audits, and honest public reporting that anyone can find and read.",
    },
    {
      competency: "Land use that protects working farms and night skies",
      evidence:
        "Ordinances, plans, or decisions you have shaped on agricultural land, growth, or outdoor lighting.",
    },
    {
      competency: "Treating arts and local culture as public goods",
      evidence:
        "Grants, partnerships, or programs you have backed that supported local arts, music, or creative life.",
    },
    {
      competency: "Open, accountable government",
      evidence:
        "A demonstrated practice of open meetings, prompt public records, and plain talk with residents.",
    },
    {
      competency: "Doing the work in a lean organization",
      evidence:
        "A track record running a small staff where the administrator does the work, not just directs it.",
    },
  ],

  committee: {
    lead:
      "A committee of Paonia residents, a cross-section of the town, will talk with candidates and bring recommendations to the Board. The person who built this tool is running for mayor and is not on the committee and does not decide who is hired.",
    // Placeholder slots showing the intended spread. Sign up to fill one.
    members: [
      { role: "A fruit grower", blurb: "Someone who has farmed the valley and knows what the land needs from town hall." },
      { role: "A schoolteacher or parent", blurb: "Someone invested in the next generation of Paonians." },
      { role: "A small-business owner", blurb: "Someone who meets the town's economy on Main Street every day." },
      { role: "A longtime resident", blurb: "Someone who remembers what works here and what has been tried before." },
      { role: "An artist or musician", blurb: "Someone who keeps the culture of the place alive." },
      { role: "A newcomer", blurb: "Someone who chose Paonia recently and can say why." },
    ],
  },

  // The free-vs-firm story, phase by phase. Costs are sourced and conservative.
  ledger: [
    {
      phase: "1. Define the job and the ideal candidate",
      firmDoes: "Private interviews with the council produce a candidate profile you never see.",
      weDo: "The profile is this page. The criteria are public and you are reading them.",
      coverage: "replaces",
    },
    {
      phase: "2. The recruitment brochure",
      firmDoes: "A designed PDF, often the most expensive single deliverable, mailed out and buried on a job board.",
      weDo: "You are reading it. Free, public, and updatable the day anything changes.",
      coverage: "replaces",
    },
    {
      phase: "3. Advertising and outreach",
      firmDoes: "Posts to a handful of job boards and makes private calls from a proprietary list.",
      weDo: "Posts to every aligned network we can reach, and shows you exactly where. Personal outreach is done by a real person.",
      coverage: "replaces",
    },
    {
      phase: "4. Screening",
      firmDoes: "Private scoring, and a confidential report on who was screened out and why.",
      weDo: "We do not do this. In a town this small, a 'rejected and why' file just exposes real neighbors. A citizens' committee talks to people instead.",
      coverage: "declined",
    },
    {
      phase: "5. Background and references",
      firmDoes: "Vendor checks on the finalists.",
      weDo: "The Board's process. We do not touch it.",
      coverage: "scaffolds",
    },
    {
      phase: "6. Interviews",
      firmDoes: "Designs and runs the interviews behind closed doors.",
      weDo: "The citizens' committee talks with candidates, and with consent, finalist conversations are published to the town.",
      coverage: "scaffolds",
    },
    {
      phase: "7. Offer and negotiation",
      firmDoes: "Benchmarks salary and relays the offer.",
      weDo: "The pay range is public above. The Board negotiates the hire.",
      coverage: "scaffolds",
    },
  ],

  channels: [
    { name: "ICMA Job Center", tier: "tier1", audience: "The national association of local-government managers." },
    { name: "Colorado Municipal League CareerLink", tier: "tier1", audience: "Every municipality in Colorado.", note: "Free for member towns." },
    { name: "Colorado City & County Management Association", tier: "tier1", audience: "Colorado's town and city managers." },
    { name: "ELGL", tier: "tier1", audience: "The newer, innovation-minded end of local government." },
    { name: "DarkSky International community", tier: "values", audience: "People who care about protecting night skies." },
    { name: "Strong Towns and New Urbanism networks", tier: "values", audience: "Small-town and walkability-minded leaders." },
    { name: "Urban Sustainability Directors Network", tier: "values", audience: "Local-government sustainability professionals." },
    { name: "Americans for the Arts job bank", tier: "values", audience: "People who treat culture as public policy." },
    { name: "MPA program career offices", tier: "values", audience: "Up-and-coming public administrators (CU Denver, CSU)." },
    { name: "GovernmentJobs.com", tier: "broad", audience: "The highest-traffic public-sector board." },
    { name: "Careers in Government", tier: "broad", audience: "General public-sector reach." },
  ],

  costPoints: [
    { label: "Minturn, Colorado", amount: "$19,500", detail: "All-in town manager search by a Colorado firm. The closest comparable to Paonia." },
    { label: "A typical small-town search", amount: "$20,000 to $28,000+", detail: "Flat professional fee plus advertising, travel, and background-check expenses." },
    { label: "A mid-size city search", amount: "~$45,000", detail: "What the same work costs a larger city." },
  ],
};

export function isOpen(p: Position): boolean {
  return p.status === "open";
}
