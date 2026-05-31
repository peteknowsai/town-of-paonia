// Town of Paonia — verified facts and canonical links.
//
// Sourced from the official site (townofpaonia.colorado.gov), the Town's
// CivicClerk agenda portal, and the Municode meetings portal, cross-checked
// against local reporting. Where a fact could not be verified, it is left out
// rather than guessed. Update here when the Town changes something.

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

// One-line, neutral explainer used on meeting pages.
export const BODY_EXPLAINER =
  "The Board of Trustees is Paonia's elected town council. It sets the town budget, passes local ordinances, and decides town policy. Its meetings are open to the public.";
