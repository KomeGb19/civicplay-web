import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { isAvatarId } from "@/lib/constants";
import { User } from "@/models/User";

const profileSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/, "Letters, numbers, underscore only"),
  avatarId: z.string(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDb();
  const user = await User.findById(session.user.id).lean();
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: user._id.toString(),
    username: user.username ?? null,
    avatarId: user.avatarId ?? null,
    role: user.role,
    bestScores: user.bestScores ?? {
      basic: 0,
      intermediary: 0,
      advance: 0,
    },
    needsOnboarding: !user.username || !user.avatarId,
  });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = profileSchema.safeParse(body);
  if (!parsed.success || !isAvatarId(parsed.data.avatarId)) {
    return NextResponse.json({ error: "Invalid profile data" }, { status: 400 });
  }

  const username = parsed.data.username.toLowerCase();
  await connectDb();

  const taken = await User.findOne({
    username,
    _id: { $ne: session.user.id },
  });
  if (taken) {
    return NextResponse.json(
      { error: "Username already taken" },
      { status: 409 },
    );
  }

  const user = await User.findByIdAndUpdate(
    session.user.id,
    {
      $set: {
        username,
        avatarId: parsed.data.avatarId,
        name: username,
      },
    },
    { new: true },
  );

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    username: user.username,
    avatarId: user.avatarId,
  });
}
