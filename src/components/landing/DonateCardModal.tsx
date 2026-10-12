"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Check, Copy, X } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";

/* -------------------------------------------------------------------------- */
/*                              types & constants                             */
/* -------------------------------------------------------------------------- */

export type DonateCardModalProps = {
  open: boolean;
  onClose: () => void;
};

const ACCOUNT = {
  name: "Roundcheck Media",
  number: "1228957819",
  bank: "Zenith Bank",
};

const CARD_SHADOW =
  "0 25px 60px -20px rgba(6,20,38,0.85), inset 0 1px 0 rgba(255,255,255,0.4)";

const cx = (...c: Array<string | false | null | undefined>) =>
  c.filter(Boolean).join(" ");

/* -------------------------------------------------------------------------- */
/*                                public component                            */
/* -------------------------------------------------------------------------- */

export function DonateCardModal(props: DonateCardModalProps) {
  const { open, ...rest } = props;
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  // Portal to <body> so no parent (menu overlay, transforms, filters) can clip or re-anchor it.
  return createPortal(
    <AnimatePresence>
      {open && <ModalLayer key="donate-card-modal" {...rest} />}
    </AnimatePresence>,
    document.body,
  );
}

/* -------------------------------------------------------------------------- */
/*                                 modal layer                                */
/* -------------------------------------------------------------------------- */

function ModalLayer({ onClose }: Omit<DonateCardModalProps, "open">) {
  const reduce = !!useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  });

  // Scroll lock, Escape to close, simple focus trap, initial focus.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeRef.current();
        return;
      }
      if (e.key !== "Tab" || !rootRef.current) return;
      const focusables = Array.from(
        rootRef.current.querySelectorAll<HTMLElement>(
          "button:not([disabled]), [tabindex='0']",
        ),
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    // Only auto-focus where there's no on-screen keyboard / touch UI.
    const timer = window.setTimeout(() => {
      if (window.matchMedia("(pointer: fine)").matches) {
        rootRef.current
          ?.querySelector<HTMLElement>("[data-autofocus]")
          ?.focus();
      }
    }, 500);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[70]"
      role="dialog"
      aria-modal="true"
      aria-label="Account details"
    >
      {/* Backdrop + drifting colour orbs (gives the glass something to refract) */}
      <motion.div
        className="absolute inset-0 overflow-hidden bg-navy-deep/75 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Orb
          className="left-[6%] top-[10%] h-80 w-80 bg-green/25"
          drift={[50, 40]}
          reduce={reduce}
        />
        <Orb
          className="bottom-[8%] right-[6%] h-96 w-96 bg-gold/20"
          drift={[-40, -50]}
          reduce={reduce}
        />
        <Orb
          className="left-[40%] top-[40%] h-72 w-72 bg-sky/30"
          drift={[30, -30]}
          reduce={reduce}
        />
      </motion.div>

      <motion.button
        type="button"
        onClick={onClose}
        aria-label="Close dialog"
        className="absolute right-5 top-5 z-30 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-cream backdrop-blur-md transition duration-300 hover:rotate-90 hover:bg-white/20"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.6 }}
        transition={{ delay: 0.2 }}
      >
        <X className="h-5 w-5" />
      </motion.button>

      <div
        data-lenis-prevent
        className="absolute inset-0 overflow-y-auto overflow-x-hidden"
      >
        <div
          className="flex min-h-full items-center justify-center px-4 py-16"
          onPointerDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="relative w-full max-w-[24rem]">
            <motion.div
              className="relative z-10"
              style={{ transformPerspective: 1200 }}
              initial={{ opacity: 0, y: 220, rotateX: 35, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              exit={{
                opacity: 0,
                y: 160,
                rotateX: -20,
                scale: 0.85,
                transition: { duration: 0.25 },
              }}
              transition={{
                type: "spring",
                stiffness: 110,
                damping: 15,
                mass: 0.9,
              }}
            >
              <AccountCard reduce={reduce} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               the account card                             */
/* -------------------------------------------------------------------------- */

function AccountCard({ reduce }: { reduce: boolean }) {
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  // pointer-driven 3D tilt + moving glare
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 140, damping: 16, mass: 0.3 });
  const sy = useSpring(my, { stiffness: 140, damping: 16, mass: 0.3 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-16, 16]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [16, -16]);
  const gx = useTransform(sx, [-0.5, 0.5], [0, 100]);
  const gy = useTransform(sy, [-0.5, 0.5], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.35), rgba(255,255,255,0) 55%)`;

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  async function copyNumber() {
    try {
      await navigator.clipboard.writeText(ACCOUNT.number);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }

  // 1228957819 -> "1228 9578 19"
  const spacedNumber = ACCOUNT.number.replace(/(.{4})/g, "$1 ").trim();

  return (
    <motion.div
      className="relative"
      animate={reduce ? undefined : { y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* floor shadow that breathes with the float */}
      <motion.div
        aria-hidden
        className="absolute -bottom-7 left-1/2 h-6 w-3/4 -translate-x-1/2 rounded-full bg-navy-deep/80 blur-xl"
        animate={
          reduce
            ? undefined
            : { scaleX: [1, 0.85, 1], opacity: [0.7, 0.4, 0.7] }
        }
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        style={{ perspective: 1200 }}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="relative"
      >
        <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
          <motion.div
            role="button"
            tabIndex={0}
            data-autofocus
            aria-pressed={flipped}
            aria-label="Account card. Press to flip."
            onClick={() => setFlipped((f) => !f)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setFlipped((f) => !f);
              }
            }}
            className="relative aspect-[1.586/1] w-full cursor-pointer rounded-[1.75rem] outline-none focus-visible:ring-4 focus-visible:ring-green/40"
            style={{ transformStyle: "preserve-3d" }}
            initial={false}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={
              reduce
                ? { duration: 0 }
                : { type: "spring", stiffness: 110, damping: 15 }
            }
          >
            {/* ------------------------------- FRONT ------------------------------ */}
            <div
              className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-white/25"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                boxShadow: CARD_SHADOW,
              }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-sky/70 via-navy to-navy-deep" />
              <div className="absolute -left-10 -top-12 h-44 w-44 rounded-full bg-green/70 blur-3xl" />
              <div className="absolute -bottom-14 -right-8 h-48 w-48 rounded-full bg-gold/60 blur-3xl" />
              <div className="absolute right-10 top-1/3 h-24 w-24 rounded-full bg-coral/40 blur-2xl" />
              <div className="absolute -bottom-20 -right-16 h-56 w-56 rounded-full border-[18px] border-white/10" />
              <div className="absolute -bottom-8 right-6 h-28 w-28 rounded-full border-[10px] border-white/10" />

              {/* frosted glass sheet */}
              <div className="absolute inset-0 bg-linear-to-br from-white/25 via-white/5 to-white/15 backdrop-blur-xl" />
              <motion.div
                className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                style={{ backgroundImage: glare }}
              />
              {/* one-off shine sweep when the card lands */}
              <motion.div
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-white/30 blur-lg"
                initial={{ x: "0%" }}
                animate={{ x: "600%" }}
                transition={{ duration: 1.2, delay: 0.7, ease: "easeInOut" }}
              />

              <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/props/civicplaywhite.png"
                      alt=""
                      width={28}
                      height={28}
                      className="h-7 w-7"
                    />
                    <span className="font-display text-sm font-bold tracking-wide text-cream">
                      {ACCOUNT.bank}
                    </span>
                  </div>
                  <Contactless />
                </div>

                <div className="flex items-center gap-3">
                  <Chip />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cream/60">
                    Account
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p className="whitespace-nowrap font-display text-[1.15rem] font-semibold tabular-nums tracking-[0.08em] text-cream sm:text-[1.35rem]">
                    {spacedNumber.split("").map((ch, i) => (
                      <motion.span
                        key={i}
                        initial={{ y: 8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.18, delay: 0.5 + i * 0.03 }}
                        style={{ display: "inline-block" }}
                      >
                        {ch === " " ? "\u00A0" : ch}
                      </motion.span>
                    ))}
                  </p>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyNumber();
                    }}
                    aria-label="Copy account number"
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 text-cream backdrop-blur-md transition hover:bg-white/20"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {copied ? (
                        <motion.span
                          key="check"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                        >
                          <Check className="h-4 w-4 text-green" />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.5, opacity: 0 }}
                        >
                          <Copy className="h-4 w-4" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>

                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-cream/50">
                    Account name
                  </p>
                  <p className="truncate font-display text-sm font-semibold uppercase tracking-wider text-cream">
                    {ACCOUNT.name}
                  </p>
                </div>
              </div>
            </div>

            {/* -------------------------------- BACK ------------------------------ */}
            <div
              className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-white/25"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                boxShadow: CARD_SHADOW,
              }}
            >
              <div className="absolute inset-0 bg-linear-to-bl from-sky/70 via-navy to-navy-deep" />
              <div className="absolute -right-10 -top-12 h-44 w-44 rounded-full bg-gold/60 blur-3xl" />
              <div className="absolute -bottom-14 -left-8 h-48 w-48 rounded-full bg-green/60 blur-3xl" />
              <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full border-[18px] border-white/10" />

              <div className="absolute inset-0 bg-linear-to-bl from-white/25 via-white/5 to-white/15 backdrop-blur-xl" />
              <motion.div
                className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                style={{ backgroundImage: glare }}
              />

              <div className="relative z-10 flex h-full flex-col">
                <div className="mt-6 h-11 w-full bg-navy-deep/85" />
                <dl className="mx-5 mt-5 space-y-2.5 text-cream">
                  <div>
                    <dt className="text-[9px] uppercase tracking-[0.2em] text-cream/50">
                      Bank name
                    </dt>
                    <dd className="font-display text-sm font-semibold">
                      {ACCOUNT.bank}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[9px] uppercase tracking-[0.2em] text-cream/50">
                      Account name
                    </dt>
                    <dd className="font-display text-sm font-semibold">
                      {ACCOUNT.name}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[9px] uppercase tracking-[0.2em] text-cream/50">
                      Account number
                    </dt>
                    <dd className="font-display text-sm font-semibold tabular-nums tracking-wider">
                      {ACCOUNT.number}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                small pieces                                */
/* -------------------------------------------------------------------------- */

function Orb({
  className,
  drift,
  reduce,
}: {
  className: string;
  drift: [number, number];
  reduce: boolean;
}) {
  return (
    <motion.div
      aria-hidden
      className={cx(
        "pointer-events-none absolute rounded-full blur-3xl",
        className,
      )}
      animate={
        reduce ? undefined : { x: [0, drift[0], 0], y: [0, drift[1], 0] }
      }
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function Chip() {
  return (
    <div className="relative h-8 w-11 overflow-hidden rounded-md bg-linear-to-br from-gold via-[#fff0b0] to-gold-deep shadow-inner">
      <span className="absolute inset-x-0 top-1/2 h-px bg-navy/30" />
      <span className="absolute inset-y-0 left-1/3 w-px bg-navy/30" />
      <span className="absolute inset-y-0 right-1/3 w-px bg-navy/30" />
      <span className="absolute inset-[5px] rounded-sm border border-navy/25" />
    </div>
  );
}

function Contactless() {
  return (
    <svg
      aria-hidden
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="text-cream/80"
    >
      <path d="M8.5 8.5a5 5 0 0 1 0 7" />
      <path d="M12 6a8.5 8.5 0 0 1 0 12" />
      <path d="M15.5 3.5a12 12 0 0 1 0 17" />
    </svg>
  );
}
