import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type StepperStep = { id: string; title: string };

/**
 * Small, dependency-free stepper in the shadcn/ui style.
 * `current` is the zero-based index of the active step.
 */
export function Stepper({
  steps,
  current,
  className,
}: {
  steps: readonly StepperStep[];
  current: number;
  className?: string;
}) {
  return (
    <ol
      aria-label="Pledge progress"
      className={cn("flex w-full items-center gap-2", className)}
    >
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        const last = i === steps.length - 1;

        return (
          <li
            key={step.id}
            aria-current={active ? "step" : undefined}
            className={cn("flex items-center gap-2", last ? "" : "flex-1")}
          >
            <span
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-colors duration-300",
                done && "border-green bg-green text-navy-deep",
                active && "border-gold bg-gold/15 text-gold",
                !done && !active && "border-cream/20 text-cream-muted",
              )}
            >
              {done ? <Check className="size-4" aria-hidden /> : i + 1}
              <span className="sr-only">
                {done ? "Completed: " : active ? "Current: " : ""}
                step {i + 1} of {steps.length}, {step.title}
              </span>
            </span>
            <span
              aria-hidden
              className={cn(
                "hidden text-sm font-semibold sm:inline",
                active ? "text-cream" : "text-cream-muted",
              )}
            >
              {step.title}
            </span>
            {!last ? (
              <span
                aria-hidden
                className={cn(
                  "h-0.5 flex-1 rounded-full transition-colors duration-500",
                  done ? "bg-green" : "bg-cream/15",
                )}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
