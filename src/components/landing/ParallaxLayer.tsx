"use client";

import {
  CivicBook,
  CivicCharacter,
  CivicShield,
  Gavel,
  JusticeScales,
  KnowledgeCoin,
  Megaphone,
  PhoneFrame,
  ScoreStar,
  StreakFlame,
  TimerBadge,
} from "@/components/landing/Props";
import TextLoop from "@/components/TextLoop";

type ParallaxLayerProps = {
  progress: number;
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

export function ParallaxLayer({ progress }: ParallaxLayerProps) {
  const p = clamp01(progress);

  // Character: peeks at start, rises fully by product chapter
  const charY = lerp(58, 18, clamp01((p - 0.05) / 0.4));
  const charScale = lerp(0.85, 1.05, clamp01(p / 0.5));
  const charOpacity = lerp(0.95, 1, clamp01(p / 0.2));

  // Phone appears around product
  const phoneOpacity = clamp01((p - 0.28) / 0.12);
  const phoneY = lerp(40, 8, phoneOpacity);
  const phoneX = lerp(18, 8, phoneOpacity);

  // How-to icons
  const howOpacity =
    clamp01((p - 0.48) / 0.1) * (1 - clamp01((p - 0.78) / 0.1));

  // Proof badges
  const proofOpacity =
    clamp01((p - 0.68) / 0.08) * (1 - clamp01((p - 0.9) / 0.08));

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {/* Far coins — slow drift */}
      <Gavel
        className="absolute h-16 w-16 md:h-40 md:w-40"
        style={{
          left: "8%",
          top: `${lerp(18, -10, p)}%`,
          transform: `rotate(${lerp(-12, 28, p)}deg) scale(${lerp(1, 0.7, p)})`,
          opacity: lerp(0.95, 0.35, p),
          filter: "blur(0.2px)",
        }}
      />
      <KnowledgeCoin
        className="absolute h-12 w-12 md:h-16 md:w-16"
        style={{
          right: "12%",
          top: `${lerp(28, 5, p)}%`,
          transform: `rotate(${lerp(18, -40, p)}deg)`,
          opacity: lerp(0.85, 0.4, p),
        }}
      />
      <JusticeScales
        className="absolute h-24 w-24 md:h-40 md:w-40"
        style={{
          left: "72%",
          top: `${lerp(62, 20, p)}%`,
          transform: `rotate(${lerp(-30, 15, p)}deg) scale(${lerp(0.9, 1.15, p)})`,
          opacity: lerp(0.7, 0.25, clamp01(p * 1.2)),
          filter: "blur(1px)",
        }}
      />
      <KnowledgeCoin
        className="absolute h-10 w-10 md:h-14 md:w-14"
        style={{
          left: "22%",
          top: `${lerp(70, 30, p)}%`,
          transform: `rotate(${lerp(40, -10, p)}deg)`,
          opacity: lerp(0.8, 0.2, p),
        }}
      />
      {/* Mid props */}
      <CivicShield
        className="absolute h-24 w-20 md:h-36 md:w-28"
        style={{
          left: "4%",
          top: `${lerp(45, 12, p)}%`,
          transform: `rotate(${lerp(-8, 12, p)}deg) translateY(${lerp(0, -40, p)}px)`,
          opacity:
            lerp(0.15, 0.9, clamp01((p - 0.08) / 0.2)) *
            (1 - clamp01((p - 0.75) / 0.2)),
        }}
      />
      <CivicBook
        className="absolute h-20 w-24 md:h-28 md:w-36"
        style={{
          right: "6%",
          top: `${lerp(55, 18, p)}%`,
          transform: `rotate(${lerp(12, -8, p)}deg)`,
          opacity:
            lerp(0.1, 0.85, clamp01((p - 0.12) / 0.2)) *
            (1 - clamp01((p - 0.7) / 0.2)),
        }}
      />
      {/* <Megaphone
        className="absolute h-16 w-24 md:h-24 md:w-32"
        style={{
          left: "15%",
          top: `${lerp(20, -5, clamp01((p - 0.15) / 0.35))}%`,
          transform: `rotate(${lerp(-20, 5, p)}deg)`,
          opacity:
            clamp01((p - 0.15) / 0.12) * (1 - clamp01((p - 0.55) / 0.15)),
        }}
      /> */}
      {/* Phone / product */}
      <Megaphone
        className="absolute h-44 w-44 md:h-40 md:w-40"
        style={{
          right: `${phoneX}%`,
          top: `${phoneY}%`,
          opacity: phoneOpacity * (1 - clamp01((p - 0.62) / 0.15)),
          transform: `rotate(${lerp(8, -4, phoneOpacity)}deg) scale(${lerp(0.85, 1, phoneOpacity)})`,
        }}
      />
      {/* How-to orbit */}
      {/* <TimerBadge
        className="absolute h-16 w-16 md:h-20 md:w-20"
        style={{
          left: "18%",
          top: "32%",
          opacity: howOpacity,
          transform: `translate(${Math.sin(p * 12) * 8}px, ${lerp(30, 0, howOpacity)}px) rotate(-8deg)`,
        }}
      /> */}
      {/* <StreakFlame
        className="absolute h-20 w-14 md:h-24 md:w-16"
        style={{
          right: "20%",
          top: "28%",
          opacity: howOpacity,
          transform: `translateY(${lerp(40, 0, howOpacity)}px)`,
        }}
      /> */}
      {/* <ScoreStar
        className="absolute h-14 w-14 md:h-18 md:w-18"
        style={{
          left: "48%",
          top: "22%",
          opacity: howOpacity,
          transform: `scale(${lerp(0.6, 1, howOpacity)}) rotate(${lerp(-20, 10, howOpacity)}deg)`,
        }}
      /> */}
      {/* Proof floating badges */}
      <div
        className="absolute hidden md:block left-[28%] top-[45%] max-w-[220px] rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur-md md:left-[8%] -rotate-3 md:max-w-[280px] border border-green/30"
        style={{
          opacity: proofOpacity,
          transform: `translateY(${lerp(40, 0, proofOpacity)}px)`,
        }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-gold)]">
          Roundcheck
        </p>
        <p className="mt-2 text-sm leading-snug text-[var(--color-cream)]">
          Youth-led fact-checking · Civic Play is our next civic-tech push.
        </p>
      </div>
      <div
        className="absolute hidden md:block right-[8%] top-[45%] max-w-[240px] rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur-md md:right-[8%] rotate-3 border border-green/30"
        style={{
          opacity: proofOpacity,
          transform: `translateY(${lerp(50, 0, proofOpacity)}px)`,
        }}
      >
        <p className="text-sm leading-snug text-[var(--color-cream)]">
          “Capable of promoting MIL and raising awareness that aids civic
          participation.”
        </p>
        <p className="mt-2 text-xs text-[var(--color-cream-muted)]">
          — Bamas Victoria, ICIR
        </p>
      </div>

      {/* Character */}
      <CivicCharacter
        className="absolute left-1/2 h-[42vh] w-auto max-w-[280px] -translate-x-1/2 md:h-[52vh] md:max-w-[340px]"
        style={{
          bottom: `${-charY + 8}%`,
          opacity: charOpacity,
          transform: `translateX(-150%) scale(${charScale})`,
          transformOrigin: "bottom center",
        }}
      />

      {/* Soft vignette */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(6,20,38,0.55)_100%)]"
        aria-hidden
      />
    </div>
  );
}
