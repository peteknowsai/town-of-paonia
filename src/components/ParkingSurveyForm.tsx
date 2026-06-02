"use client";

import { useState } from "react";

// Option sets, kept here so the labels stored in Convex match what people saw.
const ROLES = [
  "Business owner / operator",
  "Property owner",
  "Employee",
  "Customer / visitor",
  "Resident",
];
const ENOUGH = ["Yes, plenty", "Usually fine", "Sometimes tight", "Often a problem"];
const HARDEST = [
  "Weekday mornings",
  "Weekday afternoons",
  "Evenings",
  "Weekends",
  "Special events",
  "Rarely a problem",
];
const PARK_WHERE = ["On Grand Avenue", "Side streets", "A Town parking lot", "Private / own lot"];
const POSITION = ["Support", "Oppose", "Need more information"];

export default function ParkingSurveyForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    // getAll() for the multi-select questions; get() for single fields.
    const payload = {
      website: fd.get("website") ?? "",
      businessName: fd.get("businessName"),
      businessOwner: fd.get("businessOwner"),
      businessAddress: fd.get("businessAddress"),
      block: fd.get("block"),
      roles: fd.getAll("roles"),
      enoughParking: fd.get("enoughParking"),
      hardestTimes: fd.getAll("hardestTimes"),
      barrier: fd.get("barrier"),
      barrierDetail: fd.get("barrierDetail"),
      parkWhere: fd.getAll("parkWhere"),
      position: fd.get("position"),
      comments: fd.get("comments"),
      followUpContact: fd.get("followUpContact"),
    };
    setState("sending");
    try {
      const res = await fetch("/api/parking-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p className="form-done">
        Thank you. Your answer was recorded and will help the Planning Commission as it
        reviews the parking code.
      </p>
    );
  }

  return (
    <form className="sv-form" onSubmit={onSubmit}>
      {/* Honeypot: hidden from people, tempting to bots. If filled, we drop it. */}
      <label className="hp" aria-hidden="true">
        Leave this field empty
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="no-print" style={{ marginBottom: "1.2rem" }}>
        <button type="button" className="btn btn-outline" onClick={() => window.print()}>
          Print a blank copy
        </button>
      </div>

      <fieldset className="sv-sec">
        <legend>About your business</legend>
        <label className="sv-field">
          <span>Business name</span>
          <input name="businessName" autoComplete="organization" />
        </label>
        <label className="sv-field">
          <span>Business owner</span>
          <input name="businessOwner" autoComplete="name" />
        </label>
        <label className="sv-field">
          <span>Business address</span>
          <input name="businessAddress" autoComplete="street-address" />
        </label>
        <div className="sv-q">
          <span className="sv-label">Block of Grand</span>
          <div className="sv-opts">
            {["100", "200", "300", "Side street"].map((o) => (
              <label key={o} className="sv-opt">
                <input type="radio" name="block" value={o} />
                <span>{o}</span>
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      <fieldset className="sv-sec">
        <legend>Your experience</legend>

        <div className="sv-q">
          <span className="sv-label">
            <b>1.</b> I am a (check all that apply)
          </span>
          <div className="sv-opts">
            {ROLES.map((o) => (
              <label key={o} className="sv-opt">
                <input type="checkbox" name="roles" value={o} />
                <span>{o}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="sv-q">
          <span className="sv-label">
            <b>2.</b> On a typical day, is there enough parking for customers and visitors
            downtown?
          </span>
          <div className="sv-opts">
            {ENOUGH.map((o) => (
              <label key={o} className="sv-opt">
                <input type="radio" name="enoughParking" value={o} />
                <span>{o}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="sv-q">
          <span className="sv-label">
            <b>3.</b> When is parking hardest to find?
          </span>
          <div className="sv-opts">
            {HARDEST.map((o) => (
              <label key={o} className="sv-opt">
                <input type="checkbox" name="hardestTimes" value={o} />
                <span>{o}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="sv-q">
          <span className="sv-label">
            <b>4.</b> Has parking ever been a barrier to opening, expanding, or changing a
            downtown business, yours or one you know of?
          </span>
          <div className="sv-opts">
            {["Yes", "No", "Not sure"].map((o) => (
              <label key={o} className="sv-opt">
                <input type="radio" name="barrier" value={o} />
                <span>{o}</span>
              </label>
            ))}
          </div>
          <label className="sv-field sv-sub">
            <span>If yes, briefly</span>
            <input name="barrierDetail" />
          </label>
        </div>

        <div className="sv-q">
          <span className="sv-label">
            <b>5.</b> Where do you and your employees usually park?
          </span>
          <div className="sv-opts">
            {PARK_WHERE.map((o) => (
              <label key={o} className="sv-opt">
                <input type="checkbox" name="parkWhere" value={o} />
                <span>{o}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="sv-q">
          <span className="sv-label">
            <b>6.</b> The Town is considering no longer <em>requiring</em> downtown businesses
            to provide off-street parking (parking would stay allowed, just not mandatory).
            Would you:
          </span>
          <div className="sv-opts">
            {POSITION.map((o) => (
              <label key={o} className="sv-opt">
                <input type="radio" name="position" value={o} />
                <span>{o}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="sv-q">
          <span className="sv-label">
            <b>7.</b> Anything else about downtown parking the Commission should know?
          </span>
          <textarea name="comments" rows={3} />
        </div>

        <label className="sv-field">
          <span>Open to a follow-up conversation? Leave a phone or email</span>
          <input name="followUpContact" />
        </label>
      </fieldset>

      <div className="sv-actions no-print">
        <button className="btn btn-fill" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Submitting..." : "Submit survey"}
        </button>
        {state === "error" && (
          <p className="form-err">
            Could not submit. Please check at least one answer and try again.
          </p>
        )}
      </div>
    </form>
  );
}
