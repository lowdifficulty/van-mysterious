import { PageHeader } from "@/components/PageHeader";
import { Still } from "@/components/Still";
import { requireAdmission } from "@/lib/session";
import { pageSeo } from "@/lib/seo";
import { loadSiteContent } from "@/lib/site-store";

export const dynamic = "force-dynamic";
export const metadata = pageSeo(
  "Gallery",
  "Original cinematic stills from a picture that was never shot — fog, velvet, and gold light.",
  "/gallery",
);

export default async function GalleryPage() {
  await requireAdmission();
  const content = await loadSiteContent();

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-16 md:py-24">
      <PageHeader basePath="gallery" />
      <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
        {content.gallery.stills.map((still, index) => (
          <div key={still.id} className="mb-6 break-inside-avoid">
            <Still
              id={still.id}
              titlePath={`gallery.stills.${index}.title`}
              captionPath={`gallery.stills.${index}.caption`}
              ratio={still.ratio}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
