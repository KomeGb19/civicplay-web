"use client";

import { CHAPTERS, LINKS, type Chapter } from "@/lib/chapters";
import { useMemo } from "react";

type ChapterCopyProps = {
  active: Chapter;
  progress: number;
};

function opacityForChapter(chapter: Chapter, progress: number) {
  const [start, end] = chapter.range;
  const mid = (start + end) / 2;
  const fadeIn = Math.min(1, Math.max(0, (progress - start) / 0.04));
  const fadeOut = Math.min(1, Math.max(0, (end - progress) / 0.04));
  // Peak at mid of chapter
  const peak = 1 - Math.min(1, Math.abs(progress - mid) / ((end - start) * 0.55));
  return Math.min(fadeIn, fadeOut, Math.max(peak, fadeIn * fadeOut));
}

export function ChapterCopy({ active, progress }: ChapterCopyProps) {
  const layers = useMemo(
    () =>
      CHAPTERS.map((chapter) => ({
        chapter,
        opacity: opacityForChapter(chapter, progress),
      })),
    [progress],
  );

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-5 md:px-10">
      {layers.map(({ chapter, opacity }) => {
        const isCta = chapter.id === "cta";
        return (
          <div
            key={chapter.id}
            className="absolute inset-x-5 top-[18%] mx-auto max-w-5xl text-center md:inset-x-10 md:top-[16%]"
            style={{
              opacity,
              transform: `translateY(${(1 - opacity) * 28}px) scale(${0.96 + opacity * 0.04})`,
              visibility: opacity < 0.02 ? "hidden" : "visible",
              pointerEvents: isCta && opacity > 0.4 ? "auto" : "none",
            }}
            aria-hidden={chapter.id !== active.id}
          >
            <h1 className="font-[family-name:var(--font-cal)] text-[clamp(2.4rem,9vw,7.5rem)] leading-[0.92] font-extrabold tracking-[-0.04em] text-[var(--color-cream)] whitespace-pre-line drop-shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
              {chapter.headline}
            </h1>
            {chapter.subline ? (
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--color-cream-muted)] md:mt-7 md:text-lg">
                {chapter.subline}
              </p>
            ) : null}

            {isCta ? (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={LINKS.play}
                  className="rounded-full bg-[var(--color-green)] px-7 py-3.5 font-[family-name:var(--font-syne)] text-sm font-extrabold uppercase tracking-wide text-[var(--color-navy-deep)] shadow-[0_16px_40px_rgba(46,229,157,0.35)] transition hover:brightness-110"
                >
                  Play the game
                </a>
                <a
                  href={LINKS.contactMailto}
                  className="rounded-full bg-white/10 px-7 py-3.5 font-[family-name:var(--font-syne)] text-sm font-bold uppercase tracking-wide text-[var(--color-cream)] ring-1 ring-white/25 backdrop-blur transition hover:bg-white/20"
                >
                  Partner with us
                </a>
                <a
                  href={LINKS.contactMailto}
                  className="rounded-full px-5 py-3.5 text-sm font-semibold text-[var(--color-cream-muted)] underline-offset-4 hover:text-[var(--color-cream)] hover:underline"
                >
                  Contact
                </a>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
