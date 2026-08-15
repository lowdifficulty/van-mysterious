import { Editable } from "@/components/studio/Editable";
import { getSession } from "@/lib/session";
import { pageSeo } from "@/lib/seo";
import { loadSiteContent } from "@/lib/site-store";

export const dynamic = "force-dynamic";
export const metadata = pageSeo(
  "Policies",
  "House rules for the Van archive: age, fiction, privacy, and conduct.",
  "/policies",
);

export default async function PoliciesPage() {
  const session = await getSession();
  const content = await loadSiteContent();
  const showAgree = !session.policiesAgreed && !session.admitted && !session.studio;

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-16 md:py-24">
      <Editable
        path="policies.kicker"
        as="p"
        className="text-[0.68rem] uppercase tracking-[0.35em] text-gold"
      />
      <Editable
        path="policies.title"
        as="h1"
        className="font-display mt-3 text-4xl text-cream sm:text-5xl md:text-7xl"
      />
      <div className="gold-rule my-6 max-w-xs" />

      <article className="space-y-8 text-[1.02rem] leading-relaxed text-muted">
        {content.policies.sections.map((_, index) => (
          <section key={index}>
            <Editable
              path={`policies.sections.${index}.heading`}
              as="h2"
              className="font-display text-3xl text-cream"
            />
            <Editable
              path={`policies.sections.${index}.body`}
              as="p"
              multiline
              className="mt-3"
            />
          </section>
        ))}
      </article>

      {showAgree ? (
        <form action="/api/agree" method="post" className="mt-12">
          <button type="submit" className="btn-gold w-full sm:w-auto">
            I have read these Policies — Agree
          </button>
        </form>
      ) : (
        <p className="mt-12 text-sm uppercase tracking-[0.2em] text-gold">
          {session.admitted || session.studio
            ? "You already hold a ticket."
            : "Agreed. Return to the gate to finish entering."}
        </p>
      )}
    </main>
  );
}
