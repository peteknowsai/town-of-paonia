"use client";

import { useState } from "react";

// Open, self-nominated committee sign-up. Anyone in town can volunteer. No
// gatekeeping. Held by Transparent Towns.
export default function CommitteeForm() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState("sending");
    try {
      const res = await fetch("/api/committee", {
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
        Thank you for stepping up. We will be in touch as the committee comes together.
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
        Your corner of Paonia <span className="opt">(optional)</span>
        <input name="connection" placeholder="farmer, parent, business owner, newcomer..." />
      </label>
      <label>
        Why do you want to help? <span className="opt">(optional)</span>
        <textarea name="why" rows={4} />
      </label>
      <button className="cta" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending..." : "Sign up for the committee"}
      </button>
      {state === "error" && (
        <p className="form-err">Something went wrong. Try again, or email us directly.</p>
      )}
    </form>
  );
}
