import { ContactForm } from "@/components/ContactForm";
import { PageHeader } from "@/components/PageHeader";
import { requireAdmission } from "@/lib/session";
import { pageSeo } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata = pageSeo(
  "Contact",
  "Leave a note for the archive — questions about the fiction, the games, or the stills.",
  "/contact",
);

export default async function ContactPage() {
  await requireAdmission();

  return (
    <main className="mx-auto w-full max-w-xl px-4 py-14 sm:px-5 sm:py-16 md:py-24">
      <PageHeader basePath="contact" />
      <ContactForm />
    </main>
  );
}
