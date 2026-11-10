import { cn } from "@/lib/utils";
import type { Ticket } from "@/lib/elections";

export function TicketCard({ ticket }: { ticket: Ticket }) {
  const inCourt = ticket.status === "in-court";

  return (
    <li
      className={cn(
        "flex flex-col rounded-2xl border bg-navy-deep/70 p-5 backdrop-blur-md",
        inCourt ? "border-coral/40" : "border-cream/10",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-lg border border-gold/40 bg-gold/10 px-2.5 py-1 font-display text-sm font-bold text-gold">
          {ticket.party}
        </span>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-semibold",
            inCourt
              ? "bg-coral/15 text-coral"
              : "bg-green/15 text-green",
          )}
        >
          {inCourt ? "Under court challenge" : "On INEC’s list"}
        </span>
      </div>

      <h3 className="mt-4 font-display text-xl font-bold leading-snug">
        {ticket.president}
      </h3>
      <p className="mt-1 text-sm text-cream-muted">{ticket.partyName}</p>

      <p className="mt-4 text-xs text-cream-muted">Running mate</p>
      <p className="text-sm font-medium text-cream/90">{ticket.runningMate}</p>

      {ticket.note ? (
        <p className="mt-4 rounded-xl border border-coral/30 bg-coral/10 px-3 py-2 text-xs leading-relaxed text-cream/90">
          {ticket.note}
        </p>
      ) : null}
    </li>
  );
}
