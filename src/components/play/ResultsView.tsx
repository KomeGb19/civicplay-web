"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "motion/react";
import { Check, Copy } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { PlayShell } from "@/components/play/PlayShell";
import { fireConfetti } from "@/components/play/ConfettiBurst";
import {
  LEVEL_META,
  MAX_SCORE,
  UNLOCK_THRESHOLD,
  type LevelId,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

type ResultPayload = {
  level: LevelId;
  score: number;
  correctCount: number;
  streakMax: number;
  bestScore: number;
  isNewBest: boolean;
  unlockedLevel: LevelId | null;
};

const SHARE_TEXT = (score: number, level: string) =>
  `I scored ${score}/${MAX_SCORE} on Civic Play (${level})! Test your civic IQ: https://civicplay.ng/play`;

export function ResultsView() {
  const router = useRouter();
  const { data: session } = useSession();
  const [result, setResult] = useState<ResultPayload | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("civicplay_last_result");
    if (!raw) {
      router.replace("/play");
      return;
    }
    try {
      const parsed = JSON.parse(raw) as ResultPayload;
      setResult(parsed);
      fireConfetti("win");
    } catch {
      router.replace("/play");
    }
  }, [router]);

  if (!result) {
    return (
      <PlayShell>
        <p className="text-cream-muted">Loading results…</p>
      </PlayShell>
    );
  }

  const meta = LEVEL_META[result.level];
  const progress = Math.min(100, (result.score / UNLOCK_THRESHOLD) * 100);
  const text = SHARE_TEXT(result.score, meta.label);
  const encoded = encodeURIComponent(text);

  async function copyScore() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    fireConfetti("share");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <PlayShell title="Round complete">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-lg text-center"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-cream-muted">
          {meta.label} complete
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold">
          {result.score >= UNLOCK_THRESHOLD ? "Arena cleared!" : "Nice run!"}
        </h1>

        <div className="mt-8 rounded-2xl border border-gold/30 bg-navy-deep/70 p-8">
          <p className="text-sm text-cream-muted">Your score</p>
          <div className="mt-2 font-display text-6xl font-bold text-gold">
            <NumberFlow value={result.score} />
            <span className="text-2xl text-cream-muted">/{MAX_SCORE}</span>
          </div>
          <p className="mt-3 text-sm text-cream-muted">
            {result.correctCount} correct · best streak {result.streakMax}x
            {result.isNewBest ? " · New personal best!" : ""}
          </p>

          <div className="mx-auto mt-6 h-3 max-w-xs overflow-hidden rounded-full bg-cream/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-green to-gold"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <p className="mt-2 text-xs text-cream-muted">
            Unlock threshold {UNLOCK_THRESHOLD}
          </p>
        </div>

        {result.unlockedLevel ? (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-xl border border-gold/40 bg-gold/15 px-4 py-3 font-display font-bold text-gold"
          >
            UNLOCKED: {LEVEL_META[result.unlockedLevel].label}
          </motion.p>
        ) : null}

        {session?.user.role === "guest" && result.score >= UNLOCK_THRESHOLD ? (
          <p className="mt-4 text-sm text-cream-muted">
            Save your progress?{" "}
            <Link href="/signup" className="text-green hover:underline">
              Create an account
            </Link>
          </p>
        ) : null}

        <div className="mt-8 space-y-3">
          <p className="text-sm font-medium text-cream/90">Share your score</p>
          <div className="flex flex-wrap justify-center gap-2">
            <ShareBtn
              href={`https://twitter.com/intent/tweet?text=${encoded}`}
              label="X"
            />
            <ShareBtn
              href={`https://wa.me/?text=${encoded}`}
              label="WhatsApp"
            />
            <ShareBtn
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://civicplay.ng/play")}&quote=${encoded}`}
              label="Facebook"
            />
            <ShareBtn
              href={`https://t.me/share/url?url=${encodeURIComponent("https://civicplay.ng/play")}&text=${encoded}`}
              label="Telegram"
            />
            <button
              type="button"
              onClick={copyScore}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm",
                copied
                  ? "border-green text-green"
                  : "border-cream/20 hover:bg-cream/10",
              )}
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={`/play/quiz/${result.level}`}
            className="rounded-xl bg-green px-6 py-3 font-display font-bold text-navy-deep hover:bg-green-bright"
          >
            Play again
          </Link>
          <Link
            href="/play"
            className="rounded-xl border border-cream/25 px-6 py-3 font-semibold hover:bg-cream/10"
          >
            Level select
          </Link>
          <Link
            href="/play/leaderboard"
            className="rounded-xl border border-gold/40 bg-gold/10 px-6 py-3 font-semibold text-gold hover:bg-gold/20"
          >
            Leaderboard
          </Link>
        </div>
      </motion.div>
    </PlayShell>
  );
}

function ShareBtn({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-lg border border-cream/20 px-3 py-2 text-sm hover:bg-cream/10"
    >
      {label}
    </a>
  );
}
