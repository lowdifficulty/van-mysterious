import Link from "next/link";
import { notFound } from "next/navigation";
import { Editable } from "@/components/studio/Editable";
import { defaultContent } from "@/lib/default-content";
import { requireAdmission } from "@/lib/session";
import { pageSeo } from "@/lib/seo";
import { loadSiteContent } from "@/lib/site-store";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return defaultContent.diary.entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await loadSiteContent();
  const entry = content.diary.entries.find((item) => item.slug === slug);
  if (!entry) return { title: "Diary" };
  return pageSeo(entry.title, entry.excerpt, `/diary/${slug}`);
}

export default async function DiaryEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireAdmission();
  const { slug } = await params;
  const content = await loadSiteContent();
  const index = content.diary.entries.findIndex((item) => item.slug === slug);
  const entry = content.diary.entries[index];
  if (!entry) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 md:py-24">
      <p className="text-[0.68rem] uppercase tracking-[0.28em] text-gold">
        <Editable path={`diary.entries.${index}.kicker`} as="span" />
        {" · "}
        <Editable path={`diary.entries.${index}.date`} as="span" />
      </p>
      <Editable
        path={`diary.entries.${index}.title`}
        as="h1"
        className="font-display mt-3 text-4xl text-cream sm:text-5xl md:text-6xl"
      />
      <div className="gold-rule my-6 max-w-xs" />
      <article className="space-y-5 text-lg leading-relaxed text-muted">
        {entry.body.map((_, paragraphIndex) => (
          <Editable
            key={paragraphIndex}
            path={`diary.entries.${index}.body.${paragraphIndex}`}
            as="p"
            multiline
          />
        ))}
      </article>
      <Link
        href="/diary"
        className="mt-12 inline-flex min-h-11 items-center text-[0.7rem] uppercase tracking-[0.22em] text-gold"
      >
        ← All entries
      </Link>
    </main>
  );
}
