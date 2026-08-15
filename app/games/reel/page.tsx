import Link from "next/link";
import { ReelMatch } from "@/components/games/ReelMatch";
import { PageHeader } from "@/components/PageHeader";
import { requireAdmission } from "@/lib/session";
import { pageSeo } from "@/lib/seo";

export const metadata = pageSeo(
  "Archive Match",
  "A film-reel memory game. Pair the props until the cut is assembled.",
  "/games/reel",
);

export default async function ReelGamePage() {
  await requireAdmission();

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 md:py-24">
      <PageHeader
        kicker="Archive Match"
        title="Assemble the cut"
        lede="A memory reel of eight props. Pair them. When the cabinet is complete, the picture holds."
      />
      <ReelMatch />
      <Link
        href="/games"
        className="mt-8 inline-flex min-h-11 items-center text-[0.7rem] uppercase tracking-[0.22em] text-gold"
      >
        ← Game Hub
      </Link>
    </main>
  );
}
