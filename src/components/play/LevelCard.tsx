"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Lock, Trophy, Unlock } from "lucide-react";
import { LEVEL_META, UNLOCK_THRESHOLD, type LevelId } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function LevelCard({
  level,
  best,
  unlocked,
  index,
}: {
  level: LevelId;
  best: number;
  unlocked: boolean;
  index: number;
}) {
  const meta = LEVEL_META[level];
  const progress = Math.min(100, (best / UNLOCK_THRESHOLD) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={unlocked ? { y: -4 } : undefined}
      className={cn(
        "relative overflow-hidden rounded-2xl border p-5",
        unlocked
          ? "border-green/30 bg-navy-deep/70"
          : "border-cream/10 bg-navy-deep/40 opacity-80",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-cream-muted">
            Level {index + 1}
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold">{meta.label}</h3>
          <p className="mt-1 text-sm text-cream-muted">
            Best: {best}/150 · Unlock next at {UNLOCK_THRESHOLD}
          </p>
        </div>
        {unlocked ? (
          <Unlock className="size-5 text-green" />
        ) : (
          <Lock className="size-5 text-cream-muted" />
        )}
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-cream/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-green to-gold"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>

      {unlocked ? (
        <Link
          href={`/play/quiz/${level}`}
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-green py-2.5 font-semibold text-navy-deep hover:bg-green-bright"
        >
          Play {meta.label}
        </Link>
      ) : (
        <p className="mt-5 rounded-xl border border-cream/10 px-3 py-2 text-center text-sm text-cream-muted">
          Score {UNLOCK_THRESHOLD}+ on the previous level to unlock
        </p>
      )}
    </motion.div>
  );
}

export function LeaderboardLink() {
  return (
    <Link
      href="/play/leaderboard"
      className="inline-flex items-center justify-center w-35 gap-2 rounded-xl hover:scale-105 duration-500 border border-gold/40 bg-gold/10 px-4 py-2.5 text-sm font-semibold text-gold hover:bg-gold/20"
    >
      <Trophy className="size-4" />
      Leaderboard
    </Link>
  );
}
