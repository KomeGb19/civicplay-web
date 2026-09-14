import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { isLevelId } from "@/lib/constants";
import {
  isLevelUnlocked,
  pickRoundQuestions,
} from "@/lib/quiz-engine";
import { Question } from "@/models/Question";
import { seedQuestions } from "@/lib/questions/seed";
import { User } from "@/models/User";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const level = searchParams.get("level") ?? "";
  if (!isLevelId(level)) {
    return NextResponse.json({ error: "Invalid level" }, { status: 400 });
  }

  await connectDb();

  const user = await User.findById(session.user.id).lean();
  if (!user?.username || !user.avatarId) {
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

  let count = await Question.countDocuments({ level });
  if (count === 0) {
    await seedQuestions();
  }

  const docs = await Question.find({ level }).lean();
  const bank = docs.map((d) => ({
    id: d._id.toString(),
    text: d.text,
    options: d.options as string[],
    correctIndex: d.correctIndex,
    explanation: d.explanation,
  }));

  const round = pickRoundQuestions(bank);

  return NextResponse.json({
    level,
    questions: round,
  });
}
