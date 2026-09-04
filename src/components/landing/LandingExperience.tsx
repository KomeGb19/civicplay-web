"use client";

import { ChapterCopy } from "@/components/landing/ChapterCopy";
import { EndFooter } from "@/components/landing/EndFooter";
import { MenuOverlay } from "@/components/landing/MenuOverlay";
import { Nav } from "@/components/landing/Nav";
import { ParallaxLayer } from "@/components/landing/ParallaxLayer";
import { CHAPTERS, chapterAtProgress } from "@/lib/chapters";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_HEIGHT_VH = 520;

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function LandingExperience() {
  const stageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const reducedMotion = prefersReducedMotion();
    setReduced(reducedMotion);

    if (reducedMotion) {
      setProgress(0);
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: "#scroll-track",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.35,
        onUpdate: (self) => {
          setProgress(self.progress);
          const chapter = chapterAtProgress(self.progress);
          if (bgRef.current) {
            bgRef.current.style.backgroundColor = chapter.bg;
          }
        },
      });

      // Background color tween across chapter waypoints
      const colors = CHAPTERS.map((c) => c.bg);
      const positions = CHAPTERS.map((c) => c.range[0]);
      positions.push(1);
      colors.push(CHAPTERS[CHAPTERS.length - 1].bg);

      if (bgRef.current) {
        gsap.to(bgRef.current, {
          backgroundColor: colors[colors.length - 1],
          ease: "none",
          scrollTrigger: {
            trigger: "#scroll-track",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
              // Interpolate between chapter colors by progress
              const p = self.progress;
              let i = 0;
              for (; i < CHAPTERS.length - 1; i++) {
                if (p < CHAPTERS[i + 1].range[0]) break;
              }
              const a = CHAPTERS[i];
              const b = CHAPTERS[Math.min(i + 1, CHAPTERS.length - 1)];
              const local =
                b.range[0] === a.range[0]
                  ? 1
                  : (p - a.range[0]) /
                    Math.max(0.0001, b.range[0] - a.range[0]);
              if (bgRef.current) {
                bgRef.current.style.backgroundColor = gsap.utils.interpolate(
                  a.bg,
                  b.bg,
                  Math.min(1, Math.max(0, local)),
                ) as string;
              }
            },
          },
        });
      }

      return () => {
        st.kill();
      };
    }, stageRef);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
      gsap.ticker.remove(ticker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const active = chapterAtProgress(progress);
  const showFooter = progress > 0.95 || reduced;

  if (reduced) {
    return (
      <div className="min-h-screen bg-[var(--color-navy)] text-[var(--color-cream)]">
        <Nav progress={0} onOpenMenu={() => setMenuOpen(true)} />
        <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
        <main className="mx-auto max-w-3xl px-5 pb-24 pt-28">
          <p className="font-[family-name:var(--font-syne)] text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-green)]">
            Civic Play
          </p>
          {CHAPTERS.map((chapter) => (
            <section key={chapter.id} className="mt-14">
              <h2 className="font-[family-name:var(--font-syne)] text-3xl font-extrabold whitespace-pre-line md:text-5xl">
                {chapter.headline}
              </h2>
              {chapter.subline ? (
                <p className="mt-4 text-[var(--color-cream-muted)]">
                  {chapter.subline}
                </p>
              ) : null}
            </section>
          ))}
          <div className="mt-16 flex flex-wrap gap-3">
            <a
              href="https://civicplay.ng/"
              className="rounded-full bg-[var(--color-green)] px-6 py-3 font-bold text-[var(--color-navy-deep)]"
            >
              Play the game
            </a>
            <a
              href="mailto:contact@civicplay.ng"
              className="rounded-full bg-white/10 px-6 py-3 font-semibold"
            >
              Contact
            </a>
          </div>
        </main>
        <div className="relative min-h-[280px]">
          <EndFooter visible />
        </div>
      </div>
    );
  }

  return (
    <div id="top" ref={stageRef}>
      {/* Tall scroll track drives progress; stage stays fixed */}
      <div
        id="scroll-track"
        style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
        aria-hidden
      />

      <div className="fixed inset-0 overflow-hidden">
        <div
          ref={bgRef}
          className="absolute inset-0 transition-[background-color] duration-300"
          style={{ backgroundColor: CHAPTERS[0].bg }}
        />

        {/* Soft atmospheric blobs */}
        <div
          className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[var(--color-green)]/15 blur-3xl"
          style={{
            transform: `translate3d(0, ${progress * -120}px, 0)`,
          }}
        />
        <div
          className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-[var(--color-gold)]/10 blur-3xl"
          style={{
            transform: `translate3d(0, ${progress * 80}px, 0)`,
          }}
        />

        <ParallaxLayer progress={progress} />
        <ChapterCopy active={active} progress={progress} />
        <EndFooter visible={showFooter} />

        {/* Scroll hint */}
        <div
          className="pointer-events-none absolute bottom-8 left-1/2 z-40 -translate-x-1/2 text-center"
          style={{ opacity: Math.max(0, 1 - progress * 8) }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--color-cream-muted)]">
            Scroll to explore
          </p>
          <div className="mx-auto mt-2 h-8 w-px bg-gradient-to-b from-[var(--color-cream-muted)] to-transparent" />
        </div>
      </div>

      <Nav progress={progress} onOpenMenu={() => setMenuOpen(true)} />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Screen-reader chapter list */}
      <div className="sr-only">
        {CHAPTERS.map((c) => (
          <section key={c.id}>
            <h2>{c.headline.replace(/\n/g, " ")}</h2>
            <p>{c.subline}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
