import { PageHeader } from "@/components/PageHeader";
import { Editable } from "@/components/studio/Editable";
import { requireAdmission } from "@/lib/session";
import { pageSeo } from "@/lib/seo";
import { loadSiteContent } from "@/lib/site-store";

export const dynamic = "force-dynamic";
export const metadata = pageSeo(
  "Experiences",
  "Virtual cinematic sessions — from a midnight screening to a single streetlight scene.",
  "/experiences",
);

export default async function ExperiencesPage() {
  await requireAdmission();
  const content = await loadSiteContent();

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-16 md:py-24">
      <PageHeader basePath="experiences" />
      <div className="grid gap-6 md:grid-cols-2">
        {content.experiences.items.map((item, index) => (
          <article key={`${item.name}-${index}`} className="card-cinema flex flex-col p-5 sm:p-7">
            <Editable
              path={`experiences.items.${index}.tier`}
              as="p"
              className="text-[0.68rem] uppercase tracking-[0.28em] text-gold"
            />
            <Editable
              path={`experiences.items.${index}.name`}
              as="h2"
              className="font-display mt-2 text-3xl text-cream sm:text-4xl"
            />
            <Editable
              path={`experiences.items.${index}.price`}
              as="p"
              className="mt-3 font-display text-3xl text-gold-soft"
            />
            <Editable
              path={`experiences.items.${index}.length`}
              as="p"
              className="mt-1 text-xs uppercase tracking-[0.18em] text-muted"
            />
            <Editable
              path={`experiences.items.${index}.summary`}
              as="p"
              multiline
              className="mt-5 leading-relaxed text-muted"
            />
            <ul className="mt-6 space-y-2 text-sm text-cream/85">
              {item.includes.map((_, lineIndex) => (
                <li key={lineIndex} className="flex gap-2">
                  <span className="text-gold">▸</span>
                  <Editable
                    path={`experiences.items.${index}.includes.${lineIndex}`}
                    as="span"
                  />
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </main>
  );
}
