// Paonia water-system rebuild: the data behind the tracker.
//
// This file is the single source of truth for the /water dashboard. Every fact
// here is meant to be sourced and, where it matters (dollar amounts, dates,
// project status, rates, key numbers), independently verified before it ships.
// Following the same rule as the rest of this site: where a fact could not be
// verified, it is LEFT OUT rather than guessed. Each item carries its own
// `sources`, and each carries a `confidence` so the page can be honest about
// what is solid and what is still soft.
//
// Update this file as the Town publishes new agendas, budgets, grant awards,
// and engineering reports. The page reads only from here.

export type ProjectStatus =
  | "planning"
  | "design"
  | "funded"
  | "bidding"
  | "construction"
  | "substantially-complete"
  | "complete"
  | "stalled"
  | "unknown";

export type AlertKind = "success" | "watch" | "problem" | "info";
export type Confidence = "high" | "medium" | "low";
export type FundingType = "grant" | "loan" | "match" | "mixed" | "unknown";
export type TimelineStatus = "done" | "in-progress" | "planned" | "unknown";

/** A citation. `quote` is a short verbatim excerpt when we have one. */
export interface Source {
  title: string;
  url: string;
  date?: string;
  quote?: string;
}

/** Funding attached to a single project (a lighter view than the FundingItem). */
export interface ProjectFunding {
  source: string;
  amount?: string;
  type?: string;
}

export interface WaterProject {
  /** Stable slug, also used as the anchor id, e.g. "treatment-plant". */
  id: string;
  name: string;
  /** One line a newcomer can grasp. */
  summary: string;
  /** What the thing physically is. */
  whatItIs?: string;
  /** The scope of work. */
  scope?: string;
  status: ProjectStatus;
  /** Plain-language note on where it actually stands. */
  statusNote: string;
  /** 0-100 if genuinely known, else null. Never invented. */
  percentComplete: number | null;
  startDate?: string;
  targetDate?: string;
  funding: ProjectFunding[];
  /** Why a resident should care. */
  whyItMatters: string;
  /** Longer drill-in detail (plain text / light markdown). */
  detail?: string;
  confidence: Confidence;
  sources: Source[];
}

export interface FundingItem {
  source: string;
  program?: string;
  amount?: string;
  /** Clean number for totals/bars, else null. */
  amountNumeric: number | null;
  type: FundingType;
  year?: string;
  fundsWhat: string;
  confidence: Confidence;
  sources: Source[];
}

export interface Alert {
  kind: AlertKind;
  title: string;
  detail: string;
  date?: string;
  /** id of a related project, if any. */
  relatedProject?: string;
  confidence: Confidence;
  sources: Source[];
}

export interface Kpi {
  label: string;
  value: string;
  context: string;
  confidence: Confidence;
  sources: Source[];
}

export interface TimelineItem {
  date: string;
  label: string;
  detail?: string;
  status: TimelineStatus;
}

export interface WaterData {
  /** Where the rebuilt system is headed, in plain language. */
  vision: string;
  /** 2-3 plain sentences a newcomer can grasp. */
  overview: string;
  /** The holistic-vision-vs-brass-tacks framing. Plain paragraph, may be "". */
  approachNote: string;
  /** Honest one-liner about how complete/current this data is. */
  dataConfidenceNote: string;
  /** Human date this data was last reviewed. */
  lastUpdated: string;
  projects: WaterProject[];
  funding: FundingItem[];
  alerts: Alert[];
  kpis: Kpi[];
  timeline: TimelineItem[];
  /** Things we cannot confirm yet, phrased as questions residents could ask. */
  openQuestions: string[];
  allSources: Source[];
}

// The Town's official water-bill page and main site. Hard-coded here so the
// water feature stays self-contained and never breaks if the shared links
// module is not present.
export const OFFICIAL = {
  site: "https://townofpaonia.colorado.gov",
  payWater: "https://townofpaonia.colorado.gov/i-want-to/pay-water-bill",
  agendaPortal: "https://paoniaco.portal.civicclerk.com",
} as const;

// ---------------------------------------------------------------------------
// DATA. Built from the Town's own budgets, engineering reports, state finance
// documents (CWRPDA, DOLA, CWCB, Bureau of Reclamation), water-quality reports,
// and Board of Trustees meeting records through May 2026, cross-checked against
// local reporting. Confidence is marked honestly; uncertain figures are flagged
// rather than dropped, and open questions list what the record does not answer.
// ---------------------------------------------------------------------------

// Frequently cited sources, named once and reused below.
const S = {
  cwrpda: {
    title: "CWRPDA Project Finance Committee, March 2025 (Paonia DWRF credit report)",
    url: "https://www.cwrpda.com/files/187df889c/PFC+Agenda+March+2025+-+Final+-+Linked+v4.pdf",
    date: "Mar 2025",
  },
  taReport: {
    title: "Town of Paonia 1st Quarter 2025 Administrator's Report",
    url: "https://townofpaonia.colorado.gov/sites/townofpaonia/files/documents/1st%20Quarter%202025%20TA%20Report_f.pdf",
    date: "Mar 2025",
  },
  budget24: {
    title: "Town of Paonia FY-2024 Budget",
    url: "https://townofpaonia.colorado.gov/sites/townofpaonia/files/documents/FY-2024%20BUDGET_f_0.pdf",
    date: "Dec 2023",
  },
  jds: {
    title: "Paonia Water System Evaluation (DRAFT), JDS-Hydro Consultants",
    url: "https://townofpaonia.colorado.gov/sites/townofpaonia/files/DRAFT-Infrastructure%20Analysis_JDSHydro_Redacted_2.pdf",
    date: "May 2021",
  },
  restrictions: {
    title: "Town of Paonia: Stage One Water Restrictions Starting August 1st",
    url: "https://townofpaonia.colorado.gov/news-article/town-of-paonia-to-implement-stage-one-water-restrictions-starting-august-1st",
    date: "Jul 2025",
  },
  watersmart2: {
    title: "Town of Paonia Selected for Second WaterSMART Grant",
    url: "https://townofpaonia.colorado.gov/news-article/town-of-paonia-selected-for-second-watersmart-grant-to-improve-water-infrastructure",
    date: "Mar 2026",
  },
  npr: {
    title: "How a 'Perfect Storm' Cut Off Water to This Colorado Town (NPR)",
    url: "https://www.npr.org/2019/07/24/744236308/how-a-perfect-storm-cut-off-water-to-this-colorado-town",
    date: "Jul 2019",
  },
  fy26: {
    title: "Paonia FY26 Draft Budget (High Country Spotlight)",
    url: "https://www.highcountryspotlight.com/local_news/civically_engaged/paonia-fy26-draft-budget-it-s-not-cheap-to-run-a-town-of-1-500/article_cc9f95a8-9fb4-40c5-beb8-8077a4c9f640.html",
    date: "Oct 2025",
  },
  hydro: {
    title: "Hydrogeological Study Presented to Paonia Trustees (High Country Spotlight)",
    url: "https://highcountryspotlight.com/spotlight/civically_engaged/hydrogeological-study-presented-to-paonia-trustees/article_3ecf711a-d77f-11ef-a89e-9b5adcf31bc1.html",
    date: "Jan 2025",
  },
  cwcb: {
    title: "Hydrogeological Study of Paonia Spring Complexes (Colorado CWCB project record)",
    url: "https://socgov19.my.salesforce-sites.com/DNRProjectDetail?recordId=a0I5Y000016NqbzUAC&projectRecordType=Funding_Projects",
    date: "Sep 2023",
  },
  watersmartApply: {
    title: "Paonia applies for WaterSMART Planning Grant (Delta County Independent)",
    url: "https://coyotegulch.blog/2023/10/22/paonia-applies-for-watersmart-planning-grant-the-delta-county-independent/",
    date: "Oct 2023",
  },
  rate2026: {
    title: "Notice of 2026 Water Rate Adjustment",
    url: "https://townofpaonia.colorado.gov/news-article/notice-of-2026-water-rate-adjustment-effective-in-the-february-billing",
    date: "Jan 2026",
  },
  res10: {
    title: "Town of Paonia Resolution No. 10-2025 (Clarifying Water Taps)",
    url: "https://townofpaonia.colorado.gov/sites/townofpaonia/files/documents/R%2010-2025%20-%20Clarifying%20Water%20Taps.pdf",
    date: "Mar 2025",
  },
  dci2024: {
    title: "Taking a closer look at Paonia's water plant (Delta County Independent)",
    url: "https://www.deltacountyindependent.com/news/north-fork/taking-a-closer-look-at-paonias-water-plant/article_95a1cf3e-4056-5101-a444-1573dbe26773.html",
    date: "2024",
  },
  portal: {
    title: "Paonia Board of Trustees meeting records (CivicClerk portal)",
    url: "https://paoniaco.portal.civicclerk.com",
    date: "2024 to 2026",
  },
  eiaf: {
    title: "Energy & Mineral Impact Assistance Fund awards (Colorado DOLA)",
    url: "https://dlg.colorado.gov/EIAF-funding-awards",
    date: "2025",
  },
  swep: {
    title: "Bureau of Reclamation FY2024 Small-Scale Water Efficiency Project descriptions (Town of Paonia, Municipal Meters for Water Efficiency)",
    url: "https://www.usbr.gov/watersmart/swep/docs/2024/FY24-R3_SWEP_ProjectDescriptions.pdf",
    date: "2024",
    quote:
      "The Town of Paonia in Delta County, Colorado, will upgrade 23 water meters and integrate them into a radio-read metering system allowing for automatic meter readings.",
  },
} as const;

export const WATER: WaterData = {
  vision:
    "Paonia's drinking water comes from about 32 mountain springs high on Mt. Lamborn and Landsend Peak, and engineers note that most of that snowmelt still runs off unused into the North Fork of the Gunnison. The goal of the rebuild is a resilient system managed as one connected whole, from the source to the tap: protect and better capture the spring water, store more of it, bring the idle second plant and tank back for redundancy, replace the century-old pipe that loses roughly a third of what the town treats, meter the whole system, and make the supply reliable enough to lift the new-tap moratorium that has stood since 2020. The town is writing that holistic source-to-tap strategy now, while it builds the most urgent fixes first.",
  overview:
    "A 2019 crisis cut off water to most of Paonia for 13 days, and a 2023 state survey confirmed the system was fragile and aging. The town is rebuilding it in phases. The current Phase 1, about $11 million, relines the town's only in-service storage tank, replaces the failing West Loop pipe, and meters the springs, paid for mostly by a state loan with $3 million forgiven plus grants. In the meantime residents live with a tap moratorium, water rates rising every year through 2029, and mandatory summer water restrictions.",
  approachNote:
    "Two ideas run through the town's water records. The holistic one treats the springs, watershed health, wildfire risk, raw-water storage, ditch users, water rights, and demand as a single system from source to tap. It shows up in the 2010 Source Water Protection Plan, in a 2021 engineering evaluation that priced routing spring water down through the watershed into storage such as an expanded Roeber Reservoir, and most clearly in the town's 2023 WaterSMART Water Strategy, a roughly $500,000 planning effort backed by state and river-district money and now being written by Wright Water Engineers through 2027. The current work, Phase 1, is narrower and more urgent: reline the tank, replace the worst pipe, meter the springs. These were never two rival plans put head to head. The engineers recommended doing the cheaper distribution and tank fixes first and deferring the watershed-scale storage and conveyance, and the town did exactly that. The holistic strategy was not dropped. It is being studied and written while the pipes and tank get built. The open question for residents is whether the bigger vision stays funded and actually follows the brass-tacks fixes.",
  dataConfidenceNote:
    "This tracker is compiled from the Town's own budgets, engineering reports, state finance documents, water-quality reports, and Board meeting records through May 2026, cross-checked against news coverage. Dollar figures, dates, and statuses change. Confirm anything that matters against the official Town records on the CivicClerk portal and CWRPDA.",
  lastUpdated: "May 30, 2026",

  projects: [
    {
      id: "phase-1",
      name: "Phase 1: the urgent fixes",
      summary:
        "The first stage of the multi-phase rebuild: reline the 2-million-gallon storage tank, replace the failing West Loop pipe, and meter the spring sources. Budgeted at about $11 million.",
      whatItIs:
        "A bundle of the three most urgent repairs the 2023 state survey flagged, plus a temporary tank to keep water flowing during construction.",
      scope:
        "Raw-water metering at the springs, relining the 2-MG finished-water tank, and replacing the West Loop distribution line, run concurrently to save time and money.",
      status: "construction",
      statusNote:
        "Under way through 2025 and 2026. The tank relining is in its final stretch and the West Loop is heading to bid. No overall completion date has been announced.",
      percentComplete: null,
      startDate: "2025",
      targetDate: "",
      funding: [
        { source: "CWRPDA state loan (with $3M forgiven)", amount: "$9,744,000", type: "loan" },
        { source: "DOLA EIAF grant", amount: "$956,000", type: "grant" },
        { source: "State design and engineering grant", amount: "$300,000", type: "grant" },
      ],
      whyItMatters:
        "Phase 1 fixes the deficiencies behind the 2019 shutoff and is the town's stated prerequisite to one day lifting the new-tap moratorium.",
      detail:
        "The town picked the 'do all three at once' option over doing nothing or doing them one at a time, on the engineers' advice that concurrent work was cheaper and faster. The engineer's preliminary cost estimate (RESPEC and SGM, March 2025) put the package at about $10.5 million: raw-water metering near $541,000, tank relining about $2.15 million, and the West Loop about $5.15 million.",
      confidence: "high",
      sources: [S.cwrpda, S.taReport],
    },
    {
      id: "tank-relining",
      name: "2-million-gallon tank relining",
      summary:
        "Rehabilitating the town's only in-service treated-water tank. To do it, the tank came offline and a 725,000-gallon temporary tank took its place, cutting storage by about two-thirds.",
      whatItIs:
        "Recoating and repairing the single welded-steel 2-MG tank at the Lamborn plant that holds all of the town's finished drinking water.",
      scope:
        "Reline and repair the 2-MG tank; install and run a 725,000-gallon temporary tank during construction.",
      status: "construction",
      statusNote:
        "Site work was reported nearly finished in early 2025. The contractor then missed the March 24, 2026 substantial-completion deadline with work unfinished, so the town began charging liquidated damages (reported at $300 per day, rising to $1,000 per day). As of late May 2026 the town was awaiting the final inspection.",
      percentComplete: null,
      startDate: "2025",
      targetDate: "",
      funding: [{ source: "DOLA EIAF grant", amount: "$956,000", type: "grant" }],
      whyItMatters:
        "It is the town's only finished-water storage in service. Taking it offline is why mandatory water restrictions have been in place since August 2025.",
      detail:
        "The job ran into repeated surprises: an unrecorded buried concrete structure, a pipe that turned out to be steel rather than ductile iron, a leaking tank tap, and added inspection change orders, plus a break at the old 1-MG tank. The town later moved to convert the temporary tank into permanent raw-water storage rather than remove it.",
      confidence: "high",
      sources: [S.restrictions, S.taReport, S.portal],
    },
    {
      id: "west-loop",
      name: "West Loop pipe replacement",
      summary:
        "Replacing nearly two miles of failing steel water main with modern PVC and HDPE pipe, and moving the line out of private yards into the public right-of-way.",
      whatItIs:
        "Replacement and realignment of the roughly 10,500-foot West Loop distribution line into town.",
      scope:
        "About 10,500 feet of steel pipe replaced with 12-inch PVC and 16-inch HDPE, rerouted into public right-of-way. Estimated cost about $5.15 million.",
      status: "bidding",
      statusNote:
        "At about 90 to 95 percent design with engineer RESPEC, and scheduled to go out for construction bids in spring 2026.",
      percentComplete: null,
      startDate: "2025",
      targetDate: "2026",
      funding: [
        { source: "DOLA EIAF grant", amount: "$1,000,000", type: "grant" },
        { source: "State revolving-fund loan", amount: "$4,152,828", type: "loan" },
      ],
      whyItMatters:
        "About half of the town's 2023 water-main leaks were on this one 8-inch steel line. Replacing it is the town's main lever against heavy water loss.",
      detail:
        "Moving the main out of private property also ends access and easement problems that made past leaks hard to reach and repair.",
      confidence: "high",
      sources: [S.taReport, S.watersmart2],
    },
    {
      id: "raw-water-metering",
      name: "Raw-water metering at the springs",
      summary:
        "Adding real-time flow and temperature monitoring at the mountain spring sources, so the town can finally measure how much source water it actually has.",
      whatItIs:
        "Metering and rehabilitation of the spring collection structures that feed the system.",
      scope:
        "Rehabilitate spring structures and install real-time flow and temperature meters at the raw-water sources. Engineer's estimate about $541,000.",
      status: "funded",
      statusNote:
        "Funded in part by a $250,000 Bureau of Reclamation WaterSMART grant. As of early 2025 the town was awaiting the federal notice to proceed.",
      percentComplete: null,
      startDate: "2025",
      targetDate: "",
      funding: [{ source: "Bureau of Reclamation WaterSMART grant", amount: "$250,000", type: "grant" }],
      whyItMatters:
        "Many spring pipes are unmetered and several springs are not well contained, so the town cannot currently gauge its supply, especially in a drought. In the 2019 crisis the springs ran at roughly half their normal flow.",
      detail: "",
      confidence: "high",
      sources: [S.taReport, S.budget24],
    },
    {
      id: "water-strategy",
      name: "Comprehensive Water Strategy (source to tap)",
      summary:
        "The holistic plan: a watershed-scale study of the springs, storage, and demand, meant to guide the system for the long term. Now being written, funded by federal and state grants.",
      whatItIs:
        "A Bureau of Reclamation WaterSMART 'Water Strategy' and a hydrogeological study of the spring complexes, the source-side counterpart to the brass-tacks Phase 1 work.",
      scope:
        "Map the 32 springs and their recharge, find ways to capture more raw water, study storage and source protection, and engage agriculture, ditch users, and the out-of-town water companies, from the springs all the way to residents' taps.",
      status: "planning",
      statusNote:
        "The town applied for the WaterSMART Water Strategy grant in October 2023 and won it. Wright Water Engineers was contracted in January 2026 for about $511,876 to do the second-phase hydrogeology and write the strategy, running through September 2027.",
      percentComplete: null,
      startDate: "2023",
      targetDate: "2027",
      funding: [
        { source: "Bureau of Reclamation WaterSMART (planning effort ~$500,113 total)", amount: "~$250,000 federal", type: "grant" },
        { source: "Colorado Water Conservation Board (spring hydrogeology study)", amount: "~$123,000", type: "grant" },
        { source: "Colorado River District and Gunnison Basin Roundtable", amount: "$50,000", type: "grant" },
      ],
      whyItMatters:
        "This is the holistic, whole-watershed view of Paonia's water. Whether it stays funded and is actually carried out, rather than the town stopping at the urgent pipe-and-tank fixes, is the big open question for the system's future.",
      detail:
        "In the town's own words, it sought 'a holistic, comprehensive, and systemic investigation of its complex water sources to inform an effective strategic water plan that includes the beginning of the source waters to the customer's taps.' The first piece, a hydrogeological study of the spring complexes, was presented to trustees in January 2025. Engineers have long noted that most of the mountain's water runs off unused into the North Fork; the strategy is meant to find ways to capture and store more of it.",
      confidence: "high",
      sources: [S.watersmartApply, S.cwcb, S.hydro, S.portal],
    },
    {
      id: "raw-water-storage",
      name: "Raw-water storage (Roeber Reservoir)",
      summary:
        "More raw-water storage so the town can capture spring runoff and ride out drought. Engineers point to expanding Roeber Reservoir as the best option, but it is studied, not funded.",
      whatItIs:
        "The watershed-scale storage piece of the long-term vision: holding more of the spring water that now runs off downstream.",
      scope:
        "The 2021 evaluation costed several storage options. It called an expanded Roeber (Reynolds) Reservoir the best and most viable, at about $1.6 million, over enlarging Lone Cabin Reservoir (about $5.25 million), relining Todd Reservoir, or new buried tanks.",
      status: "planning",
      statusNote:
        "Recommended in the 2021 engineering evaluation and carried into the comprehensive strategy, but no funded or adopted Roeber expansion project was found in the record. It sits behind Phase 1 by design.",
      percentComplete: null,
      startDate: "",
      targetDate: "",
      funding: [],
      whyItMatters:
        "Storage is what would let the town capture the snowmelt it now loses and serve growth and drought without another shutoff. It is the clearest example of the holistic work that has been deferred.",
      detail:
        "The same evaluation also priced a lowest-priority option to build new gravity pipelines to route spring water down through the watershed to whichever plant needs it, about 15,150 feet of line for roughly $1.8 million. That is the 'bring the water down into the watershed' idea, costed but not selected.",
      confidence: "medium",
      sources: [S.jds, S.hydro],
    },
    {
      id: "clock-plant",
      name: "Clock plant and 1-MG tank (idle)",
      summary:
        "The town's second treatment plant and its 1-million-gallon tank have sat idle since 2014. Bringing them back would give the system a backup it does not have today.",
      whatItIs:
        "The lower Clock treatment plant and its below-grade concrete 1-MG storage tank.",
      scope:
        "Inspect and repair the Clock plant and 1-MG tank for a return to service. Not part of funded Phase 1 work.",
      status: "stalled",
      statusNote:
        "Idle since 2014, used only briefly in the 2019 emergency. The 1-MG concrete tank is not sealed against animals and insects and is out of service. The 2023 survey recommended a full inspection before any return to service.",
      percentComplete: null,
      startDate: "",
      targetDate: "",
      funding: [],
      whyItMatters:
        "With Clock offline, the town runs on a single plant and a single tank. That lack of redundancy is what turned the 2019 leaks into a full crisis.",
      detail: "",
      confidence: "high",
      sources: [S.budget24],
    },
    {
      id: "lamborn-mesa",
      name: "Lamborn Mesa pipe replacement",
      summary:
        "A four-phase effort to replace about 17,800 feet of pipe on Lamborn Mesa, much of it 70 to 80 years old. Reported about halfway done as of 2024.",
      whatItIs:
        "Ongoing replacement of old distribution pipe on Lamborn Mesa, related to but distinct from the Phase 1 West Loop work.",
      scope: "Replace roughly 17,800 feet of aging pipe in four phases.",
      status: "construction",
      statusNote:
        "Reported about halfway complete in a 2024 profile of the water system. No single public document lays out its full scope and schedule.",
      percentComplete: 50,
      startDate: "",
      targetDate: "",
      funding: [],
      whyItMatters:
        "Aging steel pipe is the chief source of leaks and lost water across the system.",
      detail: "",
      confidence: "medium",
      sources: [S.dci2024],
    },
    {
      id: "lees-trailer-court",
      name: "Lee's Trailer Court water meters",
      summary:
        "A second WaterSMART grant to upgrade 23 water meters on the north edge of town into a modern radio-read system, so the town gets more frequent consumption data to find leaks.",
      whatItIs:
        "A meter-modernization project: replacing 23 aging water meters at one trailer court and integrating them into a radio-read metering system for automatic reads.",
      scope:
        "Upgrade 23 water meters into a radio-read metering system for automatic meter reading. Total project cost about $235,594, with $116,000 in federal funds and the rest a local match.",
      status: "funded",
      statusNote:
        "Selected for $116,000 in federal WaterSMART funds toward a $235,594 project, with the balance a local match. As of early 2026 the grant agreement was not yet executed; construction is targeted for fiscal year 2027.",
      percentComplete: null,
      startDate: "2026",
      targetDate: "FY 2027",
      funding: [{ source: "Bureau of Reclamation WaterSMART (small-scale)", amount: "$116,000 of $235,594", type: "grant" }],
      whyItMatters:
        "It modernizes metering for 23 homes and is part of the broader move to meter the whole system. Better meter data helps the town catch leaks and bill accurately.",
      detail:
        "In the Bureau of Reclamation's own description, the project will 'upgrade 23 water meters and integrate them into a radio-read metering system' for automatic reads, to give the town more frequent consumption data and identify water loss. The federal award is scoped to the meters, and describes a radio-read system rather than the cellular metering that raises privacy questions in some towns. Any related main or service-line work would be funded separately.",
      confidence: "high",
      sources: [S.swep, S.watersmart2],
    },
  ],

  funding: [
    {
      source: "CWRPDA Drinking Water Revolving Fund",
      program: "Phase 1 loan package (includes $3M principal forgiveness)",
      amount: "$9,744,000",
      // Net of the $3M forgiveness, so the grants-vs-loans split counts each
      // dollar once: the ~$6.7M repayable here, the $3M forgiven as a grant below.
      amountNumeric: 6744000,
      type: "loan",
      year: "2025",
      fundsWhat:
        "The Phase 1 overhaul: temporary tank, 2-MG tank relining, West Loop replacement, and raw-water metering. The town repays about $6.7 million of this; a further $3,000,000 is forgiven and shown separately below. Approval required the town to raise rates to meet the lender's coverage rules.",
      confidence: "high",
      sources: [S.cwrpda, S.taReport],
    },
    {
      source: "Bipartisan Infrastructure Law (within the state loan)",
      program: "Principal forgiveness",
      amount: "$3,000,000",
      // The forgiven portion of the $9,744,000 loan above, which is listed net
      // of this. Counted once here as a grant, so totals do not double-count.
      amountNumeric: 3000000,
      type: "grant",
      year: "2025",
      fundsWhat:
        "The portion of the state loan the town does not have to repay, cutting the actual repayable Phase 1 debt to about $6.7 million. Shown here as a grant; the loan above is listed net of this forgiveness.",
      confidence: "high",
      sources: [S.cwrpda],
    },
    {
      source: "Colorado DOLA",
      program: "Energy and Mineral Impact Assistance Fund (EIAF) Tier II, 2023",
      amount: "$956,000",
      amountNumeric: 956000,
      type: "grant",
      year: "2023",
      fundsWhat:
        "Relining the 2-MG tank, the first funded piece of Phase 1. Early-2024 reporting said the funds were briefly at risk over an overdue town audit.",
      confidence: "high",
      sources: [S.taReport, S.cwrpda],
    },
    {
      source: "Colorado DOLA",
      program: "EIAF Tier II, 2025 (West Water Loop)",
      amount: "$1,000,000",
      amountNumeric: 1000000,
      type: "grant",
      year: "2025",
      fundsWhat: "The West Loop pipe replacement, alongside a state loan for the balance.",
      confidence: "high",
      sources: [S.eiaf, S.taReport],
    },
    {
      source: "State revolving fund",
      program: "Design and Engineering grant, 2024",
      amount: "$300,000",
      amountNumeric: 300000,
      type: "grant",
      year: "2024",
      fundsWhat: "Preliminary design, engineering, and permitting for Phase 1.",
      confidence: "high",
      sources: [S.cwrpda],
    },
    {
      source: "U.S. Bureau of Reclamation",
      program: "WaterSMART grant (raw-water metering)",
      amount: "$250,000",
      amountNumeric: 250000,
      type: "grant",
      year: "2025",
      fundsWhat: "Real-time flow and temperature monitoring at the spring sources.",
      confidence: "high",
      sources: [S.taReport],
    },
    {
      source: "U.S. Bureau of Reclamation",
      program: "WaterSMART Water Strategy (planning)",
      amount: "~$250,000 federal of ~$500,113",
      amountNumeric: 250000,
      type: "grant",
      year: "2023",
      fundsWhat:
        "The holistic source-to-tap Water Strategy. The roughly $500,113 figure is the cost of the planning work, federal money plus a non-federal match, not cash paid to the town.",
      confidence: "high",
      sources: [S.watersmartApply, S.portal],
    },
    {
      source: "Colorado Water Conservation Board",
      program: "Water Supply Reserve Fund, via Gunnison Basin Roundtable",
      amount: "~$123,000",
      amountNumeric: 123000,
      type: "grant",
      year: "2023",
      fundsWhat:
        "The hydrogeological study of the spring complexes, the state match and first building block of the comprehensive Water Strategy. With $25,000 each from the Colorado River District and the Roundtable.",
      confidence: "high",
      sources: [S.cwcb, S.hydro],
    },
    {
      source: "U.S. Bureau of Reclamation",
      program: "WaterSMART small-scale (Lee's Trailer Court meters)",
      amount: "$116,000 of $235,594",
      amountNumeric: 116000,
      type: "grant",
      year: "2026",
      fundsWhat:
        "Upgrade 23 water meters into a radio-read metering system on the north edge of town. Selected, with a local match; agreement not yet executed.",
      confidence: "high",
      sources: [S.swep, S.watersmart2],
    },
    {
      source: "Wright Water Engineers (contract, not a grant)",
      program: "Comprehensive Water Strategy and spring hydrogeology",
      amount: "$511,876",
      amountNumeric: 511876,
      type: "unknown",
      year: "2026",
      fundsWhat:
        "The consultant contract, approved January 27, 2026, to write the comprehensive strategy through September 2027. Listed here because it shows the holistic work is now funded and moving.",
      confidence: "high",
      sources: [S.portal],
    },
  ],

  alerts: [
    {
      kind: "problem",
      title: "Most of the town lost water for 13 days in 2019",
      detail:
        "In February and March 2019, undetected leaks plus drought left most of Paonia's roughly 1,600 customers under a boil order with water shut off for a combined 13 days. The town and county declared emergencies. It is the event that set the whole rebuild in motion.",
      date: "Feb 2019",
      relatedProject: "phase-1",
      confidence: "high",
      sources: [S.npr],
    },
    {
      kind: "problem",
      title: "No new water taps allowed since 2020",
      detail:
        "A citizen referendum banned new water taps in January 2020 after the crisis. It can only be lifted when an engineer certifies enough infrastructure and water rights. The 2026 budget does not anticipate lifting it. About 416 standby connections are on a waiting list and cannot be made.",
      date: "Jan 2020",
      relatedProject: "phase-1",
      confidence: "high",
      sources: [S.fy26, S.jds],
    },
    {
      kind: "problem",
      title: "Roughly a third of treated water is lost",
      detail:
        "A 2021 engineering evaluation estimated the town loses 35 to 40 percent of the water it treats to leaks and unmetered use. This is a draft planning estimate marked 'Not For Official Use,' and no audited after figure has been published, so treat the number as a flag rather than a fact.",
      date: "2021",
      relatedProject: "west-loop",
      confidence: "low",
      sources: [S.jds],
    },
    {
      kind: "problem",
      title: "One plant, one tank: no backup",
      detail:
        "With the Clock plant and its 1-MG tank idle since 2014, the town runs on a single treatment plant and a single storage tank. That lack of redundancy is exactly what turned the 2019 leaks into a crisis.",
      date: "2023",
      relatedProject: "clock-plant",
      confidence: "high",
      sources: [S.budget24],
    },
    {
      kind: "watch",
      title: "Tank project is behind schedule, with penalties",
      detail:
        "The contractor missed the March 24, 2026 deadline to substantially finish the tank relining. The town began charging liquidated damages, reported at $300 per day rising to $1,000 per day, and was awaiting the final inspection as of late May 2026.",
      date: "Mar 2026",
      relatedProject: "tank-relining",
      confidence: "high",
      sources: [S.portal],
    },
    {
      kind: "watch",
      title: "Mandatory water restrictions since August 2025",
      detail:
        "Taking the 2-MG tank offline for relining cut storage by about two-thirds and triggered Stage 1 mandatory restrictions, with set watering days and hours and fines up to $250. They were still in effect as of May 2026.",
      date: "Aug 2025",
      relatedProject: "tank-relining",
      confidence: "high",
      sources: [S.restrictions],
    },
    {
      kind: "watch",
      title: "New debt roughly triples the town's debt per tap",
      detail:
        "After the $3 million forgiven, the town takes on roughly $6.7 million of new Phase 1 debt. By the lender's analysis that roughly triples the town's debt per tap, a heavy load for a small community with thin finances. Rate increases were a condition of the loan. The town has noted that a major change in federal funding could force the package to be reconsidered.",
      date: "Mar 2025",
      relatedProject: "phase-1",
      confidence: "high",
      sources: [S.cwrpda, S.taReport],
    },
    {
      kind: "watch",
      title: "Water rates rising every year through 2029",
      detail:
        "Monthly water rates climbed from about $45 in 2021 to about $60 in 2025, and approved annual increases run through 2029, projected to add about $13.78 per tap per month over 2025 levels. The increases were set partly to satisfy the state loan.",
      date: "2025",
      relatedProject: "phase-1",
      confidence: "high",
      sources: [S.cwrpda, S.rate2026],
    },
    {
      kind: "success",
      title: "Phase 1 is fully funded",
      detail:
        "In March 2025 the state authority approved the $9.744 million loan package, including $3 million the town never repays, on top of about $1.26 million in grants. The town headlined Phase 1 as fully funded with construction under way.",
      date: "Mar 2025",
      relatedProject: "phase-1",
      confidence: "high",
      sources: [S.taReport, S.cwrpda],
    },
    {
      kind: "success",
      title: "The holistic Water Strategy is funded and being written",
      detail:
        "The town won a Bureau of Reclamation WaterSMART grant for a comprehensive, source-to-tap Water Strategy, with state and river-district money behind it, and hired Wright Water Engineers in January 2026 to write it through 2027. The whole-watershed vision is moving, on paper, alongside the construction.",
      date: "Jan 2026",
      relatedProject: "water-strategy",
      confidence: "high",
      sources: [S.watersmartApply, S.portal],
    },
    {
      kind: "info",
      title: "Both treatment plants were modernized before the rebuild",
      detail:
        "After the state reclassified the springs as surface-influenced, the lower Clock plant got membrane filtration in 2011 and the upper Lamborn plant in 2016. The 2021 evaluation recommended no further treatment-plant work at this time, so the rebuild is about storage, pipe, and source, not treatment.",
      date: "2016",
      relatedProject: "",
      confidence: "high",
      sources: [S.jds],
    },
  ],

  kpis: [
    {
      label: "Spring sources",
      value: "~32 springs",
      context: "On Mt. Lamborn and Landsend Peak, in about 13 complexes. The town's entire supply.",
      confidence: "high",
      sources: [S.cwrpda, S.hydro],
    },
    {
      label: "Distribution pipe",
      value: "~23 miles",
      context: "Some of it laid as far back as 1905; much of the Lamborn Mesa pipe is 70 to 80 years old.",
      confidence: "high",
      sources: [S.watersmart2, S.budget24],
    },
    {
      label: "Treated water lost",
      value: "35 to 40%",
      context: "A 2021 draft planning estimate, never audited since. Shown as a flag, not a confirmed current figure.",
      confidence: "low",
      sources: [S.jds],
    },
    {
      label: "Finished-water storage",
      value: "2 MG in service",
      context: "One 2-MG tank at the Lamborn plant. A 1-MG tank at the idle Clock plant is out of service.",
      confidence: "high",
      sources: [S.budget24],
    },
    {
      label: "Standby taps waiting",
      value: "~416",
      context: "Standby connections that cannot be made because of the moratorium, about 17 percent of demand.",
      confidence: "high",
      sources: [S.jds],
    },
    {
      label: "Monthly water rate",
      value: "~$45 to ~$60",
      context: "Rose from about $45 in 2021 to about $60 in 2025, with increases approved through 2029.",
      confidence: "high",
      sources: [S.cwrpda],
    },
    {
      label: "Tap fee to connect",
      value: "$6,000 / $15,000",
      context: "In-town and out-of-town, per Resolution 10-2025, for a standby holder to secure a tap.",
      confidence: "high",
      sources: [S.res10],
    },
    {
      label: "People served",
      value: "~1,600 in town",
      context: "Plus about 1,850 out of town through roughly two dozen small private water companies and bulk customers.",
      confidence: "medium",
      sources: [S.dci2024, S.restrictions],
    },
  ],

  timeline: [
    { date: "1905", label: "First distribution pipes laid", status: "done" },
    {
      date: "2011 to 2016",
      label: "Both treatment plants upgraded to membrane filtration",
      status: "done",
      detail: "After the state reclassified the springs as surface-influenced.",
    },
    {
      date: "2014",
      label: "Clock plant and 1-MG tank go idle",
      status: "done",
      detail: "Leaving the town on a single plant and tank.",
    },
    {
      date: "Feb 2019",
      label: "Water crisis: 13-day shutoff and boil order",
      status: "done",
    },
    {
      date: "Jan 2020",
      label: "Voters ban new water taps",
      status: "done",
    },
    {
      date: "May 2021",
      label: "JDS-Hydro draft evaluation lays out the rebuild",
      status: "done",
      detail: "Estimated 35 to 40 percent water loss and priced both the quick fixes and the deferred watershed-scale work.",
    },
    {
      date: "Apr 2023",
      label: "State survey flags significant deficiencies",
      status: "done",
      detail: "The idle tank, the failing pipe, and unmetered springs. It prompted the phased plan.",
    },
    {
      date: "Sep to Oct 2023",
      label: "Town wins state and federal planning grants",
      status: "done",
      detail: "A CWCB-funded spring hydrogeology study and a Bureau of Reclamation WaterSMART Water Strategy.",
    },
    {
      date: "Mar 2025",
      label: "State approves the $9.744M Phase 1 loan",
      status: "done",
      detail: "Including $3 million forgiven, conditional on rate increases.",
    },
    {
      date: "Aug 2025",
      label: "Mandatory water restrictions begin",
      status: "in-progress",
      detail: "During the tank relining; still in effect as of May 2026.",
    },
    {
      date: "Jan 2026",
      label: "Wright Water hired to write the comprehensive strategy",
      status: "in-progress",
      detail: "A $511,876 contract running through 2027.",
    },
    {
      date: "Mar 2026",
      label: "Tank deadline missed; penalties begin; second WaterSMART grant won",
      status: "done",
    },
    {
      date: "Spring 2026",
      label: "West Loop pipe goes out for bid",
      status: "planned",
    },
    {
      date: "future",
      label: "Lift the tap moratorium and connect the 416 standby taps",
      status: "planned",
      detail: "The stated long-term goal, once the system is certified able to serve them.",
    },
  ],

  openQuestions: [
    "When will Phase 1 actually be finished, and is there a target completion date for the tank and the West Loop?",
    "What is the town's real, audited water-loss percentage now, versus the 2021 draft estimate of 35 to 40 percent?",
    "How much did the tank relining's change orders and missed-deadline penalties add to its cost?",
    "Has Phase 1 moved the town any closer to lifting the tap moratorium, and what specifically still has to happen?",
    "Will the comprehensive watershed strategy actually be funded into construction, or stop at a written plan?",
    "Is there a committed Roeber Reservoir expansion, or only a recommendation?",
    "What are the scope, cost, and schedule of the later phases beyond Phase 1?",
    "Is the West Loop's loan separate from the $9.744 million Phase 1 package, or part of it?",
    "What is the current water-quality and compliance status (state PWS ID CO0115601)?",
    "Is there an adopted Water System Master Plan, given the underlying evaluation is still a draft?",
  ],

  allSources: [
    S.cwrpda,
    S.taReport,
    S.budget24,
    S.jds,
    S.restrictions,
    S.watersmart2,
    S.npr,
    S.fy26,
    S.hydro,
    S.cwcb,
    S.watersmartApply,
    S.rate2026,
    S.res10,
    S.dci2024,
    S.eiaf,
    S.portal,
    {
      title: "Paonia Capital Improvements Phase One (KVNF)",
      url: "https://www.kvnf.org/kvnf-stories/2025-08-13/water-infrastructure-series-paonia",
      date: "Aug 2025",
    },
  ],
};
