import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { isLevelId, type LevelId } from "@/lib/constants";
import { Score } from "@/models/Score";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const levelParam = searchParams.get("level") ?? "basic";
  if (!isLevelId(levelParam)) {
    return NextResponse.json({ error: "Invalid level" }, { status: 400 });
  }
  const level = levelParam as LevelId;

  await connectDb();

  const top = await Score.aggregate([
    { $match: { level } },
    { $sort: { score: -1, createdAt: 1 } },
    {
      $group: {
        _id: "$username",
        score: { $first: "$score" },
        avatarId: { $first: "$avatarId" },
        createdAt: { $first: "$createdAt" },
      },
    },
    { $sort: { score: -1, createdAt: 1 } },
    { $limit: 10 },
    {
      $project: {
        _id: 0,
        username: "$_id",
        score: 1,
        avatarId: 1,
      },
    },
  ]);

  return NextResponse.json({ level, entries: top });
}
