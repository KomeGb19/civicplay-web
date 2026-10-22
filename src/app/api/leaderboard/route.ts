import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { isLevelId, type LevelId } from "@/lib/constants";
import { Score } from "@/models/Score";

export const dynamic = "force-dynamic";

// Scores saved before timeTaken existed get this sentinel so they rank
// behind any timed score with the same points.
const NO_TIME = 999999;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const levelParam = searchParams.get("level") ?? "basic";
  if (!isLevelId(levelParam)) {
    return NextResponse.json({ error: "Invalid level" }, { status: 400 });
  }
  const level = levelParam as LevelId;

  await connectDb();

  const ranking = await Score.aggregate([
    { $match: { level } },
    {
      $addFields: {
        timeTaken: { $ifNull: ["$timeTaken", NO_TIME] },
        // One identity per player: userId when present, else username
        playerKey: { $ifNull: [{ $toString: "$userId" }, "$username"] },
      },
    },
    // Each player's best attempt: highest score, then fastest, then earliest
    { $sort: { score: -1, timeTaken: 1, createdAt: 1 } },
    {
      $group: {
        _id: "$playerKey",
        userId: { $first: "$userId" },
        username: { $first: "$username" },
        avatarId: { $first: "$avatarId" },
        score: { $first: "$score" },
        timeTaken: { $first: "$timeTaken" },
        createdAt: { $first: "$createdAt" },
      },
    },
    // Final ranking across all players
    { $sort: { score: -1, timeTaken: 1, createdAt: 1 } },
    // Use the player's CURRENT username/avatar when the user still exists
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $project: {
        _id: 0,
        username: {
          $ifNull: [{ $arrayElemAt: ["$user.username", 0] }, "$username"],
        },
        avatarId: {
          $ifNull: [{ $arrayElemAt: ["$user.avatarId", 0] }, "$avatarId"],
        },
        score: 1,
        timeTaken: {
          $cond: [{ $eq: ["$timeTaken", NO_TIME] }, null, "$timeTaken"],
        },
      },
    },
  ]);

  return NextResponse.json({ level, entries: ranking });
}