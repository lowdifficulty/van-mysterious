import { redirect } from "next/navigation";
import { GateForm } from "@/components/GateForm";
import { Editable } from "@/components/studio/Editable";
import { getSession } from "@/lib/session";
import { pageSeo } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site-url";

export const dynamic = "force-dynamic";
export const metadata = {
  ...pageSeo(SITE_NAME, SITE_DESCRIPTION, "/enter"),
  title: { absolute: SITE_NAME },
};

export default async function EnterPage() {
  const session = await getSession();
  if (session.admitted || session.studio) redirect("/");

  return (
    <main className="letterbox relative flex flex-1 items-center justify-center px-4 py-16 sm:px-5 sm:py-24">
      <div className="card-cinema fade-up relative z-10 w-full max-w-lg px-5 py-8 sm:px-8 sm:py-10 md:px-10">
        <Editable
          path="enter.kicker"
          as="p"
          className="text-[0.68rem] uppercase tracking-[0.35em] text-gold"
        />
        <Editable
          path="site.name"
          as="h1"
          className="font-display mt-3 text-5xl text-cream sm:text-6xl"
        />
        <Editable
          path="site.tagline"
          as="p"
          className="mt-4 text-muted leading-relaxed"
        />
        <div className="gold-rule my-6" />

        {!session.policiesAgreed ? (
          <div>
            <Editable
              path="enter.agreeLead"
              as="p"
              multiline
              className="text-sm leading-relaxed text-cream/90"
            />
            <a href="/policies" className="btn-gold relative z-10 mt-8 w-full">
              Open Policies
            </a>
            <a href="/login" className="btn-ghost relative z-10 mt-3 w-full">
              Login
            </a>
          </div>
        ) : (
          <div>
            <Editable
              path="enter.detailsLead"
              as="p"
              multiline
              className="text-sm leading-relaxed text-cream/90"
            />
            <GateForm />
            <a href="/login" className="btn-ghost relative z-10 mt-3 w-full">
              Login
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
