"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ResetGate } from "@/components/ResetGate";
import { Editable } from "@/components/studio/Editable";
import type { NavItem } from "@/lib/site-content-types";

export function SiteNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="relative z-50 border-b border-gold/15 bg-velvet/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-5 sm:py-4">
        <Link
          href="/"
          className="font-display text-2xl tracking-wide text-cream sm:text-3xl"
        >
          <Editable path="site.name" as="span" />
        </Link>
        <nav className="hidden flex-wrap items-center justify-end gap-x-5 gap-y-2 text-[0.68rem] uppercase tracking-[0.22em] text-muted lg:flex">
          {items.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-gold-soft"
            >
              <Editable path={`nav.${index}.label`} as="span" />
            </Link>
          ))}
          <Link href="/login" className="text-gold hover:text-gold-soft">
            Login
          </Link>
          <ResetGate />
        </nav>
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center border border-gold/35 px-3 text-[0.68rem] uppercase tracking-[0.2em] text-gold lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          Menu
        </button>
      </div>
      {open ? (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[100] flex h-dvh w-full flex-col bg-velvet lg:hidden"
        >
          <div className="flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4">
            <Link
              href="/"
              className="font-display text-2xl tracking-wide text-cream"
              onClick={() => setOpen(false)}
            >
              <Editable path="site.name" as="span" />
            </Link>
            <button
              type="button"
              aria-label="Close menu"
              className="inline-flex min-h-12 min-w-12 items-center justify-center text-gold"
              onClick={() => setOpen(false)}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 5l14 14M19 5L5 19"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <nav className="flex flex-1 flex-col items-center justify-center gap-1 overflow-y-auto px-6 pb-16">
            {items.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-display min-h-14 py-2 text-center text-3xl tracking-wide text-cream sm:text-4xl"
                onClick={() => setOpen(false)}
              >
                <Editable path={`nav.${index}.label`} as="span" />
              </Link>
            ))}
            <Link
              href="/login"
              className="font-display min-h-14 py-2 text-center text-3xl tracking-wide text-gold sm:text-4xl"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
            <div className="mt-8 text-[0.72rem] uppercase tracking-[0.22em]">
              <ResetGate />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
