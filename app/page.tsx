import { HomeCanvas } from "@/components/HomeCanvas";
import { requireAdmission } from "@/lib/session";
import { loadSiteContent } from "@/lib/site-store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await requireAdmission();
  const content = await loadSiteContent();
  return <HomeCanvas initial={content} />;
}
