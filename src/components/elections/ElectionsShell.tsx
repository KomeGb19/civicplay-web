"use client";

import { useState, type ReactNode } from "react";
import { Nav } from "@/components/landing/Nav";
import { MenuOverlay } from "@/components/landing/MenuOverlay";
import { ELECTION_META } from "@/lib/elections";
import { LINKS } from "@/lib/chapters";

export function ElectionsShell({ children }: { children: ReactNode }) {
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

        <main className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-20 pt-28 sm:px-6">
          {children}
        </main>

        <footer className="relative z-10 border-t border-cream/10 bg-navy-deep/80 px-4 py-10 backdrop-blur-md sm:px-6">
          <div className="mx-auto max-w-5xl space-y-3 text-sm text-cream-muted">
            <p>
              Civic Play is nonpartisan. We don’t endorse any candidate or
              party, and we show the same details for every ticket.
            </p>
            <p>
              Last checked {ELECTION_META.lastUpdated}. Something out of date?
              Tell us at{" "}
              <a
                href={LINKS.contactMailto}
                className="text-green underline underline-offset-2"
              >
                contact@civicplay.ng
              </a>
              .
            </p>
            <p className="text-xs">
              © {new Date().getFullYear()} Roundcheck · Civic Play
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
