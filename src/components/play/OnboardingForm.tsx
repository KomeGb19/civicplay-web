"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "motion/react";
import { AvatarPicker } from "@/components/play/AvatarPicker";
import { PlayShell } from "@/components/play/PlayShell";
import type { AvatarId } from "@/lib/constants";
import { ArrowLeft } from "lucide-react";

export function OnboardingForm() {
  const router = useRouter();
  const { data: session, update, status } = useSession();
  const [username, setUsername] = useState("");
  const [avatarId, setAvatarId] = useState<AvatarId | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session && !session.user.needsOnboarding) {
      router.replace("/play");
    }
  }, [session, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!avatarId) {
      setError("Pick an avatar to continue");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, avatarId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not save profile");
        setLoading(false);
        return;
      }
      await update({ username: data.username, avatarId: data.avatarId });
      router.push("/play");
      router.refresh();
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  }

  if (status === "loading") {
    return (
      <PlayShell title="Create your player">
        <p className="text-cream-muted">Loading…</p>
      </PlayShell>
    );
  }

  return (
    <PlayShell title="Create your player">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl relative"
      >
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Choose your look. Claim your name.
        </h1>
        <p className="mt-2 text-cream-muted">
          Your avatar and username show up on the leaderboard.
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-8">
          <div>
            <label className="mb-3 block text-sm font-medium text-cream/90">
              Avatar
            </label>
            <AvatarPicker value={avatarId} onChange={setAvatarId} />
          </div>

          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-cream/90"
            >
              Username
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-cream-muted">
                @
              </span>
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength={3}
                maxLength={20}
                pattern="[A-Za-z0-9_]+"
                required
                placeholder="civicchamp"
                className="w-full rounded-xl border border-cream/20 bg-navy-deep/60 py-3 pl-8 pr-4 text-cream outline-none ring-green/40 placeholder:text-cream-muted focus:ring-2"
              />
            </div>
            <p className="mt-1.5 text-xs text-cream-muted">
              3–20 characters. Letters, numbers, underscore.
            </p>
          </div>

          {error ? (
            <p className="rounded-lg border border-coral/40 bg-coral/10 px-3 py-2 text-sm text-coral">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green px-4 py-3 font-display text-lg font-bold text-navy-deep transition hover:bg-green-bright disabled:opacity-60"
          >
            {loading ? "Saving…" : "Enter the arena"}
          </button>
        </form>
      </motion.div>
    </PlayShell>
  );
}
