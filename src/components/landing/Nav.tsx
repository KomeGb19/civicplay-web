"use client";

import { LINKS } from "@/lib/chapters";
import Image from "next/image";
import { useEffect, useState } from "react";

type NavProps = {
  progress: number;
  onOpenMenu: () => void;
};

export function Nav({ progress, onOpenMenu }: NavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setScrolled(progress > 0.02);
  }, [progress]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 md:px-8">
      <a
        href="/"
        className="pointer-events-auto flex items-center gap-2.5 transition-opacity hover:opacity-90"
        aria-label="Civic Play home"
      >
        <Image src="/props/civicplaywhite.png" alt="Civic Play logo" width={40} height={40} className="w-10 h-10"/>
      </a>

      <div className="pointer-events-auto flex items-center gap-3">
        <a
          href={LINKS.play}
          className="rounded-full bg-[var(--color-navy-deep)] px-5 py-2.5 font-[family-name:var(--font-cal)] text-sm font-bold uppercase tracking-wide text-[var(--color-cream)] shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-2 ring-[var(--color-green)]/40 transition hover:bg-[var(--color-green)] hover:text-[var(--color-navy-deep)]"
        >
          Play
        </a>
        {/* <a
          href="/about"
          className="rounded-full bg-[var(--color-navy-deep)] px-5 py-2.5 font-[family-name:var(--font-cal)] text-sm font-bold uppercase tracking-wide text-[var(--color-cream)] shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-2 ring-[var(--color-green)]/40 transition hover:bg-[var(--color-green)] hover:text-[var(--color-navy-deep)]"
        >
          About Us
        </a> */}
        <button
          type="button"
          onClick={onOpenMenu}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[var(--color-cream)] backdrop-blur-md transition hover:bg-white/20"
          aria-label="Open menu"
        >
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 rounded bg-current" />
            <span className="block h-0.5 w-5 rounded bg-current" />
          </span>
        </button>
      </div>
    </header>
  );
}
