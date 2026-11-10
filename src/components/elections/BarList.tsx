import { cn } from "@/lib/utils";

type Bar = { label: string; value: number; display: string };

export function BarList({
  bars,
  max,
  tone = "green",
}: {
  bars: readonly Bar[];
  max: number;
  tone?: "green" | "gold";
}) {
  return (
    <ul className="space-y-3">
      {bars.map((bar) => (
        <li key={bar.label}>
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <span className="text-cream/90">{bar.label}</span>
            <span className="font-display font-bold tabular-nums text-cream">
              {bar.display}
            </span>
          </div>
          <div
            className="mt-1 h-2.5 overflow-hidden rounded-full bg-cream/10"
            aria-hidden
          >
            <div
              className={cn(
                "h-full rounded-full",
                tone === "gold"
                  ? "bg-gradient-to-r from-gold to-gold-deep"
                  : "bg-gradient-to-r from-green to-gold",
              )}
              style={{ width: `${Math.max(2, (bar.value / max) * 100)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
