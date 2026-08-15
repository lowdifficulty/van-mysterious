import { PageHeader } from "@/components/PageHeader";
import { Editable } from "@/components/studio/Editable";
import { requireAdmission } from "@/lib/session";
import { pageSeo } from "@/lib/seo";
import { loadSiteContent } from "@/lib/site-store";

export const dynamic = "force-dynamic";
export const metadata = pageSeo(
  "About",
  "Van is a fictional muse written for midnight cinema and games — a presence in the cut, not a booking.",
  "/about",
);

export default async function AboutPage() {
  await requireAdmission();
  const content = await loadSiteContent();

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 md:py-24">
      <PageHeader basePath="about" />
      <div className="space-y-6 text-base leading-relaxed text-muted sm:text-lg">
        {content.about.paragraphs.map((_, index) => (
          <Editable
            key={index}
            path={`about.paragraphs.${index}`}
            as="p"
            multiline
          />
        ))}
      </div>
    </main>
  );
}
