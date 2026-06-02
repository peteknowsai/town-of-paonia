// Pure request validation for the /administrator funnels. Extracted from the
// API routes so it can be unit-tested without the Convex or Workers runtime.

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export type InterestArgs = {
  name: string;
  email: string;
  currentRole?: string;
  note?: string;
  publishAck: boolean;
};

export type CommitteeArgs = {
  name: string;
  email: string;
  connection?: string;
  why?: string;
};

export type ParkingSurveyArgs = {
  businessName?: string;
  businessOwner?: string;
  businessAddress?: string;
  block?: string;
  roles: string[];
  enoughParking?: string;
  hardestTimes: string[];
  barrier?: string;
  barrierDetail?: string;
  parkWhere: string[];
  position?: string;
  comments?: string;
  followUpContact?: string;
  source?: string;
};

// "drop" means a honeypot was tripped: the route should pretend success and
// store nothing, so bots do not learn they were caught.
export type Validation<T> =
  | { kind: "ok"; args: T }
  | { kind: "drop" }
  | { kind: "invalid"; status: number; error: string };

function clean(v: unknown): string {
  return String(v ?? "").trim();
}

function optional(v: unknown): string | undefined {
  return clean(v) || undefined;
}

// Cap a free-text field so a single submission cannot store an essay.
function capped(v: unknown, max: number): string | undefined {
  const s = clean(v);
  return s ? s.slice(0, max) : undefined;
}

// Normalize a multi-select answer (checkboxes) to a clean string array: accept
// an array or a single value, trim, drop empties, cap item length and count.
function stringArray(v: unknown, maxItems = 12, maxLen = 80): string[] {
  const arr = Array.isArray(v) ? v : v == null ? [] : [v];
  return arr
    .map((x) => clean(x).slice(0, maxLen))
    .filter(Boolean)
    .slice(0, maxItems);
}

function gateNameEmail(
  body: Record<string, unknown>,
): { name: string; email: string } | { kind: "drop" } | { kind: "invalid"; status: number; error: string } {
  if (clean(body.website) !== "") return { kind: "drop" };
  const name = clean(body.name);
  const email = clean(body.email);
  if (!name || !EMAIL.test(email)) {
    return { kind: "invalid", status: 422, error: "name and a valid email are required" };
  }
  return { name, email };
}

export function validateInterest(body: Record<string, unknown>): Validation<InterestArgs> {
  const gate = gateNameEmail(body);
  if ("kind" in gate) return gate;
  return {
    kind: "ok",
    args: {
      name: gate.name,
      email: gate.email,
      currentRole: optional(body.currentRole),
      note: optional(body.note),
      publishAck: Boolean(body.publishAck),
    },
  };
}

export function validateCommittee(body: Record<string, unknown>): Validation<CommitteeArgs> {
  const gate = gateNameEmail(body);
  if ("kind" in gate) return gate;
  return {
    kind: "ok",
    args: {
      name: gate.name,
      email: gate.email,
      connection: optional(body.connection),
      why: optional(body.why),
    },
  };
}

// The downtown parking survey. Unlike the candidate funnels it asks for no
// name or email, so it has its own gate: drop honeypot hits, then require that
// at least one question was actually answered (an empty submit is noise).
export function validateParkingSurvey(
  body: Record<string, unknown>,
): Validation<ParkingSurveyArgs> {
  if (clean(body.website) !== "") return { kind: "drop" };

  const args: ParkingSurveyArgs = {
    businessName: capped(body.businessName, 120),
    businessOwner: capped(body.businessOwner, 120),
    businessAddress: capped(body.businessAddress, 160),
    block: capped(body.block, 40),
    roles: stringArray(body.roles),
    enoughParking: capped(body.enoughParking, 40),
    hardestTimes: stringArray(body.hardestTimes),
    barrier: capped(body.barrier, 40),
    barrierDetail: capped(body.barrierDetail, 600),
    parkWhere: stringArray(body.parkWhere),
    position: capped(body.position, 40),
    comments: capped(body.comments, 1500),
    followUpContact: capped(body.followUpContact, 160),
    // Always recorded server-side as "online"; never trusted from the client.
    source: "online",
  };

  const answered =
    !!(args.businessName || args.businessOwner || args.businessAddress || args.block ||
      args.enoughParking || args.barrier || args.position || args.comments ||
      args.followUpContact) ||
    args.roles.length > 0 || args.hardestTimes.length > 0 || args.parkWhere.length > 0;

  if (!answered) {
    return { kind: "invalid", status: 422, error: "please answer at least one question" };
  }
  return { kind: "ok", args };
}
