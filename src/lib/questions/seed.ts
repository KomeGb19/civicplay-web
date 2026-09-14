import banks from "@/lib/questions/banks.json";
import type { LevelId } from "@/lib/constants";
import { connectDb } from "@/lib/db";
import { Question } from "@/models/Question";

export async function seedQuestions() {
  await connectDb();

  const levels = Object.keys(banks) as LevelId[];
  let inserted = 0;

  for (const level of levels) {
    const existing = await Question.countDocuments({ level });
    if (existing > 0) continue;

    const docs = banks[level].map((q) => ({
      level,
      text: q.text,
      options: q.options,
      correctIndex: q.correctIndex,
      explanation: q.explanation,
    }));

    await Question.insertMany(docs);
    inserted += docs.length;
  }

  return { inserted, total: await Question.countDocuments() };
}
