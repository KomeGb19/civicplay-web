"use client";

import { useState, type ReactNode } from "react";
import { Nav } from "@/components/landing/Nav";
import { MenuOverlay } from "@/components/landing/MenuOverlay";

export function PledgeShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Nav progress={0} onOpenMenu={() => setMenuOpen(true)} />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="relative min-h-dvh overflow-hidden bg-navy text-cream">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(46,229,157,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(245,197,66,0.12),_transparent_45%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(247,241,228,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(247,241,228,0.5)_1px,transparent_1px)] [background-size:48px_48px]"
        />

        <main className="relative z-10 mx-auto w-full max-w-2xl px-4 pb-20 pt-28 sm:px-6">
          {children}
        </main>

        <footer className="relative z-10 px-4 pb-10 text-center text-xs text-cream-muted sm:px-6">
          <p>
            Civic Play is nonpartisan. This pledge is a personal promise, not a
            legal oath, and it doesn’t endorse any candidate or party.
          </p>
          <p className="mt-2">© {new Date().getFullYear()} Roundcheck · Civic Play</p>
        </footer>
      </div>
    </>
  );
}
