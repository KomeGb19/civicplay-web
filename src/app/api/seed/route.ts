import { NextResponse } from "next/server";
import { seedQuestions } from "@/lib/questions/seed";

export async function POST(request: Request) {
  const secret = request.headers.get("x-seed-secret");
  const expected = process.env.SEED_SECRET ?? process.env.AUTH_SECRET;

  if (!expected || secret !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await seedQuestions();
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Seed failed", detail: String(error) },
      { status: 500 },
    );
  }
}
