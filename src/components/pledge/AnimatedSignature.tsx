"use client";

import { useEffect, useRef } from "react";
import { signatureFont } from "@/components/pledge/signature-font";

type Props = {
  name: string;
  /** Called once the animation has finished */
  onDone?: () => void;
  durationMs?: number;
};

/**
 * Draws a signature: the outline is traced, the ink fills in, and a
 * flourish is drawn underneath. Remount with a new `key` to replay it.
 */
export function AnimatedSignature({ name, onDone, durationMs = 2400 }: Props) {
  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const t = window.setTimeout(() => doneRef.current?.(), durationMs + 300);
    return () => window.clearTimeout(t);
  }, [name, durationMs]);

  const size = Math.min(120, Math.floor(1700 / Math.max(name.length, 1)));
  const d = `${durationMs}ms`;

  return (
    <div className="text-cream">
      <style>{`
        @keyframes cp-sig-wipe { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
        @keyframes cp-sig-dash { from { stroke-dashoffset: 2400; } to { stroke-dashoffset: 0; } }
        @keyframes cp-sig-fill { from { fill-opacity: 0; } to { fill-opacity: 1; } }
        @keyframes cp-sig-line { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        .cp-sig { animation: cp-sig-wipe calc(${d} * 0.8) cubic-bezier(.45,.05,.35,1) both; }
        .cp-sig-stroke { stroke-dasharray: 2400; animation: cp-sig-dash calc(${d} * 0.8) ease-out both, cp-sig-fill calc(${d} * 0.35) ease-in calc(${d} * 0.6) both; }
        .cp-sig-line { stroke-dasharray: 1; animation: cp-sig-line calc(${d} * 0.4) ease-out calc(${d} * 0.6) both; }
        @media (prefers-reduced-motion: reduce) {
          .cp-sig, .cp-sig-stroke, .cp-sig-line { animation: none; stroke-dashoffset: 0; fill-opacity: 1; }
        }
      `}</style>

      <svg
        key={name}
        viewBox="0 0 600 200"
        role="img"
        aria-label={`Signature of ${name}`}
        className="cp-sig mx-auto h-auto w-full max-w-md"
      >
        <text
          x="300"
          y="125"
          textAnchor="middle"
          fontSize={size}
          className={`cp-sig-stroke ${signatureFont.className}`}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          {name}
        </text>
        <path
          className="cp-sig-line"
          d="M 90 160 C 200 148, 390 176, 520 146"
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}
