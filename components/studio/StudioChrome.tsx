"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useStudio } from "@/components/studio/StudioContext";

const pages = [
  { href: "/admin", label: "Admin" },
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/experiences", label: "Experiences" },
  { href: "/diary", label: "Diary" },
  { href: "/reviews", label: "Reviews" },
  { href: "/qa", label: "Q & A" },
  { href: "/contact", label: "Contact" },
  { href: "/games", label: "Games" },
  { href: "/policies", label: "Policies" },
];

export function StudioChrome() {
  const pathname = usePathname();
  const router = useRouter();
  const { editing, setEditing, dirty, saving, save } = useStudio();

  useEffect(() => {
    if (!editing || pathname.startsWith("/admin")) return;
    const block = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("[data-studio-nav]")) return;
      if (target.closest("[contenteditable='true']")) return;
      const link = target.closest("a");
      if (link) event.preventDefault();
    };
    document.addEventListener("click", block, true);
    return () => document.removeEventListener("click", block, true);
  }, [editing]);

  const onSave = async () => {
    const ok = await save();
    if (ok) router.refresh();
  };

  const onExit = async () => {
    if (dirty && !window.confirm("Leave studio without saving?")) return;
    await fetch("/api/van/logout", { method: "POST" });
    router.push("/van");
    router.refresh();
  };

  return (
    <>
      <div className="studio-bar" data-studio-nav>
        <div className="flex min-w-0 flex-wrap items-center gap-3 sm:gap-4">
          <p className="font-display text-lg tracking-wide text-cream sm:text-xl">
            Van Studio
          </p>
          <button
            type="button"
            className={`studio-toggle ${editing ? "is-on" : ""}`}
            onClick={() => setEditing(!editing)}
            aria-pressed={editing}
          >
            <span className="studio-toggle-knob" />
            <span>{editing ? "WYSIWYG on" : "WYSIWYG off"}</span>
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {dirty ? (
            <span className="text-[0.65rem] uppercase tracking-[0.18em] text-gold">
              Unsaved
            </span>
          ) : null}
          <button
            type="button"
            className="btn-gold !px-3 !py-2"
            onClick={onSave}
            disabled={saving || !dirty}
          >
            {saving ? "Saving…" : "Save to site"}
          </button>
          <button type="button" className="btn-ghost !px-3 !py-2" onClick={onExit}>
            Exit
          </button>
        </div>
      </div>
      <nav className="studio-pages" data-studio-nav aria-label="Studio pages">
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className={pathname === page.href ? "is-active" : ""}
          >
            {page.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
