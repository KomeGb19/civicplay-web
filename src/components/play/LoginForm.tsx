"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { motion } from "motion/react";
import { PlayShell } from "@/components/play/PlayShell";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export function LoginForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session) {
      router.replace(
        session.user.needsOnboarding ? "/play/onboarding" : "/play",
      );
    }
  }, [status, session, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "signup") {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Signup failed");
          setLoading(false);
          return;
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(
          mode === "login"
            ? "Invalid email or password"
            : "Account created but sign-in failed",
        );
        setLoading(false);
        return;
      }

      router.push("/play");
      router.refresh();
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  }

  async function continueAsGuest() {
    setLoading(true);
    setError(null);
    const result = await signIn("guest", { redirect: false });
    if (result?.error) {
      setError("Could not start guest mode");
      setLoading(false);
      return;
    }
    router.push("/play/onboarding");
    router.refresh();
  }

  return (
    <PlayShell title={mode === "login" ? "Sign in" : "Create account"}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-md"
      >
        <div className="absolute left-2 top-2 sm:-left-15 sm:top-4 z-20">
          <button
            onClick={() => router.push("/")}
            className="flex hover bg-green/10 hover:bg-green/40 rounded-full p-2 gap-2"
          >
            <ArrowLeft />
          </button>
        </div>
        <h1 className="font-display text-3xl font-bold sm:text-4xl">
          {mode === "login" ? "Welcome back" : "Join Civic Play"}
        </h1>
        <p className="mt-2 text-cream-muted">
          {mode === "login"
            ? "Sign in to keep your progress and climb the board."
            : "Create an account or jump in as a guest."}
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          {mode === "signup" ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Display name"
              className="w-full rounded-xl border border-cream/20 bg-navy-deep/60 px-4 py-3 outline-none focus:ring-2 focus:ring-green/40"
            />
          ) : null}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-xl border border-cream/20 bg-navy-deep/60 px-4 py-3 outline-none focus:ring-2 focus:ring-green/40"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-cream/20 bg-navy-deep/60 px-4 py-3 outline-none focus:ring-2 focus:ring-green/40"
          />

          {error ? (
            <p className="rounded-lg border border-coral/40 bg-coral/10 px-3 py-2 text-sm text-coral">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green py-3 font-display text-lg font-bold text-navy-deep hover:bg-green-bright disabled:opacity-60"
          >
            {loading ? (
              <div className="loader mx-auto" />
            ) : mode === "login"
              ? "Sign in"
              : "Create account"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3 text-xs text-cream-muted">
          <div className="h-px flex-1 bg-cream/15" />
          OR
          <div className="h-px flex-1 bg-cream/15" />
        </div>

        <button
          type="button"
          disabled={loading}
          onClick={() => signIn("google", { callbackUrl: "/play" })}
          className="w-full rounded-xl border flex items-center justify-center border-cream/25 bg-cream/5 py-3 font-medium hover:bg-cream/10 disabled:opacity-60"
        >
          Continue with Google 
          <Image src="/google.png" alt="Google logo" width={20} height={20} className="inline ml-2" />
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={continueAsGuest}
          className="mt-3 w-full rounded-xl border border-gold/40 bg-gold/10 py-3 font-medium text-gold hover:bg-gold/20 disabled:opacity-60"
        >
          Play as guest
        </button>

        <p className="mt-6 text-center text-sm text-cream-muted">
          {mode === "login" ? (
            <>
              New here?{" "}
              <Link href="/signup" className="text-green hover:underline">
                Create an account
              </Link>
            </>
          ) : (
            <>
              Already playing?{" "}
              <Link href="/login" className="text-green hover:underline">
                Sign in
              </Link>
            </>
          )}
        </p>
      </motion.div>
    </PlayShell>
  );
}
