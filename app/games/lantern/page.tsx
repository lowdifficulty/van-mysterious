import Link from "next/link";
import { LanternWalk } from "@/components/games/LanternWalk";
import { PageHeader } from "@/components/PageHeader";
import { requireAdmission } from "@/lib/session";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo(
  "Fog Walk",
  "Light the lanterns. Read the night. Find the silhouette at the end of the path.",
  "/games/lantern",
);

export default async function LanternGamePage() {
  await requireAdmission();

  return (
    <main className="mx-auto w-full max-w-4xl px-5 py-16 md:py-24">
      <PageHeader
        kicker="Fog Walk"
        title="Light the street"
        lede="Click each lantern. The fog yields a sentence. At the end, a silhouette holds."
      />
      <LanternWalk />
      <Link
        href="/games"
        className="mt-8 inline-flex min-h-11 items-center text-[0.7rem] uppercase tracking-[0.22em] text-gold"
      >
        ← Game Hub
      </Link>
    </main>
  );
}
