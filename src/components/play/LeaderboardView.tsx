"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { PlayShell } from "@/components/play/PlayShell";
import { AvatarBadge } from "@/components/play/AvatarBadge";
import { useRouter } from "next/navigation";
import {
  LEVELS,
  LEVEL_META,
  type LevelId,
  type AvatarId,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

type Entry = {
  username: string;
  score: number;
  avatarId: AvatarId;
};

export function LeaderboardView() {
  const [level, setLevel] = useState<LevelId>("basic");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/leaderboard?level=${level}`)
      .then((r) => r.json())
      .then((data) => setEntries(data.entries ?? []))
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, [level]);

  return (
    <PlayShell title="Leaderboard">
      <div className="mx-auto max-w-2xl relative">
        <div className="absolute left-2 top-2 sm:-left-15 sm:top-4 z-20">
          <button
            onClick={() => router.back()}
            className="flex hover bg-green/10 hover:bg-green/40 rounded-full p-2 gap-2"
          >
            <ArrowLeft />
          </button>
        </div>
        <h1 className="font-display text-3xl font-bold sm:text-4xl">
          Top civic minds
        </h1>
        <p className="mt-2 text-cream-muted">
          Best score per player on each level.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {LEVELS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setLevel(id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                level === id
                  ? "bg-green text-navy-deep"
                  : "border border-cream/20 text-cream/80 hover:bg-cream/10",
              )}
            >
              {LEVEL_META[id].label}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-2">
          {loading ? (
            <div className="loader mx-auto mt-20" />
          ) : entries.length === 0 ? (
            <p className="rounded-xl border border-cream/10 bg-navy-deep/50 p-6 text-cream-muted">
              No scores yet for this level. Be the first!
            </p>
          ) : (
            entries.map((entry, i) => (
              <motion.div
                key={`${entry.username}-${i}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "flex items-center gap-4 rounded-xl border px-4 py-3",
                  i === 0
                    ? "border-gold/40 bg-gold/10"
                    : "border-cream/10 bg-navy-deep/60",
                )}
              >
                <span className="w-8 font-display text-lg font-bold text-cream-muted">
                  #{i + 1}
                </span>
                <AvatarBadge avatarId={entry.avatarId} size="sm" />
                <span className="flex-1 font-medium">@{entry.username}</span>
                <span className="font-display text-xl font-bold text-gold">
                  {entry.score}
                </span>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </PlayShell>
  );
}
