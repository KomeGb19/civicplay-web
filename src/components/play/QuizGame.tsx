"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Check, X, Home, Pause, Play } from "lucide-react";
import { PlayShell } from "@/components/play/PlayShell";
import { TimerRing } from "@/components/play/TimerRing";
import { ScoreTicker } from "@/components/play/ScoreTicker";
import { fireConfetti } from "@/components/play/ConfettiBurst";
import {
  LEVEL_META,
  POINTS_PER_CORRECT,
  TIMER_SECONDS,
  type LevelId,
} from "@/lib/constants";
import type { PlayerAnswer, QuizQuestion } from "@/lib/quiz-engine";
import { cn } from "@/lib/utils";

type Phase = "loading" | "answering" | "revealed" | "submitting" | "error";

export function QuizGame({ level }: { level: LevelId }) {
  const router = useRouter();
  const { status } = useSession();
  const reduceMotion = useReducedMotion();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(TIMER_SECONDS);
  const [phase, setPhase] = useState<Phase>("loading");
  const [error, setError] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [shake, setShake] = useState(false);
  const answersRef = useRef<PlayerAnswer[]>([]);
  const lockedRef = useRef(false);
  const selectedRef = useRef<number | null>(null);

  // Sound effects
  const shuffleSound = useRef<HTMLAudioElement | null>(null);
  const pointSound = useRef<HTMLAudioElement | null>(null);
  const failSound = useRef<HTMLAudioElement | null>(null);
  const timeoutSound = useRef<HTMLAudioElement | null>(null);
  const levelCompleteSound = useRef<HTMLAudioElement | null>(null);

  // Initialize sound effects
  useEffect(() => {
    shuffleSound.current = new Audio("/sounds/carddeckshuffle.wav");
    pointSound.current = new Audio("/sounds/pointgained.wav");
    failSound.current = new Audio("/sounds/failing.wav");
    timeoutSound.current = new Audio("/sounds/noanswer.wav");
    levelCompleteSound.current = new Audio("/sounds/levelcompleted.wav");

    const sounds = [
      shuffleSound,
      pointSound,
      failSound,
      timeoutSound,
      levelCompleteSound,
    ];
    sounds.forEach((soundRef) => {
      if (soundRef.current) {
        soundRef.current.preload = "auto";
      }
    });

    return () => {
      sounds.forEach((soundRef) => {
        if (soundRef.current) {
          soundRef.current.pause();
          soundRef.current = null;
        }
      });
    };
  }, []);

  const current = questions[index];
  const urgent = secondsLeft <= 5 && phase === "answering" && !isPaused;

  const finishRound = useCallback(
    async (finalAnswers: PlayerAnswer[]) => {
      setPhase("submitting");

      // Play level complete sound
      const sound = levelCompleteSound.current;
      const soundPromise = sound
        ? new Promise<void>((resolve) => {
            const onEnded = () => {
              sound.removeEventListener("ended", onEnded);
              resolve();
            };
            sound.addEventListener("ended", onEnded);
            sound.play().catch((e) => {
              console.log("Level complete sound play failed:", e);
              resolve(); // resolve anyway to avoid hanging
            });
          })
        : Promise.resolve();

      try {
        const res = await fetch("/api/scores", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ level, answers: finalAnswers }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Could not submit score");
          setPhase("error");
          return;
        }
        sessionStorage.setItem(
          "civicplay_last_result",
          JSON.stringify({ level, ...data }),
        );
        // Wait for sound to finish before navigating
        await soundPromise;
        router.push("/play/results");
      } catch {
        setError("Could not submit score");
        setPhase("error");
      }
    },
    [level, router],
  );

  const lockAnswer = useCallback(
    (selectedIndex: number | null, timedOut: boolean) => {
      if (!current || lockedRef.current) return;
      lockedRef.current = true;

      const correct =
        !timedOut &&
        selectedIndex !== null &&
        selectedIndex === current.correctIndex;

      if (correct) {
        setScore((s) => s + POINTS_PER_CORRECT);
        if (pointSound.current) {
          pointSound.current
            .play()
            .catch((e) => console.log("Point sound play failed:", e));
        }
        setStreak((s) => {
          const next = s + 1;
          if (next >= 2 && !reduceMotion) fireConfetti("hit");
          return next;
        });
      } else {
        setStreak(0);
        if (failSound.current) {
          failSound.current
            .play()
            .catch((e) => console.log("Fail sound play failed:", e));
        }
        if (!reduceMotion) {
          setShake(true);
          setTimeout(() => setShake(false), 400);
        }
      }

      const entry: PlayerAnswer = {
        questionId: current.id,
        selectedIndex,
        timedOut,
      };
      answersRef.current = [...answersRef.current, entry];
      setSelected(selectedIndex);
      selectedRef.current = selectedIndex;
      setPhase("revealed");
    },
    [current, reduceMotion],
  );

  // Countdown: only ticks while answering and not paused.
  // It does NOT depend on secondsLeft, so it never restarts itself
  // and never touches the player's selection.
  useEffect(() => {
    if (phase !== "answering" || isPaused) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [phase, isPaused, index]);

  // Timeout: when the clock hits zero during an active question
  useEffect(() => {
    if (
      phase === "answering" &&
      !isPaused &&
      secondsLeft === 0 &&
      !lockedRef.current
    ) {
      if (timeoutSound.current) {
        timeoutSound.current
          .play()
          .catch((e) => console.log("Timeout sound play failed:", e));
      }
      // Pass null so the reveal shows "Time's up" even if an option was
      // picked but never confirmed.
      lockAnswer(null, true);
    }
  }, [secondsLeft, phase, isPaused, lockAnswer]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // Load questions
  useEffect(() => {
    let cancelled = false;
    async function load() {
      setPhase("loading");
      answersRef.current = [];
      try {
        const res = await fetch(`/api/questions?level=${level}`);
        const data = await res.json();
        if (!res.ok) {
          if (!cancelled) {
            setError(data.error ?? "Failed to load questions");
            setPhase("error");
          }
          return;
        }
        if (!cancelled) {
          setQuestions(data.questions);
          setIndex(0);
          setScore(0);
          setStreak(0);
          setSelected(null);
          selectedRef.current = null;
          lockedRef.current = false;
          setIsPaused(false);
          setSecondsLeft(TIMER_SECONDS);
          if (shuffleSound.current) {
            shuffleSound.current
              .play()
              .catch((e) => console.log("Shuffle sound play failed:", e));
          }
          setPhase("answering");
        }
      } catch {
        if (!cancelled) {
          setError("Failed to load questions");
          setPhase("error");
        }
      }
    }
    if (status === "authenticated") load();
    return () => {
      cancelled = true;
    };
  }, [level, status]);

  function handleNext() {
    if (index + 1 >= questions.length) {
      void finishRound(answersRef.current);
      return;
    }
    // Reset everything for the next question in the same batch as the phase
    // change, so the timeout effect never sees a stale 0.
    lockedRef.current = false;
    selectedRef.current = null;
    setSelected(null);
    setSecondsLeft(TIMER_SECONDS);
    setIndex((i) => i + 1);
    setPhase("answering");
  }

  if (phase === "loading" || status === "loading") {
    return (
      <PlayShell title={LEVEL_META[level].label}>
        <div className="loader mt-40 mx-auto" />
      </PlayShell>
    );
  }

  if (phase === "error" || !current) {
    return (
      <PlayShell title={LEVEL_META[level].label}>
        <p className="text-coral">{error ?? "Something went wrong"}</p>
        <button
          type="button"
          onClick={() => router.push("/play")}
          className="mt-4 rounded-xl bg-green px-4 py-2 font-semibold text-navy-deep"
        >
          Back to hub
        </button>
      </PlayShell>
    );
  }

  const isCorrect =
    selected !== null &&
    selected === current.correctIndex &&
    phase === "revealed";

  return (
    <PlayShell
      title={`${LEVEL_META[level].label} · Q${index + 1}/${questions.length}`}
    >
      <motion.div
        animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-2xl"
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <TimerRing secondsLeft={secondsLeft} urgent={urgent} />

          <div className="">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => router.push("/play")}
                className="flex hover bg-green/10 hover:bg-green/40 rounded-full p-2 gap-2"
              >
                <Home />
              </button>
              <button
                type="button"
                onClick={() => setIsPaused((p) => !p)}
                disabled={phase !== "answering"}
                className="flex hover bg-green/10 hover:bg-green/40 rounded-full p-2 gap-2 disabled:opacity-40"
              >
                {isPaused ? <Play size={20} /> : <Pause size={20} />}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <AnimatePresence>
              {streak >= 2 ? (
                <motion.div
                  key={streak}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-full bg-coral/20 px-3 py-1 text-sm font-bold text-coral"
                >
                  🔥{streak}x streak
                </motion.div>
              ) : null}
            </AnimatePresence>
            <ScoreTicker value={score} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <h2 className="font-display text-xl font-bold leading-snug sm:text-2xl">
              {current.text}
            </h2>

            <div className="mt-6 space-y-3">
              {current.options.map((option, i) => {
                const revealed = phase === "revealed";
                const isSel = selected === i;
                const isRight = i === current.correctIndex;
                return (
                  <motion.button
                    key={`${current.id}-${i}`}
                    type="button"
                    disabled={revealed || phase === "submitting" || isPaused}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileTap={
                      revealed || isPaused ? undefined : { scale: 0.98 }
                    }
                    onClick={() => {
                      if (isPaused || phase !== "answering") return;
                      setSelected(i);
                      selectedRef.current = i;
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition",
                      !revealed &&
                        (isSel
                          ? "border-green bg-green/15"
                          : "border-cream/15 bg-navy-deep/50 hover:border-cream/30"),
                      revealed && isRight && "border-green bg-green/20",
                      revealed &&
                        isSel &&
                        !isRight &&
                        "border-coral bg-coral/15",
                      revealed && !isRight && !isSel && "opacity-50",
                    )}
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-cream/10 font-display text-sm">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1 text-sm sm:text-base">
                      {option}
                    </span>
                    {revealed && isRight ? (
                      <Check className="size-5 text-green" />
                    ) : null}
                    {revealed && isSel && !isRight ? (
                      <X className="size-5 text-coral" />
                    ) : null}
                  </motion.button>
                );
              })}
            </div>

            {phase === "answering" ? (
              <button
                type="button"
                disabled={selected === null || isPaused}
                onClick={() => lockAnswer(selected, false)}
                className="mt-6 w-full rounded-xl bg-green py-3 font-display text-lg font-bold text-navy-deep hover:bg-green-bright disabled:opacity-40"
              >
                Confirm answer
              </button>
            ) : null}

            <AnimatePresence>
              {phase === "revealed" ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 rounded-2xl border border-cream/15 bg-navy-deep/80 p-4"
                >
                  <p
                    className={cn(
                      "font-display text-lg font-bold",
                      isCorrect ? "text-green" : "text-coral",
                    )}
                  >
                    {isCorrect
                      ? `Correct! +${POINTS_PER_CORRECT}`
                      : selected === null
                        ? "Time’s up"
                        : "Not quite"}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-cream/85">
                    {current.explanation}
                  </p>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="mt-4 w-full rounded-xl bg-gold py-3 font-display font-bold text-navy-deep hover:bg-gold-deep"
                  >
                    {index + 1 >= questions.length
                      ? "See results"
                      : "Next question"}
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </PlayShell>
  );
}
