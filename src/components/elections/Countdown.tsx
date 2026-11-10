"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

type Part = { label: string; value: number | null };

export function Countdown({ targetISO }: { targetISO: string }) {
  const target = new Date(targetISO).getTime();
  // null until mounted, so server and client render the same markup
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const remaining = now === null ? null : Math.max(0, target - now);

  if (remaining === 0) {
    return (
      <p className="rounded-2xl border border-gold/30 bg-navy-deep/70 px-6 py-4 font-display text-xl font-bold text-gold">
        Voting has opened. Go to your polling unit with your PVC.
      </p>
    );
  }

  const parts: Part[] =
    remaining === null
      ? [
          { label: "Days", value: null },
          { label: "Hours", value: null },
          { label: "Minutes", value: null },
          { label: "Seconds", value: null },
        ]
      : [
          { label: "Days", value: Math.floor(remaining / 86_400_000) },
          { label: "Hours", value: Math.floor(remaining / 3_600_000) % 24 },
          { label: "Minutes", value: Math.floor(remaining / 60_000) % 60 },
          { label: "Seconds", value: Math.floor(remaining / 1000) % 60 },
        ];

  return (
    <div role="timer" aria-live="off" className="flex justify-center gap-2 sm:gap-3">
      {parts.map((p) => (
        <div
          key={p.label}
          className="min-w-[4.25rem] rounded-2xl border border-gold/30 bg-navy-deep/70 px-3 py-3 text-center sm:min-w-[6rem] sm:px-4"
        >
          <p className="font-display text-3xl font-bold tabular-nums text-gold sm:text-5xl">
            {p.value === null ? "--" : pad(p.value)}
          </p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream-muted">
            {p.label}
          </p>
        </div>
      ))}
    </div>
  );
}
