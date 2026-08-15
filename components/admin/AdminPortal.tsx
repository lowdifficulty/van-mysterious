"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { slugify } from "@/lib/slug";
import { uploadStudioImage } from "@/lib/upload-image";
import type {
  DiaryEntry,
  ExperienceContent,
  QuestionContent,
  ReviewContent,
  SiteContent,
  StillContent,
} from "@/lib/site-content-types";

const TABS = [
  { id: "site", label: "Site" },
  { id: "pages", label: "Pages" },
  { id: "media", label: "Media" },
  { id: "gallery", label: "Gallery" },
  { id: "diary", label: "Diary" },
  { id: "experiences", label: "Experiences" },
  { id: "reviews", label: "Reviews" },
  { id: "qa", label: "Q & A" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const FRAME_IDS = [
  "streetlight",
  "fogwalk",
  "velvet",
  "reel",
  "window",
  "lantern",
  "platform",
  "mask",
  "chair",
  "corridor",
  "moon",
  "ticket",
] as const;

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.2em] text-gold">
        {label}
      </span>
      {multiline ? (
        <textarea
          className="input-cinema min-h-28"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          className="input-cinema"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </label>
  );
}

function PageCopyFields({
  kicker,
  title,
  lede,
  onChange,
}: {
  kicker: string;
  title: string;
  lede: string;
  onChange: (field: "kicker" | "title" | "lede", value: string) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field label="Section kicker" value={kicker} onChange={(value) => onChange("kicker", value)} />
      <Field label="Section title" value={title} onChange={(value) => onChange("title", value)} />
      <div className="md:col-span-2">
        <Field
          label="Section intro"
          value={lede}
          multiline
          onChange={(value) => onChange("lede", value)}
        />
      </div>
    </div>
  );
}

export function AdminPortal({ initial }: { initial: SiteContent }) {
  const router = useRouter();
  const [tab, setTab] = useState<TabId>("site");
  const [draft, setDraft] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const counts = useMemo(
    () => ({
      gallery: draft.gallery.stills.length,
      diary: draft.diary.entries.length,
      experiences: draft.experiences.items.length,
      reviews: draft.reviews.items.length,
      qa: draft.qa.items.length,
    }),
    [draft],
  );

  const save = async () => {
    setSaving(true);
    setMessage("");
    const response = await fetch("/api/van/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    setSaving(false);
    if (!response.ok) {
      setMessage("Save failed. Try again.");
      return;
    }
    setMessage("Saved to the live site.");
    router.refresh();
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-10 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.35em] text-gold">
            Admin portal
          </p>
          <h1 className="font-display mt-2 text-4xl text-cream sm:text-5xl md:text-6xl">
            Custom content
          </h1>
          <p className="mt-3 max-w-xl text-muted">
            Wix-style site tools: pages, media, design, plus gallery, diary,
            experiences, reviews, and Q & A. Publish writes them to the live site.
          </p>
        </div>
        <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:items-end">
          {message ? (
            <p className="text-[0.7rem] uppercase tracking-[0.16em] text-gold">
              {message}
            </p>
          ) : null}
          <button type="button" className="btn-gold w-full sm:w-auto" onClick={save} disabled={saving}>
            {saving ? "Saving…" : "Save to site"}
          </button>
        </div>
      </div>

      <div className="gold-rule my-8 max-w-xs" />

      <div className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`admin-tab ${tab === item.id ? "is-active" : ""}`}
            onClick={() => setTab(item.id)}
          >
            {item.label}
            {item.id in counts ? (
              <span className="ml-2 text-gold/70">{counts[item.id as keyof typeof counts]}</span>
            ) : null}
          </button>
        ))}
      </div>

      {tab === "site" ? <SiteAdmin content={draft} setDraft={setDraft} /> : null}
      {tab === "pages" ? <PagesAdmin content={draft} setDraft={setDraft} /> : null}
      {tab === "media" ? <MediaAdmin content={draft} setDraft={setDraft} /> : null}
      {tab === "gallery" ? (
        <GalleryAdmin
          content={draft}
          setDraft={setDraft}
        />
      ) : null}
      {tab === "diary" ? <DiaryAdmin content={draft} setDraft={setDraft} /> : null}
      {tab === "experiences" ? (
        <ExperiencesAdmin content={draft} setDraft={setDraft} />
      ) : null}
      {tab === "reviews" ? <ReviewsAdmin content={draft} setDraft={setDraft} /> : null}
      {tab === "qa" ? <QaAdmin content={draft} setDraft={setDraft} /> : null}
    </main>
  );
}

function GalleryAdmin({
  content,
  setDraft,
}: {
  content: SiteContent;
  setDraft: (updater: (current: SiteContent) => SiteContent) => void;
}) {
  const updatePage = (field: "kicker" | "title" | "lede", value: string) => {
    setDraft((current) => ({
      ...current,
      gallery: { ...current.gallery, [field]: value },
    }));
  };

  const updateStill = (index: number, patch: Partial<StillContent>) => {
    setDraft((current) => {
      const stills = current.gallery.stills.map((still, i) =>
        i === index ? { ...still, ...patch } : still,
      );
      return { ...current, gallery: { ...current.gallery, stills } };
    });
  };

  const addStill = () => {
    const next: StillContent = {
      id: "reel",
      title: "New still",
      caption: "Write a caption for this frame.",
      ratio: "square",
    };
    setDraft((current) => ({
      ...current,
      gallery: { ...current.gallery, stills: [...current.gallery.stills, next] },
    }));
  };

  const removeStill = (index: number) => {
    setDraft((current) => ({
      ...current,
      gallery: {
        ...current.gallery,
        stills: current.gallery.stills.filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <div className="space-y-6">
      <PageCopyFields
        kicker={content.gallery.kicker}
        title={content.gallery.title}
        lede={content.gallery.lede}
        onChange={updatePage}
      />
      <div className="flex justify-end">
        <button type="button" className="btn-ghost" onClick={addStill}>
          Add still
        </button>
      </div>
      {content.gallery.stills.map((still, index) => (
        <article key={`${still.id}-${index}`} className="card-cinema space-y-4 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-gold">
              Still {index + 1}
            </p>
            <button type="button" className="admin-remove" onClick={() => removeStill(index)}>
              Remove
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Title"
              value={still.title}
              onChange={(value) => updateStill(index, { title: value })}
            />
            <label className="block">
              <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.2em] text-gold">
                Frame
              </span>
              <select
                className="input-cinema"
                value={still.id}
                onChange={(event) => updateStill(index, { id: event.target.value })}
              >
                {FRAME_IDS.map((id) => (
                  <option key={id} value={id}>
                    {id}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.2em] text-gold">
                Shape
              </span>
              <select
                className="input-cinema"
                value={still.ratio}
                onChange={(event) => updateStill(index, { ratio: event.target.value })}
              >
                <option value="wide">Wide</option>
                <option value="tall">Tall</option>
                <option value="square">Square</option>
              </select>
            </label>
            <div className="md:col-span-2">
              <Field
                label="Image URL"
                value={still.imageUrl ?? ""}
                onChange={(value) => updateStill(index, { imageUrl: value })}
              />
            </div>
            <div className="md:col-span-2">
              <Field
                label="Caption"
                value={still.caption}
                multiline
                onChange={(value) => updateStill(index, { caption: value })}
              />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function DiaryAdmin({
  content,
  setDraft,
}: {
  content: SiteContent;
  setDraft: (updater: (current: SiteContent) => SiteContent) => void;
}) {
  const updatePage = (field: "kicker" | "title" | "lede", value: string) => {
    setDraft((current) => ({
      ...current,
      diary: { ...current.diary, [field]: value },
    }));
  };

  const updateEntry = (index: number, patch: Partial<DiaryEntry>) => {
    setDraft((current) => {
      const entries = current.diary.entries.map((entry, i) =>
        i === index ? { ...entry, ...patch } : entry,
      );
      return { ...current, diary: { ...current.diary, entries } };
    });
  };

  const addEntry = () => {
    const title = "New diary page";
    const next: DiaryEntry = {
      slug: slugify(`${title}-${Date.now()}`),
      title,
      date: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      kicker: "Note",
      excerpt: "A short line that appears on the diary list.",
      body: ["Write the first paragraph here."],
    };
    setDraft((current) => ({
      ...current,
      diary: { ...current.diary, entries: [next, ...current.diary.entries] },
    }));
  };

  const removeEntry = (index: number) => {
    setDraft((current) => ({
      ...current,
      diary: {
        ...current.diary,
        entries: current.diary.entries.filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <div className="space-y-6">
      <PageCopyFields
        kicker={content.diary.kicker}
        title={content.diary.title}
        lede={content.diary.lede}
        onChange={updatePage}
      />
      <div className="flex justify-end">
        <button type="button" className="btn-ghost" onClick={addEntry}>
          Add diary page
        </button>
      </div>
      {content.diary.entries.map((entry, index) => (
        <article key={entry.slug} className="card-cinema space-y-4 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-gold">
              /diary/{entry.slug}
            </p>
            <button type="button" className="admin-remove" onClick={() => removeEntry(index)}>
              Remove
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Title"
              value={entry.title}
              onChange={(value) => updateEntry(index, { title: value })}
            />
            <Field
              label="Date"
              value={entry.date}
              onChange={(value) => updateEntry(index, { date: value })}
            />
            <Field
              label="Kicker"
              value={entry.kicker}
              onChange={(value) => updateEntry(index, { kicker: value })}
            />
            <div className="md:col-span-2">
              <Field
                label="List excerpt"
                value={entry.excerpt}
                multiline
                onChange={(value) => updateEntry(index, { excerpt: value })}
              />
            </div>
            <div className="md:col-span-2">
              <Field
                label="Body (one paragraph per line)"
                value={entry.body.join("\n\n")}
                multiline
                onChange={(value) =>
                  updateEntry(index, {
                    body: value
                      .split(/\n\s*\n/)
                      .map((part) => part.trim())
                      .filter(Boolean),
                  })
                }
              />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function ExperiencesAdmin({
  content,
  setDraft,
}: {
  content: SiteContent;
  setDraft: (updater: (current: SiteContent) => SiteContent) => void;
}) {
  const updatePage = (field: "kicker" | "title" | "lede", value: string) => {
    setDraft((current) => ({
      ...current,
      experiences: { ...current.experiences, [field]: value },
    }));
  };

  const updateItem = (index: number, patch: Partial<ExperienceContent>) => {
    setDraft((current) => {
      const items = current.experiences.items.map((item, i) =>
        i === index ? { ...item, ...patch } : item,
      );
      return { ...current, experiences: { ...current.experiences, items } };
    });
  };

  const addItem = () => {
    const next: ExperienceContent = {
      tier: "Custom",
      name: "New experience",
      price: "$0",
      length: "30 minutes, virtual",
      summary: "Describe this package.",
      includes: ["First included moment"],
    };
    setDraft((current) => ({
      ...current,
      experiences: {
        ...current.experiences,
        items: [...current.experiences.items, next],
      },
    }));
  };

  const removeItem = (index: number) => {
    setDraft((current) => ({
      ...current,
      experiences: {
        ...current.experiences,
        items: current.experiences.items.filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <div className="space-y-6">
      <PageCopyFields
        kicker={content.experiences.kicker}
        title={content.experiences.title}
        lede={content.experiences.lede}
        onChange={updatePage}
      />
      <div className="flex justify-end">
        <button type="button" className="btn-ghost" onClick={addItem}>
          Add experience
        </button>
      </div>
      {content.experiences.items.map((item, index) => (
        <article key={`${item.name}-${index}`} className="card-cinema space-y-4 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-gold">
              Package {index + 1}
            </p>
            <button type="button" className="admin-remove" onClick={() => removeItem(index)}>
              Remove
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Tier"
              value={item.tier}
              onChange={(value) => updateItem(index, { tier: value })}
            />
            <Field
              label="Name"
              value={item.name}
              onChange={(value) => updateItem(index, { name: value })}
            />
            <Field
              label="Price"
              value={item.price}
              onChange={(value) => updateItem(index, { price: value })}
            />
            <Field
              label="Length"
              value={item.length}
              onChange={(value) => updateItem(index, { length: value })}
            />
            <div className="md:col-span-2">
              <Field
                label="Summary"
                value={item.summary}
                multiline
                onChange={(value) => updateItem(index, { summary: value })}
              />
            </div>
            <div className="md:col-span-2">
              <Field
                label="Includes (one per line)"
                value={item.includes.join("\n")}
                multiline
                onChange={(value) =>
                  updateItem(index, {
                    includes: value
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean),
                  })
                }
              />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function ReviewsAdmin({
  content,
  setDraft,
}: {
  content: SiteContent;
  setDraft: (updater: (current: SiteContent) => SiteContent) => void;
}) {
  const updatePage = (field: "kicker" | "title" | "lede", value: string) => {
    setDraft((current) => ({
      ...current,
      reviews: { ...current.reviews, [field]: value },
    }));
  };

  const updateItem = (index: number, patch: Partial<ReviewContent>) => {
    setDraft((current) => {
      const items = current.reviews.items.map((item, i) =>
        i === index ? { ...item, ...patch } : item,
      );
      return { ...current, reviews: { ...current.reviews, items } };
    });
  };

  const addItem = () => {
    const next: ReviewContent = {
      quote: "Write the review here.",
      name: "Name",
      role: "Viewer",
    };
    setDraft((current) => ({
      ...current,
      reviews: { ...current.reviews, items: [...current.reviews.items, next] },
    }));
  };

  const removeItem = (index: number) => {
    setDraft((current) => ({
      ...current,
      reviews: {
        ...current.reviews,
        items: current.reviews.items.filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <div className="space-y-6">
      <PageCopyFields
        kicker={content.reviews.kicker}
        title={content.reviews.title}
        lede={content.reviews.lede}
        onChange={updatePage}
      />
      <div className="flex justify-end">
        <button type="button" className="btn-ghost" onClick={addItem}>
          Add review
        </button>
      </div>
      {content.reviews.items.map((item, index) => (
        <article key={`${item.name}-${index}`} className="card-cinema space-y-4 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-gold">
              Review {index + 1}
            </p>
            <button type="button" className="admin-remove" onClick={() => removeItem(index)}>
              Remove
            </button>
          </div>
          <Field
            label="Quote"
            value={item.quote}
            multiline
            onChange={(value) => updateItem(index, { quote: value })}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <Field
              label="Name"
              value={item.name}
              onChange={(value) => updateItem(index, { name: value })}
            />
            <Field
              label="Role"
              value={item.role}
              onChange={(value) => updateItem(index, { role: value })}
            />
          </div>
        </article>
      ))}
    </div>
  );
}

function QaAdmin({
  content,
  setDraft,
}: {
  content: SiteContent;
  setDraft: (updater: (current: SiteContent) => SiteContent) => void;
}) {
  const updatePage = (field: "kicker" | "title" | "lede", value: string) => {
    setDraft((current) => ({
      ...current,
      qa: { ...current.qa, [field]: value },
    }));
  };

  const updateItem = (index: number, patch: Partial<QuestionContent>) => {
    setDraft((current) => {
      const items = current.qa.items.map((item, i) =>
        i === index ? { ...item, ...patch } : item,
      );
      return { ...current, qa: { ...current.qa, items } };
    });
  };

  const addItem = () => {
    const next: QuestionContent = {
      q: "New question?",
      a: "Write the answer.",
    };
    setDraft((current) => ({
      ...current,
      qa: { ...current.qa, items: [...current.qa.items, next] },
    }));
  };

  const removeItem = (index: number) => {
    setDraft((current) => ({
      ...current,
      qa: { ...current.qa, items: current.qa.items.filter((_, i) => i !== index) },
    }));
  };

  return (
    <div className="space-y-6">
      <PageCopyFields
        kicker={content.qa.kicker}
        title={content.qa.title}
        lede={content.qa.lede}
        onChange={updatePage}
      />
      <div className="flex justify-end">
        <button type="button" className="btn-ghost" onClick={addItem}>
          Add question
        </button>
      </div>
      {content.qa.items.map((item, index) => (
        <article key={`${item.q}-${index}`} className="card-cinema space-y-4 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-gold">
              Q & A {index + 1}
            </p>
            <button type="button" className="admin-remove" onClick={() => removeItem(index)}>
              Remove
            </button>
          </div>
          <Field
            label="Question"
            value={item.q}
            onChange={(value) => updateItem(index, { q: value })}
          />
          <Field
            label="Answer"
            value={item.a}
            multiline
            onChange={(value) => updateItem(index, { a: value })}
          />
        </article>
      ))}
    </div>
  );
}

function SiteAdmin({
  content,
  setDraft,
}: {
  content: SiteContent;
  setDraft: (updater: (current: SiteContent) => SiteContent) => void;
}) {
  const setSite = (patch: Partial<SiteContent["site"]>) => {
    setDraft((current) => ({ ...current, site: { ...current.site, ...patch } }));
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field label="Site name" value={content.site.name} onChange={(value) => setSite({ name: value })} />
      <Field label="Tagline" value={content.site.tagline} onChange={(value) => setSite({ tagline: value })} />
      <div className="md:col-span-2">
        <Field label="Blurb" value={content.site.blurb} multiline onChange={(value) => setSite({ blurb: value })} />
      </div>
      <Field
        label="SEO title"
        value={content.site.seoTitle ?? ""}
        onChange={(value) => setSite({ seoTitle: value })}
      />
      <label className="block">
        <span className="mb-2 block text-[0.65rem] uppercase tracking-[0.2em] text-gold">
          Default theme
        </span>
        <select
          className="input-cinema"
          value={content.site.defaultTheme === "light" ? "light" : "dark"}
          onChange={(event) =>
            setSite({ defaultTheme: event.target.value === "light" ? "light" : "dark" })
          }
        >
          <option value="dark">Dark noir</option>
          <option value="light">Light paper</option>
        </select>
      </label>
      <div className="md:col-span-2">
        <Field
          label="SEO description"
          value={content.site.seoDescription ?? ""}
          multiline
          onChange={(value) => setSite({ seoDescription: value })}
        />
      </div>
      <Field
        label="Footer line"
        value={content.site.footerLine}
        onChange={(value) => setSite({ footerLine: value })}
      />
      <Field
        label="Footer note"
        value={content.site.footerNote}
        onChange={(value) => setSite({ footerNote: value })}
      />
    </div>
  );
}

function PagesAdmin({
  content,
  setDraft,
}: {
  content: SiteContent;
  setDraft: (updater: (current: SiteContent) => SiteContent) => void;
}) {
  return (
    <div className="space-y-3">
      {content.nav.map((item, index) => (
        <article key={item.href} className="card-cinema flex flex-wrap items-center gap-4 p-4">
          <input
            className="input-cinema min-w-40 flex-1"
            value={item.label}
            onChange={(event) => {
              const label = event.target.value;
              setDraft((current) => ({
                ...current,
                nav: current.nav.map((entry, i) => (i === index ? { ...entry, label } : entry)),
                chapters: current.chapters.map((entry) =>
                  entry.href === item.href ? { ...entry, label } : entry,
                ),
              }));
            }}
          />
          <label className="flex items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              checked={!item.hidden}
              onChange={(event) => {
                const hidden = !event.target.checked;
                setDraft((current) => ({
                  ...current,
                  nav: current.nav.map((entry, i) => (i === index ? { ...entry, hidden } : entry)),
                  chapters: current.chapters.map((entry) =>
                    entry.href === item.href ? { ...entry, hidden } : entry,
                  ),
                }));
              }}
            />
            In menu
          </label>
        </article>
      ))}
    </div>
  );
}

function MediaAdmin({
  content,
  setDraft,
}: {
  content: SiteContent;
  setDraft: (updater: (current: SiteContent) => SiteContent) => void;
}) {
  const [message, setMessage] = useState("");

  const onFile = async (file: File | undefined, apply: (url: string) => void) => {
    if (!file) return;
    try {
      apply(await uploadStudioImage(file));
      setMessage("Uploaded.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    }
  };

  return (
    <div className="space-y-4">
      {message ? <p className="text-[0.7rem] uppercase tracking-[0.16em] text-gold">{message}</p> : null}
      {content.gallery.stills.map((still, index) => (
        <article key={`${still.id}-${index}`} className="card-cinema space-y-3 p-4">
          <p className="text-[0.68rem] uppercase tracking-[0.2em] text-gold">{still.title}</p>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(event) => {
              void onFile(event.target.files?.[0], (url) => {
                setDraft((current) => ({
                  ...current,
                  gallery: {
                    ...current.gallery,
                    stills: current.gallery.stills.map((item, i) =>
                      i === index ? { ...item, imageUrl: url } : item,
                    ),
                  },
                }));
              });
              event.target.value = "";
            }}
          />
        </article>
      ))}
    </div>
  );
}
