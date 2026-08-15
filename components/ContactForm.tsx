"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: String(form.get("name") ?? "").trim(),
        email: String(form.get("email") ?? "").trim(),
        message: String(form.get("message") ?? "").trim(),
      }),
    });
    setPending(false);
    if (!response.ok) {
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };
      setError(data.error ?? "The note did not leave the lobby.");
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="card-cinema px-6 py-10 text-center">
        <p className="font-display text-3xl text-cream">The note is filed.</p>
        <p className="mt-3 text-muted">
          This is a fictional archive. Your message was received by the site —
          a courtesy, not a booking confirmation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <label className="block">
        <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.22em] text-gold">
          Name
        </span>
        <input name="name" required className="input-cinema" />
      </label>
      <label className="block">
        <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.22em] text-gold">
          Email
        </span>
        <input name="email" type="email" required className="input-cinema" />
      </label>
      <label className="block">
        <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.22em] text-gold">
          Message
        </span>
        <textarea name="message" required rows={6} className="input-cinema" />
      </label>
      {error ? <p className="text-sm text-gold-soft">{error}</p> : null}
      <button type="submit" disabled={pending} className="btn-gold w-full sm:w-auto">
        {pending ? "Sending…" : "Leave a note"}
      </button>
    </form>
  );
}
