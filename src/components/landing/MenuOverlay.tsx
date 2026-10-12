"use client";

import { LINKS } from "@/lib/chapters";
import Image from "next/image";
import { useState } from "react";
import { BecomePartnerModal } from "./BecomePartnerModal";
import { DonateCardModal } from "./DonateCardModal";
import { Link, Link2 } from "lucide-react";

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const [showPartnerModal, setShowPartnerModal] = useState(false)
  const [showDonateModal, setShowDonateModal] = useState(false)

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[60] flex flex-col bg-[var(--color-navy-deep)]/95 px-8 py-8 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="flex items-center justify-between">
            <a href="/">
              <Image
                src="/props/civicplaywhite.png"
                alt="Civic Play logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-[var(--color-cream)]"
            >
              Close
            </button>
          </div>

          <nav className="mt-16 flex flex-col gap-6 font-[family-name:var(--font-cal)] text-4xl font-extrabold text-[var(--color-cream)] md:text-6xl">
            <a
              href={LINKS.play}
              className="transition hover:rotate-1 hover:scale-101  hover:text-[var(--color-green)]"
              onClick={onClose}
            >
              Play the game
            </a>
            <a
              href="/about"
              className="transition hover:-rotate-1 hover:scale-101 hover:text-[var(--color-green)]"
              onClick={onClose}
            >
              About Us
            </a>
            <a
              href={LINKS.contactMailto}
              className="transition hover:-rotate-1 hover:scale-101 hover:text-[var(--color-green)]"
              onClick={onClose}
            >
              Contact us
            </a>
            <button
              type="button"
              onClick={() => setShowPartnerModal(true)}
              className="transition hover:rotate-1 hover:scale-101 hover:text-[var(--color-green)] flex items-center gap-2"
            >
              Become a partner
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                setShowDonateModal(true);
              }}
              className="transition hover:-rotate-1 hover:scale-101 text-[var(--color-gold)] hover:text-[var(--color-gold)] flex items-center gap-2"
            >
              Donate
            </button>
          </nav>

          <div className="mt-auto space-y-2 text-sm text-[var(--color-cream-muted)]">
            <p>contact@civicplay.ng</p>
            <p>09130497799 · 08160379312</p>
            <p className="pt-4 text-xs">Built by Roundcheck</p>
          </div>
        </div>
      )}

      {/* Become Partner Modal */}
      <BecomePartnerModal
        open={showPartnerModal}
        onClose={() => setShowPartnerModal(false)}
      />

      {/* Donate Card Modal */}
      <DonateCardModal
        open={showDonateModal}
        onClose={() => setShowDonateModal(false)}
      />
    </>
  );
}
