"use client";

import { useState } from "react";

// Recall-campaign supporter sign-up. Anyone can join to get updates or offer to
// help. No gatekeeping. Held by the campaign, not shared with the Town.
const HELP_OPTIONS: { value: string; label: string }[] = [
  { value: "petition", label: "Sign the petition to recall Mayor Paige Smith" },
  { value: "gather", label: "Help gather signatures" },
  { value: "host", label: "Host a table or spread the word" },
  { value: "donate", label: "Chip in to help cover costs" },
  { value: "updates", label: "Just keep me posted" },
];

export default function RecallForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data: Record<string, unknown> = Object.fromEntries(fd.entries());
    // Collect the multi-select checkboxes into an array the API expects.
    data.help = fd.getAll("help");
    setState("sending");
    try {
      const res = await fetch("/api/recall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p className="form-done">
        Thank you. You are on the list. We will be in touch with what is happening and
        how to help, whether or not you can make it to a Greet &amp; Meet.
      </p>
    );
  }

  return (
    <form className="ts-form" onSubmit={onSubmit}>
      {/* Honeypot: hidden from people, tempting to bots. If filled, we drop it. */}
      <label className="hp" aria-hidden="true">
        Leave this field empty
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label>
        Your name
        <input name="name" required autoComplete="name" />
      </label>
      <label>
        Email
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        Phone <span className="opt">(optional, for texts about events)</span>
        <input name="phone" type="tel" autoComplete="tel" />
      </label>
      <fieldset className="ts-checks">
        <legend>How would you like to help? <span className="opt">(optional)</span></legend>
        {HELP_OPTIONS.map((o) => (
          <label key={o.value} className="check">
            <input type="checkbox" name="help" value={o.value} />
            <span>{o.label}</span>
          </label>
        ))}
      </fieldset>
      <label>
        Anything you want me to know? <span className="opt">(optional)</span>
        <textarea name="note" rows={4} />
      </label>
      <button className="cta" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending..." : "Count me in"}
      </button>
      {state === "error" && (
        <p className="form-err">Something went wrong. Please try again in a moment.</p>
      )}
    </form>
  );
}
