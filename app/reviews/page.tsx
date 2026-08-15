import { PageHeader } from "@/components/PageHeader";
import { Editable } from "@/components/studio/Editable";
import { requireAdmission } from "@/lib/session";
import { pageSeo } from "@/lib/seo";
import { loadSiteContent } from "@/lib/site-store";

export const dynamic = "force-dynamic";
export const metadata = pageSeo(
  "Reviews",
  "What viewers and players kept after the house lights came up.",
  "/reviews",
);

export default async function ReviewsPage() {
  await requireAdmission();
  const content = await loadSiteContent();

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-16 md:py-24">
      <PageHeader basePath="reviews" />
      <div className="grid gap-6 md:grid-cols-2">
        {content.reviews.items.map((_, index) => (
          <blockquote key={index} className="card-cinema p-5 sm:p-7">
            <p className="font-display text-xl leading-snug text-cream sm:text-2xl">
              “
              <Editable path={`reviews.items.${index}.quote`} as="span" multiline />
              ”
            </p>
            <footer className="mt-6 text-[0.7rem] uppercase tracking-[0.2em] text-gold">
              <Editable path={`reviews.items.${index}.name`} as="span" />
              <Editable
                path={`reviews.items.${index}.role`}
                as="span"
                className="mt-1 block normal-case tracking-normal text-muted"
              />
            </footer>
          </blockquote>
        ))}
      </div>
    </main>
  );
}
