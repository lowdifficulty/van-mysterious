import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Editable } from "@/components/studio/Editable";
import { requireAdmission } from "@/lib/session";
import { pageSeo } from "@/lib/seo";
import { loadSiteContent } from "@/lib/site-store";

export const dynamic = "force-dynamic";
export const metadata = pageSeo(
  "Diary",
  "Atmospheric notes from the archive — workprints, weather, and ticket stubs.",
  "/diary",
);

export default async function DiaryPage() {
  await requireAdmission();
  const content = await loadSiteContent();

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 md:py-24">
      <PageHeader basePath="diary" />
      <div className="space-y-6">
        {content.diary.entries.map((entry, index) => (
          <Link
            key={entry.slug}
            href={`/diary/${entry.slug}`}
            className="card-cinema block p-5 transition-colors hover:border-gold/40 sm:p-7"
          >
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-gold">
              <Editable path={`diary.entries.${index}.kicker`} as="span" />
              {" · "}
              <Editable path={`diary.entries.${index}.date`} as="span" />
            </p>
            <Editable
              path={`diary.entries.${index}.title`}
              as="h2"
              className="font-display mt-2 text-3xl text-cream"
            />
            <Editable
              path={`diary.entries.${index}.excerpt`}
              as="p"
              multiline
              className="mt-3 leading-relaxed text-muted"
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
