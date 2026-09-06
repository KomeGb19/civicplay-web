"use client";

import { CHAPTERS, LINKS, type Chapter } from "@/lib/chapters";
import { useMemo, useState, useEffect } from "react";
import TextLoop from "@/components/TextLoop";
import DepthText from "@/components/DepthText";

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
  const peak =
    1 - Math.min(1, Math.abs(progress - mid) / ((end - start) * 0.55));
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

  const [fontSize, setFontSize] = useState(46);
  const [ribbonWidth, setRibbonWidth] = useState(86);
  const [shape, setShape] = useState("circle");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newFontSize = 46;
      let newRibbonWidth = 86;
      let newShape = "circle";
      if (width < 640) {
        newFontSize = Math.round(46 * 1.4); // 64.4 -> 64
        newRibbonWidth = Math.round(86 * 1.4); // 120.4 -> 120
        newShape = "wave";
      } else if (width < 1024) {
        newFontSize = Math.round(46 * 1.2); // 55.2 -> 55
        newRibbonWidth = Math.round(86 * 1.2); // 103.2 -> 103
        newShape = "wave";
      }
      setFontSize(newFontSize);
      setRibbonWidth(newRibbonWidth);
      setShape(newShape);
    };

    // Set initial size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-5 md:px-10">
      {layers.map(({ chapter, opacity }) => {
        const isCta = chapter.id === "cta";
        return (
          <div
            key={chapter.id}
            className="absolute inset-x-5 top-[30%] mx-auto max-w-5xl text-center md:inset-x-10 lg:top-[16%]"
            style={{
              opacity,
              transform: `translateY(${(1 - opacity) * 28}px) scale(${0.96 + opacity * 0.04})`,
              visibility: opacity < 0.02 ? "hidden" : "visible",
              pointerEvents: isCta && opacity > 0.4 ? "auto" : "none",
            }}
            aria-hidden={chapter.id !== active.id}
          >
            {/* Determine if we need to apply DepthText effect (problem chapter only) */}
            {/* For problem chapter, split headline to apply DepthText to "SPECTATORS" line */}
            {chapter.id === "problem" ? (
              <>
                {chapter.headline.split("\n").slice(0, -1).join("\n") && (
                  <div
                    className="font-[family-name:var(--font-cal)] text-[clamp(3rem,9vw,7.5rem)] leading-[0.92] font-extrabold tracking-[-0.04em] text-[var(--color-cream)] whitespace-pre-line drop-shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
                    style={{ display: "block", marginBottom: 4 }}
                  >
                    {chapter.headline.split("\n").slice(0, -1).join("\n")}
                  </div>
                )}
                <DepthText
                  text={(chapter.headline.split("\n").pop() || "").replace(
                    ".",
                    "",
                  )} // Remove period for clean effect
                  // Match surrounding text styling
                  layers={34}
                  depth={2.4}
                  faceColor="var(--color-cream)"
                  depthColor="var(--color-gold)"
                  fontSize="clamp(3rem, 9vw, 7.5rem)"
                  fontWeight={900}
                  tilt={10} // Reduced tilt for subtlety // Reduced depth
                  smoothing={0.14} // Adjusted smoothing
                  perspective={900}
                  autoOrbit={true} // Disable auto-orbit for cleaner integration
                  pointerTracking={true} // Disable pointer tracking to avoid conflict with page scroll
                  className="w-full"
                  shadow
                />
              </>
            ) : (
              <h1 className="font-[family-name:var(--font-cal)] text-[clamp(3rem,9vw,7.5rem)] leading-[0.92] font-extrabold tracking-[-0.04em] text-[var(--color-cream)] whitespace-pre-line drop-shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
                {chapter.headline}
              </h1>
            )}
            {chapter.subline ? (
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--color-cream-muted)] md:mt-7 md:text-lg">
                {chapter.subline}
              </p>
            ) : null}

            {chapter.id === "hook" && (
              <div className="mt-6 w-full relative">
                <TextLoop
                  className="absolute w-[500px] -left-10 -top-20 md:top-0 md:left-3 md:max-w-[1000]"
                  style={{
                    width: 1000,
                  }}
                  text="Play ✨ Learn ✨Fun"
                  shape={shape}
                  speed={90}
                  direction="forward"
                  separator="✨"
                  curviness={90}
                  fontSize={fontSize}
                  fontWeight={800}
                  letterSpacing={2}
                  uppercase
                  color="#ffffff"
                  ribbon
                  ribbonColor="#00834E"
                  ribbonWidth={ribbonWidth}
                  pauseOnHover
                />
              </div>
            )}

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
