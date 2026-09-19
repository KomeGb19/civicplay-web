import {
  POINTS_PER_CORRECT,
  QUESTIONS_PER_ROUND,
  UNLOCK_THRESHOLD,
  type LevelId,
} from "@/lib/constants";

export type QuizQuestion = {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type PlayerAnswer = {
  questionId: string;
  selectedIndex: number | null;
  timedOut: boolean;
};

export function shuffleInPlace<T>(items: T[]): T[] {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

export function pickRoundQuestions(
  bank: QuizQuestion[],
  count = QUESTIONS_PER_ROUND,
): QuizQuestion[] {
  return shuffleInPlace([...bank]).slice(0, Math.min(count, bank.length));
}

export function scoreAnswers(
  questions: QuizQuestion[],
  answers: PlayerAnswer[],
): { score: number; correctCount: number; streakMax: number } {
  const byId = new Map(questions.map((q) => [q.id, q]));
  let score = 0;
  let correctCount = 0;
  let streak = 0;
  let streakMax = 0;

  for (const answer of answers) {
    const q = byId.get(answer.questionId);
    if (!q) continue;
    const correct =
      !answer.timedOut &&
      answer.selectedIndex !== null &&
      answer.selectedIndex === q.correctIndex;
    if (correct) {
      score += POINTS_PER_CORRECT;
      correctCount += 1;
      streak += 1;
      streakMax = Math.max(streakMax, streak);
    } else {
      streak = 0;
    }
  }

  return { score, correctCount, streakMax };
}

export function isLevelUnlocked(
  level: LevelId,
  bestScores: Partial<Record<LevelId, number>>,
): boolean {
  if (level === "basic") return true;
  if (level === "intermediary") {
    return (bestScores.basic ?? 0) >= UNLOCK_THRESHOLD;
  }
  return (bestScores.intermediary ?? 0) >= UNLOCK_THRESHOLD;
}

export function didUnlockNext(
  level: LevelId,
  score: number,
): LevelId | null {
  if (score < UNLOCK_THRESHOLD) return null;
  if (level === "basic") return "intermediary";
  if (level === "intermediary") return "advance";
  return null;
}

export function publicQuestion(q: QuizQuestion) {
  return {
    id: q.id,
    text: q.text,
    options: q.options,
  };
}
