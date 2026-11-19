import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { WELCOME_AVATARS } from "@/lib/pledge";

/** Avatars start compact, then expand into an overlapping row on load. */
export function AvatarStack({
  message = "Join fellow Nigerians to pledge!",
}: {
  message?: string;
}) {
  const count = WELCOME_AVATARS.length;
  const center = (count - 1) / 2;

  return (
    <div className="flex flex-col items-center gap-4">
      <style>{`
        @keyframes cp-avatar-expand {
          from {
            opacity: 0;
            transform:
              translateX(calc((var(--c) - var(--i)) * var(--step)))
              rotate(calc((var(--i) - var(--c)) * 7deg))
              scale(0.55);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotate(0deg) scale(1);
          }
        }
        @keyframes cp-bubble-in {
          from { opacity: 0; transform: translateY(10px) scale(0.85); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cp-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-5px); }
        }

        .cp-avatar {
          animation: cp-avatar-expand 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          animation-delay: calc(0.35s + var(--i) * 70ms);
        }
        .cp-bubble-intro {
          animation:
            cp-bubble-in 0.5s ease-out 1.2s both,
            cp-float 3s ease-in-out 1.8s infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .cp-avatar, .cp-bubble-intro { animation: none; }
        }
      `}</style>

      <p className="cp-bubble-intro relative rounded-2xl border border-gold/40 bg-gold/15 px-4 py-2 text-sm font-semibold text-gold">
        {message}
        <span
          aria-hidden
          className="absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 border-b border-r border-gold/40 bg-navy"
        />
      </p>

      {/* Decorative: the speech bubble carries the message.
          --step = avatar width minus the 0.75rem overlap */}
      <ul
        aria-hidden="true"
        className="flex items-center [--step:2.75rem] sm:[--step:3.25rem]"
      >
        {WELCOME_AVATARS.map((a, i) => (
          <li
            key={a.avatar}
            className={cn(
              "cp-avatar relative size-14 overflow-hidden rounded-full border-2 border-navy shadow-lg sm:size-16",
              a.tone,
              i > 0 && "-ml-3",
            )}
            style={
              {
                zIndex: count - i,
                "--i": i,
                "--c": center,
              } as CSSProperties
            }
          >
            <Image
              src={a.avatar}
              alt=""
              fill
              sizes="30px"
              priority
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
