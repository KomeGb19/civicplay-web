"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { AvatarBadge } from "@/components/play/AvatarBadge";
import Image from "next/image";

export function PlayShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const { data: session } = useSession();

  return (
    <div className="relative min-h-dvh overflow-hidden bg-navy text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(46,229,157,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(245,197,66,0.12),_transparent_45%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(247,241,228,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(247,241,228,0.5)_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/play" className="font-display text-lg font-bold tracking-tight">
          <Image src="/props/civicplaywhite.png" alt="Civic Arena logo" width={32} height={32} className="inline-block" />
        </Link>
        {title ? (
          <p className="hidden text-sm text-cream-muted sm:block">{title}</p>
        ) : null}
        <div className="flex items-center gap-3">
          {session?.user?.username ? (
            <div className="flex items-center gap-2">
              <AvatarBadge avatarId={session.user.avatarId} size="sm" />
              <span className="text-sm font-medium">@{session.user.username}</span>
            </div>
          ) : null}
          {session ? (
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-lg border border-cream/20 px-3 py-1.5 text-xs text-cream/80 hover:bg-cream/10"
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-green px-3 py-1.5 text-xs font-semibold text-navy-deep"
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
  );
}
