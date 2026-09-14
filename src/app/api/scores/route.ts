import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import {
  isAvatarId,
  isLevelId,
  MAX_SCORE,
  type LevelId,
} from "@/lib/constants";
import {
  didUnlockNext,
  isLevelUnlocked,
  scoreAnswers,
  type PlayerAnswer,
  type QuizQuestion,
} from "@/lib/quiz-engine";
import { Question } from "@/models/Question";
import { Score } from "@/models/Score";
import { User } from "@/models/User";

const submitSchema = z.object({
  level: z.string(),
  answers: z.array(
    z.object({
      questionId: z.string(),
      selectedIndex: z.number().int().min(0).max(3).nullable(),
      timedOut: z.boolean(),
    }),
  ),
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = submitSchema.safeParse(body);
  if (!parsed.success || !isLevelId(parsed.data.level)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const level = parsed.data.level as LevelId;
  await connectDb();

  const user = await User.findById(session.user.id);
  if (!user?.username || !user.avatarId || !isAvatarId(user.avatarId)) {
    return NextResponse.json(
      { error: "Complete onboarding first" },
      { status: 403 },
    );
  }

  const bestScores = {
    basic: user.bestScores?.basic ?? 0,
    intermediary: user.bestScores?.intermediary ?? 0,
    advance: user.bestScores?.advance ?? 0,
  };

  if (!isLevelUnlocked(level, bestScores)) {
    return NextResponse.json({ error: "Level locked" }, { status: 403 });
  }

  const ids = parsed.data.answers.map((a) => a.questionId);
  const docs = await Question.find({
    _id: { $in: ids },
    level,
  }).lean();

  const questions: QuizQuestion[] = docs.map((d) => ({
    id: d._id.toString(),
    text: d.text,
    options: d.options as string[],
    correctIndex: d.correctIndex,
    explanation: d.explanation,
  }));

  const answers: PlayerAnswer[] = parsed.data.answers;
  const { score, correctCount, streakMax } = scoreAnswers(questions, answers);
  const clamped = Math.min(MAX_SCORE, Math.max(0, score));

  const prevBest = bestScores[level] ?? 0;
  const newBest = Math.max(prevBest, clamped);
  user.bestScores = {
    ...bestScores,
    [level]: newBest,
  };
  await user.save();

  await Score.create({
    userId: user._id,
    guestId: user.guestId ?? undefined,
    username: user.username,
    avatarId: user.avatarId,
    level,
    score: clamped,
  });

  const unlocked = didUnlockNext(level, newBest);

  return NextResponse.json({
    score: clamped,
    correctCount,
    streakMax,
    bestScore: newBest,
    isNewBest: clamped > prevBest,
    unlockedLevel: unlocked,
    bestScores: user.bestScores,
  });
}
