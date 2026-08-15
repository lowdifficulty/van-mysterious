import { Editable } from "@/components/studio/Editable";

export function PageHeader({
  basePath,
  kicker,
  title,
  lede,
}: {
  basePath?: string;
  kicker?: string;
  title?: string;
  lede?: string;
}) {
  if (basePath) {
    return (
      <header className="mb-10 max-w-3xl sm:mb-14">
        <Editable
          path={`${basePath}.kicker`}
          as="p"
          className="text-[0.62rem] uppercase tracking-[0.22em] text-gold sm:text-[0.68rem] sm:tracking-[0.35em]"
        />
        <Editable
          path={`${basePath}.title`}
          as="h1"
          className="font-display mt-3 text-4xl leading-[1.05] text-cream sm:text-5xl md:text-7xl"
        />
        <div className="gold-rule my-6 max-w-xs" />
        <Editable
          path={`${basePath}.lede`}
          as="p"
          multiline
          className="text-base leading-relaxed text-muted md:text-lg"
        />
      </header>
    );
  }

  return (
    <header className="mb-10 max-w-3xl sm:mb-14">
      <p className="text-[0.62rem] uppercase tracking-[0.22em] text-gold sm:text-[0.68rem] sm:tracking-[0.35em]">
        {kicker}
      </p>
      <h1 className="font-display mt-3 text-4xl leading-[1.05] text-cream sm:text-5xl md:text-7xl">
        {title}
      </h1>
      <div className="gold-rule my-6 max-w-xs" />
      <p className="text-base leading-relaxed text-muted md:text-lg">{lede}</p>
    </header>
  );
}
