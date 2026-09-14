"use client";

import confetti from "canvas-confetti";

const BRAND = ["#2ee59d", "#f5c542", "#f7f1e4", "#58f0b0", "#e0a820"];

export function fireConfetti(kind: "hit" | "win" | "share" = "hit") {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  if (kind === "hit") {
    confetti({
      particleCount: 40,
      spread: 55,
      origin: { y: 0.7 },
      colors: BRAND,
      scalar: 0.9,
    });
    return;
  }

  if (kind === "share") {
    confetti({
      particleCount: 24,
      spread: 40,
      origin: { y: 0.8 },
      colors: BRAND,
    });
    return;
  }

  const end = Date.now() + 1200;
  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: BRAND,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: BRAND,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}
