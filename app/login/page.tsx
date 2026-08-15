import { redirect } from "next/navigation";
import { VanLoginForm } from "@/components/studio/VanLoginForm";
import { getSession } from "@/lib/session";
import { pageSeo } from "@/lib/seo";

export const metadata = {
  ...pageSeo(
    "Login",
    "Sign in to Van’s admin portal to edit the archive.",
    "/login",
  ),
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const session = await getSession();
  if (session.studio) redirect("/admin");

  return (
    <main className="letterbox relative flex flex-1 items-center justify-center px-4 py-16 sm:px-5 sm:py-24">
      <div className="card-cinema fade-up relative z-10 w-full max-w-lg px-5 py-8 sm:px-8 sm:py-10 md:px-10">
        <p className="text-[0.68rem] uppercase tracking-[0.35em] text-gold">
          Login
        </p>
        <h1 className="font-display mt-3 text-5xl text-cream sm:text-6xl">Van</h1>
        <p className="mt-4 leading-relaxed text-muted">
          Sign in to the admin portal. Add gallery stills, diary pages,
          experiences, reviews, and Q & A — then save them to the live site.
        </p>
        <div className="gold-rule my-6" />
        <VanLoginForm />
      </div>
    </main>
  );
}
