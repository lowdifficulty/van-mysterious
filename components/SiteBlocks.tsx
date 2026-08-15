import Link from "next/link";
import type { SiteBlock } from "@/lib/site-content-types";

export function SiteBlocks({ blocks }: { blocks: SiteBlock[] }) {
  const visible = blocks.filter((block) => block.visible);
  if (!visible.length) return null;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 px-4 pb-16 sm:px-5">
      {visible.map((block) => (
        <SiteBlockView key={block.id} block={block} />
      ))}
    </div>
  );
}

function SiteBlockView({ block }: { block: SiteBlock }) {
  if (block.type === "image") {
    return (
      <figure className="card-cinema overflow-hidden">
        {block.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={block.imageUrl} alt={block.title || ""} className="max-h-[28rem] w-full object-cover" />
        ) : (
          <div className="flex min-h-48 items-center justify-center bg-velvet-deep text-[0.7rem] uppercase tracking-[0.2em] text-muted">
            Add an image in the editor
          </div>
        )}
        <figcaption className="px-5 py-4">
          {block.title ? <p className="font-display text-2xl text-cream">{block.title}</p> : null}
          {block.body ? <p className="mt-1 text-sm text-muted">{block.body}</p> : null}
        </figcaption>
      </figure>
    );
  }

  if (block.type === "quote") {
    return (
      <blockquote className="card-cinema px-6 py-8 text-center">
        <p className="font-display text-2xl leading-snug text-cream sm:text-3xl">
          “{block.body}”
        </p>
        {block.quoteName ? (
          <footer className="mt-4 text-[0.7rem] uppercase tracking-[0.2em] text-gold">
            {block.quoteName}
          </footer>
        ) : null}
      </blockquote>
    );
  }

  return (
    <section className="card-cinema px-6 py-8 text-center sm:px-10">
      {block.kicker ? (
        <p className="text-[0.68rem] uppercase tracking-[0.28em] text-gold">{block.kicker}</p>
      ) : null}
      {block.title ? (
        <h2 className="font-display mt-3 text-3xl text-cream sm:text-4xl">{block.title}</h2>
      ) : null}
      {block.body ? <p className="mx-auto mt-4 max-w-xl text-muted">{block.body}</p> : null}
      {block.buttonLabel && block.buttonHref ? (
        <Link href={block.buttonHref} className="btn-gold mt-6">
          {block.buttonLabel}
        </Link>
      ) : null}
    </section>
  );
}
