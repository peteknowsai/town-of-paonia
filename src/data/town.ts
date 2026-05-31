// Town of Paonia — verified facts and canonical links.
//
// Sourced from the official site (townofpaonia.colorado.gov), the Town's
// CivicClerk agenda portal, and the Municode meetings portal, cross-checked
// against local reporting. Where a fact could not be verified, it is left out
// rather than guessed. Update here when the Town changes something.

import type { BodyKey } from "./meetings";

export const TOWN = {
  name: "Town of Paonia",
  hall: "Paonia Town Hall",
  address: "214 Grand Avenue, Paonia, CO 81428",
  mailing: "P.O. Box 460, Paonia, CO 81428",
  // The governing body. Paonia is a statutory town, so its council is the
  // Board of Trustees (a Mayor plus six Trustees), elected at large.
  body: "Board of Trustees",
  mayor: "Paige Smith",
  phone: "(970) 527-4101",
  email: "Paonia@TownofPaonia.com",
  hours: "Monday to Friday, 8:00 AM to 4:00 PM",
} as const;

// Canonical destinations. These are real pages that always resolve and always
// hold the current documents, so meeting links never rot.
export const LINKS = {
  officialSite: "https://townofpaonia.colorado.gov",
  // The Town's live agenda/minutes/recording portal (CivicClerk).
  agendaPortal: "https://paoniaco.portal.civicclerk.com",
  // The official site's agendas-and-minutes landing page.
  agendasPage:
    "https://townofpaonia.colorado.gov/board-meeting-agendas-and-minutes",
  contact: "https://townofpaonia.colorado.gov/contact-us",
  payWater: "https://townofpaonia.colorado.gov/i-want-to/pay-water-bill",
  // The Town's official fillable CORA request form (PDF).
  coraForm:
    "https://townofpaonia.colorado.gov/sites/townofpaonia/files/documents/CORA%20Records%20Request%20Form_Final.pdf",
} as const;

// How residents attend a Board of Trustees meeting.
//
// Meetings are open to the public in person and are also streamed on Zoom. The
// Town posts a fresh Zoom link with each agenda rather than a standing link, so
// we do not hard-code a join URL that might be wrong. When the Town publishes a
// stable standing Zoom link, drop it into `zoomUrl` below and the homepage will
// switch to true one-click join automatically.
export const ATTEND = {
  inPerson: `${TOWN.hall}, ${TOWN.address}`,
  // Set this to the Town's standing Zoom URL when one is confirmed. Until then,
  // the "Join online" action sends residents to the agenda portal, where the
  // current meeting's Zoom link is posted.
  zoomUrl: null as string | null,
  // Real Zoom dial-in is published with each agenda; we point to the portal
  // rather than print a number we cannot keep current.
  joinFallback: LINKS.agendaPortal,
  // Optional phone dial-in. Off by default: the generic Zoom number still
  // requires the per-meeting ID (posted with the agenda), so a senior could
  // hit a dead end. To enable a "call in" button, set this to
  // { tel: "+16699009128", display: "(669) 900-9128" } and the UI renders it
  // with the caveat that the meeting ID comes from the agenda.
  dialIn: null as { tel: string; display: string } | null,
} as const;

// One-line, neutral explainer for the Board of Trustees (the default body).
export const BODY_EXPLAINER =
  "The Board of Trustees is Paonia's elected town council. It sets the town budget, passes local ordinances, and decides town policy. Its meetings are open to the public.";

// Plain-language, neutral information for each public body the Town posts. Each
// has a short factual explainer and the standard order of its meetings, so the
// detail page reads correctly whether it is a Board night or a Tree Board night.
// We describe the structure only; the specific items live in the official agenda.
const GENERIC_PARTS = [
  { name: "Call to order", what: "The chair opens the meeting and notes who is present." },
  {
    name: "Public comment",
    what: "Time for any resident to speak, when the body offers it. You do not need to be on the agenda.",
  },
  {
    name: "Business",
    what: "The items the body takes up: reviews, recommendations, and any votes.",
  },
  { name: "Adjournment", what: "The meeting ends." },
];

const BOARD_PARTS = [
  { name: "Call to order and roll call", what: "The Mayor opens the meeting and the clerk notes who is present." },
  {
    name: "Public comment",
    what: "Time for any resident to speak, usually a few minutes each. You do not need to be on the agenda to talk.",
  },
  {
    name: "Consent agenda",
    what: "Routine items, like prior minutes and bills, approved together in one vote unless a trustee pulls one out.",
  },
  {
    name: "Action items",
    what: "The decisions of the night: ordinances, resolutions, contracts, and spending the Board votes on.",
  },
  { name: "Reports", what: "Updates from the Mayor, staff, and town departments. Usually no vote." },
  { name: "Adjournment", what: "The meeting ends." },
];

export const BODY_INFO: Record<
  BodyKey,
  { explainer: string; agendaParts: { name: string; what: string }[] }
> = {
  board: { explainer: BODY_EXPLAINER, agendaParts: BOARD_PARTS },
  planning: {
    explainer:
      "The Planning Commission reviews land use, subdivision, and development proposals and makes recommendations to the Board of Trustees. Its meetings are open to the public.",
    agendaParts: GENERIC_PARTS,
  },
  tree: {
    explainer:
      "The Tree Board advises the Town on the care, planting, and removal of trees on public property. Its meetings are open to the public.",
    agendaParts: GENERIC_PARTS,
  },
  zoning: {
    explainer:
      "The Zoning Board of Adjustments hears requests for variances and appeals of zoning decisions. Its meetings are open to the public.",
    agendaParts: GENERIC_PARTS,
  },
  adhoc: {
    explainer:
      "An ad hoc committee is a temporary group the Board forms to study a specific issue and report back with recommendations. Its meetings are open to the public.",
    agendaParts: GENERIC_PARTS,
  },
  other: {
    explainer: "This is a public meeting of a Town body. Meetings are open to the public.",
    agendaParts: GENERIC_PARTS,
  },
};
