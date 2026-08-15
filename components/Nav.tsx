import Link from "next/link";
import { ResetGate } from "@/components/ResetGate";
import { Editable } from "@/components/studio/Editable";
import type { NavItem } from "@/lib/site-content-types";

export function Nav({ items }: { name?: string; items: NavItem[] }) {
  return (
    <header className="relative z-20 border-b border-gold/15 bg-velvet/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4">
        <Link
          href="/"
          className="font-display text-3xl tracking-wide text-cream"
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
        <details className="lg:hidden">
          <summary className="cursor-pointer list-none text-[0.68rem] uppercase tracking-[0.22em] text-gold">
            Menu
          </summary>
          <nav className="absolute right-5 top-16 flex w-56 flex-col gap-3 border border-gold/20 bg-velvet-deep p-4 text-[0.7rem] uppercase tracking-[0.2em]">
            {items.map((item, index) => (
              <Link key={item.href} href={item.href} className="hover:text-gold">
                <Editable path={`nav.${index}.label`} as="span" />
              </Link>
            ))}
            <Link href="/login" className="text-gold hover:text-gold">
              Login
            </Link>
            <ResetGate />
          </nav>
        </details>
      </div>
    </header>
  );
}
