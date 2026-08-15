"use client";

import { useState } from "react";

export function GateForm() {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    const payload = {
      fullName: String(form.get("fullName") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      dateOfBirth: String(form.get("dateOfBirth") ?? ""),
      agree: form.get("agree") === "on",
    };

    const response = await fetch("/api/enter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await response.json().catch(() => ({}))) as {
      error?: string;
    };
    setPending(false);
    if (!response.ok) {
      setError(data.error ?? "The gate would not open.");
      return;
    }
    window.location.href = "/";
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 space-y-5">
      <label className="block">
        <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.22em] text-gold">
          Full name
        </span>
        <input
          name="fullName"
          required
          autoComplete="name"
          className="input-cinema"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.22em] text-gold">
          Email
        </span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="input-cinema"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.22em] text-gold">
          Date of birth
        </span>
        <input
          name="dateOfBirth"
          type="date"
          required
          className="input-cinema"
        />
      </label>
      <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
        <input
          name="agree"
          type="checkbox"
          required
          className="mt-0.5 h-5 w-5 shrink-0 accent-gold"
        />
        <span>
          I confirm I am 18 or older, I have read the Policies, and I agree to
          enter this fictional archive as entertainment.
        </span>
      </label>
      {error ? <p className="text-sm text-gold-soft">{error}</p> : null}
      <button type="submit" disabled={pending} className="btn-gold w-full">
        {pending ? "Opening…" : "Enter the archive"}
      </button>
    </form>
  );
}
