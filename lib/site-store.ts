import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { defaultContent } from "@/lib/default-content";
import type { SiteContent } from "@/lib/site-content-types";

const FILE = path.join(process.cwd(), "data", "site-content.json");

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function deepMerge<T>(base: T, overlay: unknown): T {
  if (!isObject(base) || !isObject(overlay)) {
    return (overlay as T) ?? base;
  }
  const next: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(overlay)) {
    const current = next[key];
    if (Array.isArray(value)) {
      next[key] = value;
    } else if (isObject(value) && isObject(current)) {
      next[key] = deepMerge(current, value);
    } else if (value !== undefined) {
      next[key] = value;
    }
  }
  return next as T;
}

export async function loadSiteContent(): Promise<SiteContent> {
  try {
    const raw = await readFile(FILE, "utf8");
    return deepMerge(defaultContent, JSON.parse(raw));
  } catch {
    return structuredClone(defaultContent);
  }
}

export async function saveSiteContent(content: SiteContent) {
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, `${JSON.stringify(content, null, 2)}\n`, "utf8");
}

