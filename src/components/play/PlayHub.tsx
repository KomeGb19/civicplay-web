"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { motion } from "motion/react";
import { PlayShell } from "@/components/play/PlayShell";
import { LevelCard, LeaderboardLink } from "@/components/play/LevelCard";
import { LEVELS, type LevelId } from "@/lib/constants";
import { isLevelUnlocked } from "@/lib/quiz-engine";

type Profile = {
  username: string | null;
  avatarId: string | null;
  bestScores: Record<LevelId, number>;
  needsOnboarding: boolean;
};

export function PlayHub() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingGuest, setLoadingGuest] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user.needsOnboarding) {
        router.replace("/play/onboarding");
        return;
      }
      fetch("/api/profile")
        .then((r) => r.json())
        .then((data) => {
          if (data.needsOnboarding) {
            router.replace("/play/onboarding");
            return;
          }
          setProfile(data);
        })
        .catch(() => setProfile(null));
    }
  }, [status, session, router]);

  const bestScores = useMemo(
    () =>
      profile?.bestScores ?? {
        basic: 0,
        intermediary: 0,
        advance: 0,
      },
    [profile],
  );

  async function startGuest() {
    setLoadingGuest(true);
    await signIn("guest", { callbackUrl: "/play/onboarding" });
  }

  if (status === "loading") {
    return (
      <PlayShell>
        <div className="loader mt-40 mx-auto" />
      </PlayShell>
    );
  }

  if (status === "unauthenticated") {
    return (
      <PlayShell>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-xl text-center"
        >
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Enter the civic arena
          </h1>
          <p className="mt-3 text-cream-muted">
            Timed quizzes. Streaks. Leaderboards. Sign in or play as a guest.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/signup"
              className="rounded-xl bg-green px-6 py-3 font-display font-bold text-navy-deep hover:bg-green-bright"
            >
              Create account
            </Link>
            <Link
              href="/login"
              className="rounded-xl border border-cream/25 px-6 py-3 font-semibold hover:bg-cream/10"
            >
              Sign in
            </Link>
            <button
              type="button"
              disabled={loadingGuest}
              onClick={startGuest}
              className="rounded-xl border border-gold/40 bg-gold/10 px-6 py-3 font-semibold text-gold hover:bg-gold/20 disabled:opacity-60"
            >
              {loadingGuest ? <p>Starting…</p> : <p>Play as guest</p>}
            </button>
          </div>
        </motion.div>
      </PlayShell>
    );
  }

  return (
    <PlayShell title="Choose your level">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">
            Ready to play your part?
          </h1>
          <p className="mt-2 text-cream-muted">
            Clear {90} points to unlock the next difficulty.
          </p>
        </div>
        <LeaderboardLink />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {LEVELS.map((level, index) => (
          <LevelCard
            key={level}
            level={level}
            index={index}
            best={bestScores[level] ?? 0}
            unlocked={isLevelUnlocked(level, bestScores)}
          />
        ))}
      </div>
    </PlayShell>
  );
}
