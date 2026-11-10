import type { Metadata } from "next";
import Link from "next/link";
import { ElectionsShell } from "@/components/elections/ElectionsShell";
import { Countdown } from "@/components/elections/Countdown";
import { Section, cardClass } from "@/components/elections/Section";
import { StatPanel } from "@/components/elections/StatPanel";
import { TicketCard } from "@/components/elections/TicketCard";
import { BarList } from "@/components/elections/BarList";
import {
  CRITIC_CLAIMS,
  ELECTION_META,
  GOVERNMENT_CLAIMS,
  INEC_LINKS,
  KEY_DATES,
  POVERTY_ESTIMATES,
  PRIMARY_SOURCES,
  STATS,
  TICKETS,
  VOTER_FACTS,
} from "@/lib/elections";

export const metadata: Metadata = {
  title: "2027 Nigerian Elections: Dates, Candidates and Facts | Civic Play",
  description:
    "Election dates, the INEC candidate list, how to get ready to vote, and a sourced look at the last three years. Nonpartisan, from Civic Play.",
  openGraph: {
    title: "2027 Nigerian Elections: know the facts before you vote",
    description:
      "Dates, candidates, voter readiness and sourced data. No endorsements.",
    type: "article",
    locale: "en_NG",
  },
};

const CHIPS = [
  { href: "#dates", label: "Key dates" },
  { href: "#ready", label: "Get ready" },
  { href: "#candidates", label: "Candidates" },
  { href: "#how", label: "How it works" },
  { href: "#record", label: "Three years in numbers" },
  { href: "#misinformation", label: "Spot fake news" },
  { href: "#sources", label: "Sources" },
];

function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`underline underline-offset-2 hover:text-green ${className}`}
    >
      {children}
    </a>
  );
}

function ClaimList({
  title,
  tone,
  items,
}: {
  title: string;
  tone: "green" | "coral";
  items: readonly { text: string; url: string; source: string }[];
}) {
  return (
    <div
      className={`${cardClass} ${tone === "green" ? "border-green/30" : "border-coral/30"}`}
    >
      <h3
        className={`font-display text-xl font-bold ${tone === "green" ? "text-green" : "text-coral"}`}
      >
        {title}
      </h3>
      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li key={item.text} className="text-sm leading-relaxed text-cream/90">
            {item.text}{" "}
            <ExternalLink
              href={item.url}
              className="whitespace-nowrap text-xs text-cream-muted"
            >
              {item.source}
            </ExternalLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ElectionsPage() {
  return (
    <ElectionsShell>
      <header className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-green">
          Nigeria · 2027 general elections
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-balance sm:text-6xl">
          Know the facts before you vote
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-cream/90">
          Dates, candidates, how to get ready, and a sourced look at the last
          three years. No endorsements, just facts you can check.
        </p>

        <div className="mt-8">
          <Countdown targetISO={ELECTION_META.voteStartISO} />
        </div>
        <p className="mt-3 text-sm text-cream-muted">
          until voting opens on Saturday, 16 January 2027 at 8:30 AM
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={INEC_LINKS.voterStatus}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-green px-6 py-3 font-display font-bold text-navy-deep hover:bg-green-bright"
          >
            Check your voter status
          </a>
          <Link
            href="/play"
            className="rounded-xl border border-gold/40 bg-gold/10 px-6 py-3 font-semibold text-gold hover:bg-gold/20"
          >
            Test yourself in the civic quiz
          </Link>
        </div>

        <p
          role="note"
          className="mx-auto mt-10 max-w-2xl rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-left text-sm leading-relaxed text-cream/90"
        >
          <span className="font-bold text-gold">This is moving fast. </span>
          Court cases are still affecting the timetable and at least one party’s
          candidate list. We last checked on {ELECTION_META.lastUpdated}.
          Confirm anything important with INEC.
        </p>

        <nav
          aria-label="On this page"
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {CHIPS.map((chip) => (
            <a
              key={chip.href}
              href={chip.href}
              className="rounded-full border border-cream/20 px-4 py-2 text-sm font-medium text-cream/85 transition hover:bg-cream/10"
            >
              {chip.label}
            </a>
          ))}
        </nav>
      </header>

      <Section
        id="dates"
        eyebrow="Key dates"
        title="When you vote"
        intro="These dates come from INEC’s official election calendar."
      >
        <dl className="grid gap-4 md:grid-cols-3">
          {KEY_DATES.map((d) => (
            <div key={d.id} className={cardClass}>
              <dt className="text-sm text-cream-muted">{d.label}</dt>
              <dd className="mt-2 font-display text-2xl font-bold text-gold">
                {d.value}
              </dd>
              <dd className="mt-3 text-sm leading-relaxed text-cream/85">
                {d.detail}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-cream-muted">
          Several court cases challenging parts of INEC’s timetable were pending
          when we last checked, so confirm dates on{" "}
          <ExternalLink href={INEC_LINKS.calendar}>
            INEC’s election calendar
          </ExternalLink>
          .
        </p>
      </Section>

      <Section
        id="ready"
        eyebrow="Get ready"
        title="Four things to do before election day"
      >
        <ol className="grid gap-4 md:grid-cols-2">
          {[
            {
              title: "Check you’re registered",
              body: "Use INEC’s voter portal to confirm your registration and see the status of your card.",
              href: INEC_LINKS.voterStatus,
              cta: "Open the voter portal",
            },
            {
              title: "Collect your PVC",
              body: "INEC began handing out new cards at its local government offices from 9 October 2026. No card means no vote, so don’t wait until the last week.",
              href: INEC_LINKS.voterStatus,
              cta: "Find your collection point",
            },
            {
              title: "Find your polling unit",
              body: "You vote at the unit where you registered. Look it up now so you’re not searching for it on the day.",
              href: INEC_LINKS.pollingUnit,
              cta: "Find your polling unit",
            },
            {
              title: "On the day",
              body: "Bring your PVC. It is checked with the BVAS machine, and accreditation and voting run together from 8:30 AM to 2:30 PM.",
              href: INEC_LINKS.education,
              cta: "Read INEC’s voter education",
            },
          ].map((step, i) => (
            <li key={step.title} className={cardClass}>
              <div className="flex items-start gap-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-green/15 font-display font-bold text-green">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/85">
                    {step.body}
                  </p>
                  <ExternalLink
                    href={step.href}
                    className="mt-3 inline-block text-sm font-semibold text-green"
                  >
                    {step.cta}
                  </ExternalLink>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className={`${cardClass} mt-6`}>
          <h3 className="font-display text-xl font-bold">The voter register</h3>
          <p className="mt-2 text-sm text-cream/85">
            INEC said the register stands at{" "}
            <span className="font-bold text-gold">
              {VOTER_FACTS.register.toLowerCase()} voters
            </span>{" "}
            ({VOTER_FACTS.registerAsOf}). New registrations by phase, in
            millions:
          </p>
          <div className="mt-5 max-w-xl">
            <BarList
              bars={VOTER_FACTS.registrationPhases}
              max={VOTER_FACTS.max}
              tone="green"
            />
          </div>
          <p className="mt-5 rounded-xl border border-gold/30 bg-gold/10 px-3 py-2 text-xs leading-relaxed text-cream/85">
            <span className="font-bold text-gold">Read with care: </span>
            {VOTER_FACTS.note}
          </p>
          <p className="mt-4 text-xs text-cream-muted">
            Sources:{" "}
            {VOTER_FACTS.sources.map((s, i) => (
              <span key={s.url}>
                {i > 0 ? ", " : ""}
                <ExternalLink href={s.url}>{s.label}</ExternalLink>
              </span>
            ))}
          </p>
        </div>
      </Section>

      <Section
        id="candidates"
        eyebrow="Candidates and parties"
        title="The 18 presidential tickets"
        intro="Listed alphabetically by party. Every ticket gets the same details, and the order says nothing about who is ahead."
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TICKETS.map((t) => (
            <TicketCard key={t.party} ticket={t} />
          ))}
        </ul>
        <p className="mt-5 text-sm leading-relaxed text-cream-muted">
          Names and spellings follow INEC’s final list of candidates, published
          on 12 September 2026, as reported by news outlets. Outlets sometimes
          spell names differently, so check the official list on{" "}
          <ExternalLink href={INEC_LINKS.parties}>
            INEC’s Candidates and Parties page
          </ExternalLink>
          . A ticket can change if a court or INEC rules on a dispute.
        </p>
      </Section>

      <Section
        id="how"
        eyebrow="How it works"
        title="What you’re voting for, and how a winner is decided"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className={cardClass}>
            <h3 className="font-display text-lg font-bold">
              Who wins the presidency
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-cream/85">
              To win in the first round, a candidate needs the most votes and at
              least one-quarter of the votes in each of at least two-thirds of
              the 36 states and the FCT (Section 134 of the 1999 Constitution).
              If nobody does, there is a run-off.
            </p>
          </div>
          <div className={cardClass}>
            <h3 className="font-display text-lg font-bold">
              Two election days
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-cream/85">
              On 16 January you vote for the President, a Senator and a House of
              Representatives member. Governors and state assembly members are
              voted for on 6 February, in participating states.
            </p>
          </div>
          <div className={cardClass}>
            <h3 className="font-display text-lg font-bold">
              Where results come from
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-cream/85">
              Results are recorded at polling units, then collated, and INEC is
              the official source. Check them on{" "}
              <ExternalLink href={INEC_LINKS.results}>
                INEC’s results portal
              </ExternalLink>
              , not on a forwarded screenshot.
            </p>
          </div>
          <div className={cardClass}>
            <h3 className="font-display text-lg font-bold">
              If someone disputes a result
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-cream/85">
              Disputes are settled by election tribunals and courts, not on
              social media. Presidential petitions end at the Supreme Court.
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="record"
        eyebrow="Three years in numbers"
        title="The record since 29 May 2023"
        intro="The numbers first, then what each side says about them. The President is also a candidate, and so are some of his critics, so treat both sets of claims as political statements and check them against the data."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {STATS.map((s) => (
            <StatPanel key={s.id} stat={s} />
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className={cardClass}>
            <h3 className="font-display text-xl font-bold">
              How many Nigerians live in poverty?
            </h3>
            <p className="mt-2 text-sm text-cream/85">
              Estimates in circulation differ a lot.
            </p>
            <ul className="mt-4 space-y-3">
              {POVERTY_ESTIMATES.map((p) => (
                <li key={p.text} className="text-sm text-cream/90">
                  <span className="font-semibold text-gold">{p.text}</span>
                  <br />
                  <ExternalLink
                    href={p.url}
                    className="text-xs text-cream-muted"
                  >
                    {p.from}
                  </ExternalLink>
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-xl border border-gold/30 bg-gold/10 px-3 py-2 text-xs leading-relaxed text-cream/85">
              <span className="font-bold text-gold">Read with care: </span>
              These come from commentary, and the measures may differ, for
              example income-based and multidimensional poverty. We’re replacing
              them with primary figures from NBS and the World Bank.
            </p>
          </div>

          <div className={cardClass}>
            <h3 className="font-display text-xl font-bold">
              Security: the most contested part
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-cream/85">
              The government says security agencies have stepped up operations
              and that more communities and highways are safer. Opposition
              parties and civil society groups say killings and kidnappings have
              continued.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-cream/85">
              Counts of deaths and abductions differ between sources, so we’re
              working from the original{" "}
              <ExternalLink href="https://acleddata.com/">ACLED</ExternalLink>{" "}
              data before we publish a figure here.
            </p>
          </div>
        </div>

        <h3 className="mt-10 font-display text-2xl font-bold">
          What each side says
        </h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <ClaimList
            title="Government and supporters"
            tone="green"
            items={GOVERNMENT_CLAIMS}
          />
          <ClaimList
            title="Opposition and critics"
            tone="coral"
            items={CRITIC_CLAIMS}
          />
        </div>
        <p className="mt-5 text-sm text-cream-muted">
          Still to come, each with sources: unemployment, the exchange rate,
          electricity, public debt, and a primary-source security figure.
        </p>
      </Section>

      <Section
        id="misinformation"
        eyebrow="Spot fake news"
        title="Before you share an election post"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              title: "Official results come from INEC",
              body: "Compare any result sheet you see online with what INEC has published. A screenshot with no source is not a result.",
            },
            {
              title: "Check who said it and when",
              body: "Look for the original statement, a date and a named source. Old photos and videos often come back as “new”.",
            },
            {
              title: "Search for a second source",
              body: "If a shocking claim is only on one page or one WhatsApp group, wait. Real news is usually reported by several credible outlets.",
            },
            {
              title: "Be careful with round numbers and rankings",
              body: "Graphics with no source or method, or with exaggerated figures, are a common sign of propaganda.",
            },
          ].map((tip) => (
            <div key={tip.title} className={cardClass}>
              <h3 className="font-display text-lg font-bold">{tip.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/85">
                {tip.body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link
            href="/play"
            className="inline-block rounded-xl bg-green px-6 py-3 font-display font-bold text-navy-deep hover:bg-green-bright"
          >
            Play the civic quiz
          </Link>
        </div>
      </Section>

      <Section
        id="sources"
        eyebrow="Sources"
        title="Where this information comes from"
        intro="We link to the source next to each figure. Where we’ve used a news report, we’re replacing it with the primary source."
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {PRIMARY_SOURCES.map((s) => (
            <li key={s.url}>
              <ExternalLink
                href={s.url}
                className="block rounded-xl border border-cream/10 bg-navy-deep/70 px-4 py-3 text-sm font-medium text-cream/90"
              >
                {s.label}
              </ExternalLink>
            </li>
          ))}
        </ul>
      </Section>
    </ElectionsShell>
  );
}
