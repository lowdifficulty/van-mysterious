"use client";

import { useStudio } from "@/components/studio/StudioContext";
import type { SiteBlock } from "@/lib/site-content-types";

export function HomeBlockEditor() {
  const { editing, draft, updateDraft } = useStudio();
  const blocks = draft.site.blocks ?? [];
  if (!editing || !blocks.length) return null;

  const update = (index: number, patch: Partial<SiteBlock>) => {
    updateDraft((current) => {
      const next = (current.site.blocks ?? []).map((block, i) =>
        i === index ? { ...block, ...patch } : block,
      );
      return { ...current, site: { ...current.site, blocks: next } };
    });
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;
    updateDraft((current) => {
      const next = [...(current.site.blocks ?? [])];
      const [item] = next.splice(index, 1);
      next.splice(target, 0, item);
      return { ...current, site: { ...current.site, blocks: next } };
    });
  };

  const remove = (index: number) => {
    updateDraft((current) => ({
      ...current,
      site: {
        ...current.site,
        blocks: (current.site.blocks ?? []).filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <div className="mx-auto mb-16 w-full max-w-4xl space-y-4 px-4 sm:px-5" data-studio-nav>
      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-gold">
        Home sections
      </p>
      {blocks.map((block, index) => (
        <article key={block.id} className="card-cinema space-y-3 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-gold">
              {block.type}
            </p>
            <div className="flex gap-2">
              <button type="button" className="admin-remove" onClick={() => move(index, -1)}>
                Up
              </button>
              <button type="button" className="admin-remove" onClick={() => move(index, 1)}>
                Down
              </button>
              <button type="button" className="admin-remove" onClick={() => remove(index)}>
                Remove
              </button>
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              checked={block.visible}
              onChange={(event) => update(index, { visible: event.target.checked })}
            />
            Visible
          </label>
          {block.kicker != null ? (
            <input
              className="input-cinema"
              value={block.kicker}
              placeholder="Kicker"
              onChange={(event) => update(index, { kicker: event.target.value })}
            />
          ) : null}
          {block.title != null ? (
            <input
              className="input-cinema"
              value={block.title}
              placeholder="Title"
              onChange={(event) => update(index, { title: event.target.value })}
            />
          ) : null}
          {block.body != null ? (
            <textarea
              className="input-cinema min-h-24"
              value={block.body}
              placeholder="Body"
              onChange={(event) => update(index, { body: event.target.value })}
            />
          ) : null}
          {block.quoteName != null ? (
            <input
              className="input-cinema"
              value={block.quoteName}
              placeholder="Attribution"
              onChange={(event) => update(index, { quoteName: event.target.value })}
            />
          ) : null}
          {block.buttonLabel != null ? (
            <input
              className="input-cinema"
              value={block.buttonLabel}
              placeholder="Button label"
              onChange={(event) => update(index, { buttonLabel: event.target.value })}
            />
          ) : null}
          {block.buttonHref != null ? (
            <input
              className="input-cinema"
              value={block.buttonHref}
              placeholder="Button link"
              onChange={(event) => update(index, { buttonHref: event.target.value })}
            />
          ) : null}
          {block.type === "image" ? (
            <input
              className="input-cinema"
              value={block.imageUrl ?? ""}
              placeholder="Image URL"
              onChange={(event) => update(index, { imageUrl: event.target.value })}
            />
          ) : null}
        </article>
      ))}
    </div>
  );
}
