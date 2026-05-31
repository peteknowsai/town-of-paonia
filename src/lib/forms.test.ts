import { describe, it, expect } from "vitest";
import { validateInterest, validateCommittee } from "./forms";

describe("validateInterest", () => {
  it("accepts a valid submission and normalizes optionals", () => {
    const r = validateInterest({
      name: "  Jane Doe ",
      email: "jane@example.com",
      currentRole: " Town Manager ",
      note: "",
      publishAck: true,
    });
    expect(r.kind).toBe("ok");
    if (r.kind === "ok") {
      expect(r.args.name).toBe("Jane Doe");
      expect(r.args.currentRole).toBe("Town Manager");
      expect(r.args.note).toBeUndefined(); // empty string becomes undefined
      expect(r.args.publishAck).toBe(true);
    }
  });

  it("drops a honeypot hit without erroring", () => {
    const r = validateInterest({ name: "Bot", email: "b@b.co", website: "http://spam" });
    expect(r.kind).toBe("drop");
  });

  it("rejects a missing name", () => {
    const r = validateInterest({ name: "", email: "a@b.co" });
    expect(r.kind).toBe("invalid");
    if (r.kind === "invalid") expect(r.status).toBe(422);
  });

  it("rejects a malformed email", () => {
    expect(validateInterest({ name: "A", email: "not-an-email" }).kind).toBe("invalid");
    expect(validateInterest({ name: "A", email: "a@b" }).kind).toBe("invalid");
  });

  it("coerces a missing publishAck to false", () => {
    const r = validateInterest({ name: "A", email: "a@b.co" });
    if (r.kind === "ok") expect(r.args.publishAck).toBe(false);
  });
});

describe("validateCommittee", () => {
  it("accepts a valid signup", () => {
    const r = validateCommittee({ name: "Sam", email: "sam@example.com", connection: "farmer" });
    expect(r.kind).toBe("ok");
    if (r.kind === "ok") {
      expect(r.args.name).toBe("Sam");
      expect(r.args.connection).toBe("farmer");
      expect(r.args.why).toBeUndefined();
    }
  });

  it("drops a honeypot hit", () => {
    expect(validateCommittee({ name: "Bot", email: "b@b.co", website: "x" }).kind).toBe("drop");
  });

  it("rejects missing fields", () => {
    expect(validateCommittee({ email: "a@b.co" }).kind).toBe("invalid");
    expect(validateCommittee({ name: "A" }).kind).toBe("invalid");
  });
});
