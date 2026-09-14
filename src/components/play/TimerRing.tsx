"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TIMER_SECONDS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function TimerRing({
  secondsLeft,
  total = TIMER_SECONDS,
  urgent,
}: {
  secondsLeft: number;
  total?: number;
  urgent?: boolean;
}) {
  const ringRef = useRef<SVGCircleElement>(null);
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, secondsLeft / total);

  useEffect(() => {
    if (!ringRef.current) return;
    gsap.to(ringRef.current, {
      strokeDashoffset: circumference * (1 - progress),
      duration: 0.35,
      ease: "power2.out",
    });
  }, [progress, circumference]);

  return (
    <div
      className={cn(
        "relative size-20",
        urgent && "animate-pulse",
      )}
    >
      <svg viewBox="0 0 80 80" className="-rotate-90 size-full">
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="rgba(247,241,228,0.15)"
          strokeWidth="6"
        />
        <circle
          ref={ringRef}
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke={urgent ? "#ff6b5b" : "#2ee59d"}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={0}
        />
      </svg>
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center font-display text-2xl font-bold",
          urgent ? "text-coral" : "text-cream",
        )}
      >
        {secondsLeft}
      </span>
    </div>
  );
}
