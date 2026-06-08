"use client";

import { useState } from "react";

// Simple key prompt for the supporter dashboard. On success the server sets an
// httpOnly cookie and we reload into the table.
export default function AdminLogin({ failed }: { failed?: boolean }) {
  const [state, setState] = useState<"idle" | "sending" | "error">(failed ? "error" : "idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const key = new FormData(e.currentTarget).get("key");
    setState("sending");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      if (res.ok) {
        window.location.reload();
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  return (
    <form className="ts-form" onSubmit={onSubmit}>
      <label>
        Admin key
        <input name="key" type="password" autoFocus autoComplete="current-password" />
      </label>
      <button className="cta" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Checking..." : "Open dashboard"}
      </button>
      {state === "error" && <p className="form-err">Wrong key. Try again.</p>}
    </form>
  );
}
