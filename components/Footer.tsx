import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Editable } from "@/components/studio/Editable";

export function Footer({
  admitted,
}: {
  admitted: boolean;
  line?: string;
  note?: string;
}) {
  return (
    <footer className="relative z-10 mt-auto border-t border-gold/10 px-4 py-6 text-center text-[0.65rem] uppercase tracking-[0.16em] text-muted sm:px-5 sm:py-8 sm:text-[0.7rem] sm:tracking-[0.2em]">
      <div className="mb-4 flex justify-center">
        <ThemeToggle />
      </div>
      <Editable path="site.footerLine" as="p" />
      <p className="mt-2 normal-case tracking-normal text-muted/80">
        <Editable path="site.footerNote" as="span" />
        {admitted ? (
          <>
            {" "}
            <Link href="/policies" className="inline-flex min-h-10 items-center text-gold/80 hover:text-gold">
              Policies
            </Link>
            {" · "}
            <Link href="/login" className="inline-flex min-h-10 items-center text-gold/80 hover:text-gold">
              Login
            </Link>
          </>
        ) : (
          <>
            {" "}
            <a href="/policies" className="inline-flex min-h-10 items-center text-gold/80 hover:text-gold">
              Read Policies
            </a>
            {" · "}
            <a href="/login" className="inline-flex min-h-10 items-center text-gold/80 hover:text-gold">
              Login
            </a>
          </>
        )}
      </p>
    </footer>
  );
}
