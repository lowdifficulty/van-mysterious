import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";
import { loadSiteContent } from "@/lib/site-store";

const STATIC_PATHS = [
  "/",
  "/enter",
  "/about",
  "/gallery",
  "/experiences",
  "/diary",
  "/reviews",
  "/qa",
  "/contact",
  "/games",
  "/games/lantern",
  "/games/reel",
  "/policies",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await loadSiteContent();
  const now = new Date();

  const pages = [
    ...STATIC_PATHS.map((path) => ({
      url: new URL(path, SITE_URL).toString(),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "/" || path === "/enter" ? 1 : 0.7,
    })),
    ...content.diary.entries.map((entry) => ({
      url: new URL(`/diary/${entry.slug}`, SITE_URL).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];

  return pages;
}
