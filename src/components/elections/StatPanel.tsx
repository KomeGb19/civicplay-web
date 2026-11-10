import { BarList } from "@/components/elections/BarList";
import { cardClass } from "@/components/elections/Section";
import type { Stat } from "@/data/elections";

export function StatPanel({ stat }: { stat: Stat }) {
  return (
    <figure className={cardClass}>
      <figcaption>
        <h3 className="font-display text-xl font-bold">{stat.title}</h3>
        <p className="mt-1 text-xs text-cream-muted">
          {stat.unit}, data as of {stat.asOf}
        </p>
      </figcaption>

      <div className="mt-5">
        <BarList bars={stat.bars} max={stat.max} tone={stat.tone} />
      </div>

      <p className="mt-5 text-sm leading-relaxed text-cream/90">
        {stat.takeaway}
      </p>
      <p className="mt-3 rounded-xl border border-gold/30 bg-gold/10 px-3 py-2 text-xs leading-relaxed text-cream/85">
        <span className="font-bold text-gold">Read with care: </span>
        {stat.caveat}
      </p>
      <p className="mt-4 text-xs text-cream-muted">
        Sources:{" "}
        {stat.sources.map((s, i) => (
          <span key={s.url}>
            {i > 0 ? ", " : ""}
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-green"
            >
              {s.label}
            </a>
          </span>
        ))}
      </p>
    </figure>
  );
}
