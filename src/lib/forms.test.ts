import { describe, it, expect } from "vitest";
import { validateInterest, validateCommittee, validateParkingSurvey } from "./forms";

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

describe("validateParkingSurvey", () => {
  it("accepts a normal response, normalizes arrays and forces source=online", () => {
    const r = validateParkingSurvey({
      businessName: "  Blue Sage  ",
      block: "200",
      roles: ["Business owner / operator", "", "Resident"],
      position: "Support",
      hardestTimes: "Weekends", // single value becomes a one-item array
      source: "tampered", // client-supplied source is ignored
    });
    expect(r.kind).toBe("ok");
    if (r.kind === "ok") {
      expect(r.args.businessName).toBe("Blue Sage");
      expect(r.args.roles).toEqual(["Business owner / operator", "Resident"]);
      expect(r.args.hardestTimes).toEqual(["Weekends"]);
      expect(r.args.position).toBe("Support");
      expect(r.args.source).toBe("online");
    }
  });

  it("accepts a comment-only response", () => {
    expect(validateParkingSurvey({ comments: "More angled parking please" }).kind).toBe("ok");
  });

  it("drops a honeypot hit", () => {
    expect(validateParkingSurvey({ position: "Support", website: "x" }).kind).toBe("drop");
  });

  it("rejects a completely empty submission", () => {
    const r = validateParkingSurvey({ roles: [], hardestTimes: [], parkWhere: [] });
    expect(r.kind).toBe("invalid");
    if (r.kind === "invalid") expect(r.status).toBe(422);
  });

  it("caps long free text and oversized arrays", () => {
    const r = validateParkingSurvey({
      comments: "x".repeat(5000),
      roles: Array.from({ length: 50 }, (_, i) => `r${i}`),
    });
    if (r.kind === "ok") {
      expect(r.args.comments!.length).toBe(1500);
      expect(r.args.roles.length).toBeLessThanOrEqual(12);
    }
  });
});
