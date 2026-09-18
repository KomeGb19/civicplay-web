"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { AvatarBadge } from "@/components/play/AvatarBadge";
import { AvatarPicker } from "@/components/play/AvatarPicker";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Volume2 } from "lucide-react";

export function PlayShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const { data: session, update, status } = useSession();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(() => {
    // Retrieve from localStorage on initial render
    const saved = window.localStorage.getItem("isMusicPlaying");
    return saved === null ? true : saved === "true";
  });
  const [selectedAvatarId, setSelectedAvatarId] = useState(session?.user?.avatarId ?? null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Persist music state to localStorage whenever it changes
  useEffect(() => {
    window.localStorage.setItem("isMusicPlaying", String(isMusicPlaying));
  }, [isMusicPlaying]);

  // Audio control effects
  useEffect(() => {
    // Create audio element if not existing
    if (!audioRef.current) {
      audioRef.current = new Audio("/sounds/backgroundmusic.mp3");
      audioRef.current.loop = true;
    }

    // Control play/pause based on state
    if (isMusicPlaying) {
      audioRef.current
        .play()
        .catch((e) => console.log("Audio play failed:", e));
    } else {
      audioRef.current.pause();
    }

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isMusicPlaying]);

  // Click sound effect
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!clickSoundRef.current) {
      clickSoundRef.current = new Audio('/sounds/interfaceclick.wav');
      clickSoundRef.current.volume = 0.5; // adjust volume as needed
    }

    const handleClick = () => {
      const sound = clickSoundRef.current;
      if (sound) {
        sound.currentTime = 0; // restart from beginning
        sound.play().catch(e => console.log('Click sound play failed:', e));
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []); // empty deps to run once

  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  const handleProfileClose = () => {
    setShowProfileModal(false);
  };

  return (
    <>
      <div className="relative min-h-dvh overflow-hidden bg-navy text-cream">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(46,229,157,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(245,197,66,0.12),_transparent_45%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(247,241,228,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(247,241,228,0.5)_1px,transparent_1px)] [background-size:48px_48px]"
        />

        <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/play"
            className="font-display text-lg font-bold tracking-tight"
          >
            <Image
              src="/props/civicplaywhite.png"
              alt="Civic Arena logo"
              width={40}
              height={40}
              className="inline-block w-10 h-10"
            />
          </Link>
          {title ? (
            <p className="hidden text-sm text-cream-muted sm:block">{title}</p>
          ) : null}
          <div className="flex items-center gap-3">
            {session?.user?.username ? (
              <button
                className="flex items-center gap-2 hover:bg-green/10 p-2 rounded-xl"
                onClick={handleProfileClick}
              >
                <AvatarBadge avatarId={session.user.avatarId} size="sm" />
                <span className="text-sm font-medium">
                  @{session.user.username}
                </span>
              </button>
            ) : null}
            {session ? (
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="rounded-lg border border-cream/20 px-3 py-2.5 text-xs text-cream/80 hover:bg-cream/10"
              >
                Sign out
              </button>
            ) : (
              <Link
                href="/login"
                className="rounded-lg bg-green px-3 py-2.5 text-xs font-semibold text-navy-deep"
              >
                Sign in
              </Link>
            )}
          </div>
        </header>

        <main className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6">
          {children}
        </main>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md mx-4 sm:mx-0">
            <div className="bg-green/70 border border-cream/20 rounded-xl max-h-[70vh] p-6 overflow-scroll space-y-5">
              <div className="flex justify-between items-start">
                <h2 className="font-display text-xl font-bold text-cream">
                  Profile Settings
                </h2>
                <button
                  onClick={handleProfileClose}
                  className="text-cream hover:text-navy transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Username Form */}
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const username = formData.get("username") as string;
                  const avatarId = formData.get("avatarId") as string;

                  try {
                    const res = await fetch("/api/profile", {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ username, avatarId }),
                    });

                    if (!res.ok) {
                      throw new Error("Failed to update profile");
                    }

                    const data = await res.json();
                    // Update session locally
                    update({
                      username: data.username,
                      avatarId: data.avatarId,
                    });
                    handleProfileClose();
                  } catch (err) {
                    console.error("Profile update error:", err);
                    alert("Failed to update profile. Please try again.");
                  }
                }}
              >
                {/* Music Toggle */}
                <div className="flex items-center justify-between bg-green p-2 rounded-xl w-55 gap-2">
                  <span className="text-sm flex items-center gap-2 text-cream/90">
                    <Volume2 className="text-gold" />
                    Background Music
                  </span>
                  <Switch
                    checked={isMusicPlaying}
                    onCheckedChange={(checked) => setIsMusicPlaying(checked)}
                    className="h-4 w-8"
                    size="default"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-cream/90">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    defaultValue={session?.user?.username ?? ""}
                    minLength={3}
                    maxLength={20}
                    pattern="[A-Za-z0-9_]+"
                    className="w-full rounded-xl border border-cream/20 bg-navy-deep/60 py-3 pl-4 pr-4 text-cream outline-none ring-green/40 placeholder:text-cream-muted focus:ring-2"
                    required
                  />
                  <p className="text-xs text-cream-muted">
                    3–20 characters. Letters, numbers, underscore.
                  </p>
                </div>

                {/* Avatar Picker */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-cream/90">
                    Avatar
                  </label>
                  {/* We'll reuse the AvatarPicker component from onboarding */}
                  <AvatarPicker
                    value={session?.user?.avatarId ?? null}
                    onChange={(avatarId: string | null) => {
                      // Avatar change will be handled in form submission
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-navy-deep px-4 py-3 font-display text-lg font-bold text-green transition hover:bg-navy"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}