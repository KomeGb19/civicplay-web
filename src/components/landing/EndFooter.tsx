"use client";

import { LINKS } from "@/lib/chapters";
import Image from "next/image";

type EndFooterProps = {
  visible: boolean;
};

export function EndFooter({ visible }: EndFooterProps) {
  return (
    <footer
      id="donate"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-5 pb-6 pt-10 md:px-8"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? 0 : 40}px)`,
        transition: "opacity 0.35s ease, transform 0.35s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div className="mx-auto grid max-w-5xl gap-6 rounded-3xl bg-[var(--color-navy-deep)]/80 p-6 ring-1 ring-white/10 backdrop-blur-md md:grid-cols-[1.2fr_1fr_1fr] md:p-8">
        <div>
          <Image
            src="/props/civicplaywhite.png"
            alt="Civic Play logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <p className="mt-2 max-w-sm text-sm text-[var(--color-cream-muted)]">
            Built by Roundcheck — A youth-led factchecking organization for truth,
            accountability, and media literacy across Nigeria.
          </p>
          <div className="mt-4 flex gap-4 text-sm font-semibold text-[var(--color-green)]">
            <a
              href={LINKS.twitter}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              X
            </a>
            <a
              href={LINKS.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              Instagram
            </a>
            <a
              href={LINKS.tiktok}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              TikTok
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-gold)]">
            Contact
          </p>
          <a
            href={LINKS.contactMailto}
            className="mt-2 block text-sm text-[var(--color-cream)] hover:text-[var(--color-green)]"
          >
            contact@civicplay.ng
          </a>
          <a
            href={LINKS.phone1}
            className="mt-1 block text-sm text-[var(--color-cream-muted)]"
          >
            09130497799
          </a>
          <a
            href={LINKS.phone2}
            className="block text-sm text-[var(--color-cream-muted)]"
          >
            08160379312
          </a>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-gold)]">
            Donate
          </p>
          <p className="mt-2 text-sm text-[var(--color-cream)]">
            {LINKS.donate.bank} · {LINKS.donate.accountNumber}
          </p>
          <p className="text-sm text-[var(--color-cream-muted)]">
            {LINKS.donate.accountName}
          </p>
          <p className="mt-4 text-xs text-[var(--color-cream-muted)]">
            © {new Date().getFullYear()} Roundcheck · Civic Play
          </p>
        </div>
      </div>
    </footer>
  );
}
