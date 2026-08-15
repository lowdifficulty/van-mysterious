import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Editable } from "@/components/studio/Editable";
import { requireAdmission } from "@/lib/session";
import { pageSeo } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata = pageSeo(
  "Game Hub",
  "Play the weather — Fog Walk and Archive Match, two original games from the same night.",
  "/games",
);

export default async function GamesPage() {
  await requireAdmission();

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-16 md:py-24">
      <PageHeader basePath="games" />
      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/games/lantern"
          className="card-cinema group overflow-hidden"
        >
          <div
            className="min-h-[220px] transition-transform duration-700 group-hover:scale-105"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, #c9a44a 0%, #3a2a12 22%, #070506 70%)",
            }}
          />
          <div className="p-5 sm:p-6">
            <Editable
              path="games.fogKicker"
              as="p"
              className="text-[0.68rem] uppercase tracking-[0.28em] text-gold"
            />
            <Editable
              path="games.fogTitle"
              as="h2"
              className="font-display mt-2 text-3xl text-cream sm:text-4xl"
            />
            <Editable
              path="games.fogLede"
              as="p"
              multiline
              className="mt-3 text-muted"
            />
          </div>
        </Link>
        <Link href="/games/reel" className="card-cinema group overflow-hidden">
          <div
            className="min-h-[220px] transition-transform duration-700 group-hover:scale-105"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, #2a2420 0%, #0c090b 70%)",
            }}
          />
          <div className="p-5 sm:p-6">
            <Editable
              path="games.matchKicker"
              as="p"
              className="text-[0.68rem] uppercase tracking-[0.28em] text-gold"
            />
            <Editable
              path="games.matchTitle"
              as="h2"
              className="font-display mt-2 text-3xl text-cream sm:text-4xl"
            />
            <Editable
              path="games.matchLede"
              as="p"
              multiline
              className="mt-3 text-muted"
            />
          </div>
        </Link>
      </div>
    </main>
  );
}
