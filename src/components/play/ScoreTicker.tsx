"use client";

import NumberFlow from "@number-flow/react";

export function ScoreTicker({
  value,
  label = "Score",
}: {
  value: number;
  label?: string;
}) {
  return (
    <div className="flex flex-col items-end">
      <span className="text-[10px] uppercase tracking-[0.2em] text-cream-muted">
        {label}
      </span>
      <NumberFlow
        value={value}
        className="font-display text-3xl font-bold text-gold tabular-nums"
      />
    </div>
  );
}
