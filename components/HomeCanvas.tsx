"use client";

import Link from "next/link";
import { SiteBlocks } from "@/components/SiteBlocks";
import { Editable } from "@/components/studio/Editable";
import { HomeBlockEditor } from "@/components/studio/HomeBlockEditor";
import { useStudioOptional } from "@/components/studio/StudioContext";
import type { SiteContent } from "@/lib/site-content-types";

export function HomeCanvas({ initial }: { initial: SiteContent }) {
  const studio = useStudioOptional();
  const content = studio?.draft ?? initial;
  return (
    <>
      <main className="letterbox relative flex flex-1 flex-col items-center justify-center px-4 py-14 text-center sm:px-5 sm:py-20">
        <Editable
          path="site.homeKicker"
          as="p"
          className="fade-up text-[0.62rem] uppercase tracking-[0.22em] text-gold sm:text-[0.7rem] sm:tracking-[0.4em]"
        />
        <Editable
          path="site.name"
          as="h1"
          className="fade-up font-display mt-4 text-[28vw] leading-none text-cream sm:mt-6 sm:text-8xl md:text-9xl"
        />
        <div className="gold-rule fade-up mx-auto my-6 w-32 sm:my-8 sm:w-48" />
        <p className="fade-up-delay max-w-xl px-1 text-base text-muted sm:text-lg md:text-xl">
          <Editable path="site.tagline" as="span" />{" "}
          <Editable path="site.homeLede" as="span" multiline />
        </p>
        <nav
          aria-label="Chapters"
          className="fade-up-delay mx-auto mt-10 grid w-full max-w-3xl grid-cols-2 gap-2 sm:mt-14 sm:gap-3 md:grid-cols-4"
        >
          {content.chapters.map((chapter, index) =>
            chapter.hidden ? null : (
              <Link key={chapter.href} href={chapter.href} className="btn-ghost w-full">
                <Editable path={`chapters.${index}.label`} as="span" />
              </Link>
            ),
          )}
        </nav>
      </main>
      <SiteBlocks blocks={content.site.blocks ?? []} />
      {studio?.isStudio ? <HomeBlockEditor /> : null}
    </>
  );
}
