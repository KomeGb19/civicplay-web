"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, PenLine } from "lucide-react";
import { AnimatedSignature } from "@/components/pledge/AnimatedSignature";
import { AvatarStack } from "@/components/pledge/AvatarStack";
import { PledgeCard } from "@/components/pledge/PledgeCard";
import { Stepper } from "@/components/pledge/Stepper";
import {
  NIGERIAN_STATES,
  PLEDGE_STEPS,
  STEPPER_STEPS,
  STORAGE_KEY,
} from "@/lib/pledge";

type Phase = "welcome" | "steps" | "done";
type Signing = "idle" | "signing" | "signed";
type Saved = { name: string; state: string; signedAt: string };

const NAME_RE = /^[\p{L}][\p{L}\p{M}' .-]*$/u;

const primary =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-green px-7 py-3.5 font-display text-base font-bold text-navy-deep transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40";
const ghost =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-cream/25 px-5 py-3.5 text-sm font-semibold text-cream transition hover:bg-cream/10";

export function PledgeFlow({ pledgeCount }: { pledgeCount?: number }) {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const [signing, setSigning] = useState<Signing>("idle");
  const [saved, setSaved] = useState<Saved | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // Bring back a pledge already taken on this device
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<Saved>;
      if (parsed.name && parsed.signedAt) {
        setSaved({
          name: parsed.name,
          state: parsed.state ?? "",
          signedAt: parsed.signedAt,
        });
        setPhase("done");
      }
    } catch {
      /* storage unavailable: start fresh */
    }
  }, []);

  // Move focus to the new heading for keyboard and screen reader users
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [phase, step]);

  const cleanName = name.replace(/\s+/g, " ").trim();
  const nameValid =
    cleanName.length >= 2 && cleanName.length <= 28 && NAME_RE.test(cleanName);

  const current = PLEDGE_STEPS[step];
  const isLast = step === PLEDGE_STEPS.length - 1;

  const goBack = () => {
    if (step === 0) {
      setPhase("welcome");
      return;
    }
    setSigning("idle");
    setStep((s) => s - 1);
  };

  const finish = () => {
    const record: Saved = {
      name: cleanName,
      state,
      signedAt: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {
      /* the card still works for this visit */
    }
    setSaved(record);
    setPhase("done");
  };

  const startOver = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setSaved(null);
    setName("");
    setState("");
    setSigning("idle");
    setStep(0);
    setPhase("welcome");
  };

  return (
    <div className="mx-auto w-full max-w-xl">
      <style>{`
        @keyframes cp-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @keyframes cp-pop { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .cp-step { animation: cp-in .4s ease-out both; }
        .cp-bubble { animation: cp-pop 3s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .cp-step, .cp-bubble { animation: none; } }
      `}</style>

      {phase === "welcome" ? (
        <section key="welcome" className="cp-step text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-green">
            Civic Play · 2027 elections
          </p>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="mt-4 font-display text-4xl font-bold leading-tight text-balance outline-none sm:text-5xl"
          >
            Welcome. Make your pledge.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-cream/90">
            Three promises, about a minute. Vote your conscience, keep the
            peace, protect the process.
          </p>

          <div className="mt-10">
            <AvatarStack />
          </div>

          <div className="mt-10">
            <button
              type="button"
              onClick={() => {
                setStep(0);
                setPhase("steps");
              }}
              className={primary}
            >
              Make my pledge <ArrowRight className="size-5" aria-hidden />
            </button>
            <p className="mt-4 text-sm text-cream-muted">
              {pledgeCount && pledgeCount > 0
                ? `${pledgeCount.toLocaleString("en-NG")} Nigerians have pledged. `
                : ""}
              Free, no account needed.
            </p>
            <p className="mt-2 text-sm">
              <Link
                href="/elections"
                className="text-cream-muted underline underline-offset-2 hover:text-green"
              >
                Read the 2027 election facts first
              </Link>
            </p>
          </div>
        </section>
      ) : null}

      {phase === "steps" ? (
        <div>
          <Stepper steps={STEPPER_STEPS} current={step} />

          <section
            key={current.id}
            className="cp-step mt-8 rounded-3xl border border-cream/10 bg-navy-deep/70 p-6 backdrop-blur-md sm:p-8"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-green">
              Promise {step + 1} of {PLEDGE_STEPS.length}
            </p>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="mt-3 font-display text-3xl font-bold leading-tight outline-none sm:text-4xl"
            >
              <span aria-hidden className="mr-2">
                {current.emoji}
              </span>
              {current.headline}
            </h2>
            <p className="mt-3 text-lg text-cream/90">{current.promise}</p>

            <ul className="mt-5 space-y-3">
              {current.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-sm text-cream/90">
                  <span
                    aria-hidden
                    className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-green/20 text-green"
                  >
                    <Check className="size-3.5" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            {current.note ? (
              <p className="mt-5 rounded-xl border border-gold/30 bg-gold/10 px-3 py-2 text-xs leading-relaxed text-cream/85">
                {current.note}
              </p>
            ) : null}

            {isLast ? (
              <div className="mt-6 space-y-4 border-t border-cream/10 pt-6">
                <div>
                  <label
                    htmlFor="pledge-name"
                    className="text-sm font-semibold text-cream"
                  >
                    Your name, as you’d sign it
                  </label>
                  <input
                    id="pledge-name"
                    type="text"
                    autoComplete="name"
                    maxLength={28}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setSigning("idle");
                    }}
                    placeholder="e.g. Amina Okafor"
                    aria-invalid={name.length > 0 && !nameValid}
                    aria-describedby="pledge-name-help"
                    className="mt-2 w-full rounded-xl border border-cream/20 bg-navy px-4 py-3 text-cream placeholder:text-cream-muted/70 focus:border-gold focus:outline-none"
                  />
                  <p
                    id="pledge-name-help"
                    className="mt-1.5 text-xs text-cream-muted"
                  >
                    2 to 28 letters. Stays on your device. We don’t store it.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="pledge-state"
                    className="text-sm font-semibold text-cream"
                  >
                    Your state <span className="font-normal text-cream-muted">(optional)</span>
                  </label>
                  <select
                    id="pledge-state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-cream/20 bg-navy px-4 py-3 text-cream focus:border-gold focus:outline-none "
                  >
                    <option value="">Choose your state</option>
                    {NIGERIAN_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div
                  className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-cream/25 bg-navy/60 p-4"
                  aria-live="polite"
                >
                  {signing === "idle" ? (
                    <p className="flex items-center gap-2 text-sm text-cream-muted">
                      <PenLine className="size-4" aria-hidden /> Your signature
                      appears here
                    </p>
                  ) : (
                    <AnimatedSignature
                      key={cleanName}
                      name={cleanName}
                      onDone={() => setSigning("signed")}
                    />
                  )}
                </div>
              </div>
            ) : null}

            <div className="mt-8 flex items-center justify-between gap-3">
              <button type="button" onClick={goBack} className={ghost}>
                <ArrowLeft className="size-4" aria-hidden /> Back
              </button>

              {!isLast ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s + 1)}
                  className={primary}
                >
                  I pledge <ArrowRight className="size-5" aria-hidden />
                </button>
              ) : signing === "signed" ? (
                <button type="button" onClick={finish} className={primary}>
                  See my pledge card <ArrowRight className="size-5" aria-hidden />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!nameValid || signing === "signing"}
                  onClick={() => setSigning("signing")}
                  className={primary}
                >
                  {signing === "signing" ? "Signing…" : "I Sign"}
                  <PenLine className="size-5" aria-hidden />
                </button>
              )}
            </div>
          </section>
        </div>
      ) : null}

      {phase === "done" && saved ? (
        <section key="done" className="cp-step text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-green">
            Pledge signed
          </p>
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="mt-3 font-display text-4xl font-bold leading-tight text-balance outline-none sm:text-5xl"
          >
            Thank you, {saved.name.split(" ")[0]}.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-cream/90">
            Share your pledge card and ask three friends to join you.
          </p>

          <div className="mt-8">
            <PledgeCard
              name={saved.name}
              state={saved.state}
              signedAt={saved.signedAt}
            />
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/play" className={primary}>
              Play the civic quiz
            </Link>
            <Link href="/elections" className={ghost}>
              2027 election facts
            </Link>
          </div>
          <button
            type="button"
            onClick={startOver}
            className="mt-6 text-sm text-cream-muted underline underline-offset-2 hover:text-green"
          >
            Start over with a different name
          </button>
        </section>
      ) : null}
    </div>
  );
}
