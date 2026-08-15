import { PageHeader } from "@/components/PageHeader";
import { Editable } from "@/components/studio/Editable";
import { requireAdmission } from "@/lib/session";
import { pageSeo } from "@/lib/seo";
import { loadSiteContent } from "@/lib/site-store";

export const dynamic = "force-dynamic";
export const metadata = pageSeo(
  "Q & A",
  "Questions the dark already answered — who Van is, how the gate works, and what the archive is not.",
  "/qa",
);

export default async function QaPage() {
  await requireAdmission();
  const content = await loadSiteContent();

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 md:py-24">
      <PageHeader basePath="qa" />
      <div className="space-y-5">
        {content.qa.items.map((_, index) => (
          <section key={index} className="card-cinema p-5 sm:p-6">
            <Editable
              path={`qa.items.${index}.q`}
              as="h2"
              className="font-display text-2xl text-cream"
            />
            <Editable
              path={`qa.items.${index}.a`}
              as="p"
              multiline
              className="mt-3 leading-relaxed text-muted"
            />
          </section>
        ))}
      </div>
    </main>
  );
}
