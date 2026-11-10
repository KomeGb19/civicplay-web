import type { ReactNode } from "react";

export const cardClass =
  "rounded-2xl border border-cream/10 bg-navy-deep/70 p-5 backdrop-blur-md sm:p-6";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
};

export function Section({ id, eyebrow, title, intro, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mt-20 scroll-mt-24"
    >
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-green">
        {eyebrow}
      </p>
      <h2
        id={`${id}-title`}
        className="mt-2 font-display text-3xl font-bold text-balance sm:text-4xl"
      >
        {title}
      </h2>
      {intro ? (
        <p className="mt-3 max-w-2xl text-cream/85">{intro}</p>
      ) : null}
      <div className="mt-8">{children}</div>
    </section>
  );
}
