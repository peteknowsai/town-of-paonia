"use client";

import { useState } from "react";

// Confidential "raise your hand" funnel. Held by Transparent Towns, not the Town.
// At intake the candidate acknowledges that advancing to a Town interview makes
// it public, because everything with the Town is public.
export default function InterestForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("sending");
    try {
      const res = await fetch("/api/interest", {
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
        Thank you. A real person will read this and be in touch. Nothing here is public,
        and nothing is shared with the Town unless you choose to advance.
      </p>
    );
  }

  return (
    <form className="ts-form" onSubmit={onSubmit}>
      <label>
        Your name
        <input name="name" required autoComplete="name" />
      </label>
      <label>
        Email
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        Where do you work now? <span className="opt">(optional)</span>
        <input name="currentRole" autoComplete="organization" />
      </label>
      <label>
        Anything you want us to know? <span className="opt">(optional)</span>
        <textarea name="note" rows={4} />
      </label>
      <label className="check">
        <input name="publishAck" type="checkbox" required />
        <span>
          I understand this is confidential to Transparent Towns, and that if I choose to
          advance to an interview with the Town, my interest and that conversation become
          public, because the Town's process is public.
        </span>
      </label>
      <button className="cta" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending..." : "Raise your hand"}
      </button>
      {state === "error" && (
        <p className="form-err">Something went wrong. Try again, or email us directly.</p>
      )}
    </form>
  );
}
