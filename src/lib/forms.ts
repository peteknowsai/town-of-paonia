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
