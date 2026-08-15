import { AdminPortal } from "@/components/admin/AdminPortal";
import { requireStudio } from "@/lib/session";
import { loadSiteContent } from "@/lib/site-store";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  await requireStudio();
  const content = await loadSiteContent();
  return <AdminPortal initial={content} />;
}
