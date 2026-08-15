"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function VanLoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPending(true);
    setError("");
    const response = await fetch("/api/van/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    setPending(false);
    if (!response.ok) {
      setError("That login did not open the studio.");
      return;
    }
    router.push("/admin");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4">
      <label className="block">
        <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.22em] text-gold">
          Username
        </span>
        <input
          className="input-cinema"
          name="username"
          autoComplete="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-[0.68rem] uppercase tracking-[0.22em] text-gold">
          Password
        </span>
        <input
          className="input-cinema"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>
      {error ? <p className="text-sm text-gold-soft">{error}</p> : null}
      <button type="submit" className="btn-gold w-full" disabled={pending}>
        {pending ? "Opening…" : "Open admin"}
      </button>
    </form>
  );
}
