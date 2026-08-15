"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useStudio } from "@/components/studio/StudioContext";
import { BLOCK_TYPES, createBlock } from "@/lib/site-blocks";
import { uploadStudioImage } from "@/lib/upload-image";
import type { SiteBlock } from "@/lib/site-content-types";

export type EditorPanel = "add" | "pages" | "design" | "media" | null;

export function EditorDrawer({
  panel,
  onClose,
}: {
  panel: EditorPanel;
  onClose: () => void;
}) {
  if (!panel) return null;

  return (
    <aside className="editor-drawer" data-studio-nav>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[0.68rem] uppercase tracking-[0.22em] text-gold">
          {panel === "add" ? "Add" : panel === "pages" ? "Pages" : panel === "design" ? "Design" : "Media"}
        </p>
        <button type="button" className="admin-remove" onClick={onClose}>
          Close
        </button>
      </div>
      {panel === "add" ? <AddPanel onClose={onClose} /> : null}
      {panel === "pages" ? <PagesPanel /> : null}
      {panel === "design" ? <DesignPanel /> : null}
      {panel === "media" ? <MediaPanel /> : null}
    </aside>
  );
}

function AddPanel({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { updateDraft } = useStudio();

  const add = (type: SiteBlock["type"]) => {
    updateDraft((current) => ({
      ...current,
      site: {
        ...current.site,
        blocks: [...(current.site.blocks ?? []), createBlock(type)],
      },
    }));
    if (pathname !== "/") router.push("/");
    onClose();
  };

  return (
    <div className="space-y-2">
      <p className="mb-3 text-sm text-muted">
        Drop a section onto the home page, then save to publish.
      </p>
      {BLOCK_TYPES.map((item) => (
        <button
          key={item.type}
          type="button"
          className="card-cinema flex w-full flex-col items-start px-4 py-3 text-left"
          onClick={() => add(item.type)}
        >
          <span className="font-display text-xl text-cream">{item.label}</span>
          <span className="text-sm text-muted">{item.hint}</span>
        </button>
      ))}
    </div>
  );
}

function PagesPanel() {
  const { draft, updateDraft } = useStudio();

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted">Show or hide pages in the menu.</p>
      {draft.nav.map((item, index) => (
        <label key={item.href} className="flex items-center justify-between gap-3 border-b border-gold/10 py-2">
          <span className="text-sm text-cream">{item.label}</span>
          <input
            type="checkbox"
            checked={!item.hidden}
            onChange={(event) => {
              const hidden = !event.target.checked;
              updateDraft((current) => {
                const nav = current.nav.map((entry, i) =>
                  i === index ? { ...entry, hidden } : entry,
                );
                const chapters = current.chapters.map((entry) =>
                  entry.href === item.href ? { ...entry, hidden } : entry,
                );
                return { ...current, nav, chapters };
              });
            }}
          />
        </label>
      ))}
    </div>
  );
}

function DesignPanel() {
  const { draft, setField, updateDraft } = useStudio();

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.2em] text-gold">
          Default theme
        </span>
        <select
          className="input-cinema"
          value={draft.site.defaultTheme === "light" ? "light" : "dark"}
          onChange={(event) =>
            updateDraft((current) => ({
              ...current,
              site: {
                ...current.site,
                defaultTheme: event.target.value === "light" ? "light" : "dark",
              },
            }))
          }
        >
          <option value="dark">Dark noir</option>
          <option value="light">Light paper</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.2em] text-gold">
          SEO title
        </span>
        <input
          className="input-cinema"
          value={draft.site.seoTitle ?? ""}
          onChange={(event) => setField("site.seoTitle", event.target.value)}
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.2em] text-gold">
          SEO description
        </span>
        <textarea
          className="input-cinema min-h-28"
          value={draft.site.seoDescription ?? ""}
          onChange={(event) => setField("site.seoDescription", event.target.value)}
        />
      </label>
    </div>
  );
}

function MediaPanel() {
  const { draft, updateDraft } = useStudio();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const blocks = draft.site.blocks ?? [];

  const onFile = async (file: File | undefined, apply: (url: string) => void) => {
    if (!file) return;
    setBusy(true);
    setMessage("");
    try {
      apply(await uploadStudioImage(file));
      setMessage("Uploaded.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted">
        Upload a photo, then attach it to a home image section or a gallery still.
      </p>
      {message ? <p className="text-[0.7rem] uppercase tracking-[0.16em] text-gold">{message}</p> : null}

      <label className="block">
        <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.2em] text-gold">
          New home image section
        </span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          disabled={busy}
          onChange={async (event) => {
            const file = event.target.files?.[0];
            await onFile(file, (url) => {
              const block = createBlock("image");
              block.imageUrl = url;
              block.title = file?.name.replace(/\.[^.]+$/, "") || "Untitled still";
              updateDraft((current) => ({
                ...current,
                site: { ...current.site, blocks: [...(current.site.blocks ?? []), block] },
              }));
            });
            event.target.value = "";
          }}
        />
      </label>

      {blocks
        .map((block, index) => ({ block, index }))
        .filter(({ block }) => block.type === "image")
        .map(({ block, index }) => (
          <label key={block.id} className="block">
            <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.2em] text-gold">
              Replace: {block.title || "Image section"}
            </span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              disabled={busy}
              onChange={async (event) => {
                await onFile(event.target.files?.[0], (url) => {
                  updateDraft((current) => {
                    const next = (current.site.blocks ?? []).map((item, i) =>
                      i === index ? { ...item, imageUrl: url } : item,
                    );
                    return { ...current, site: { ...current.site, blocks: next } };
                  });
                });
                event.target.value = "";
              }}
            />
          </label>
        ))}

      {draft.gallery.stills.map((still, index) => (
        <label key={`${still.id}-${index}`} className="block">
          <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.2em] text-gold">
            Gallery: {still.title}
          </span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            disabled={busy}
            onChange={async (event) => {
              await onFile(event.target.files?.[0], (url) => {
                updateDraft((current) => {
                  const stills = current.gallery.stills.map((item, i) =>
                    i === index ? { ...item, imageUrl: url } : item,
                  );
                  return { ...current, gallery: { ...current.gallery, stills } };
                });
              });
              event.target.value = "";
            }}
          />
        </label>
      ))}
    </div>
  );
}
