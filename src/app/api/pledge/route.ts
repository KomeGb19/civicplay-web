import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDb } from "@/lib/db";
import { NIGERIAN_STATES } from "@/lib/pledge";
import { getPledgeStats, hashDevice } from "@/lib/pledge-stats";
import { PledgeDevice } from "@/models/PledgeDevice";
import { PledgeStats } from "@/models/PledgeStats";

const BodySchema = z.object({
  deviceId: z.string().regex(/^[A-Za-z0-9-]{16,64}$/),
  state: z.union([z.enum(NIGERIAN_STATES), z.literal("")]).optional(),
  // Honeypot: real users never fill this in
  website: z.string().max(0).optional(),
});

// Light per-instance limiter. For real protection, add Vercel's WAF rate limit.
const hits = new Map<string, { count: number; reset: number }>();
function allowed(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + 60_000 });
    return true;
  }
  entry.count += 1;
  return entry.count <= 10;
}

export async function GET() {
  try {
    const stats = await getPledgeStats();
    return NextResponse.json(stats, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("pledge GET failed", error);
    return NextResponse.json({ error: "Unavailable" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!allowed(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = BodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const secret = process.env.PLEDGE_HASH_SECRET;
  if (!secret) {
    console.error("PLEDGE_HASH_SECRET is not set");
    return NextResponse.json({ error: "Unavailable" }, { status: 500 });
  }

  try {
    await connectDb();
    await PledgeDevice.init(); // make sure the unique index exists

    const hash = hashDevice(parsed.data.deviceId, secret);
    try {
      await PledgeDevice.create({ hash });
    } catch (error) {
      if ((error as { code?: number }).code === 11000) {
        // This device was already counted: return the total, don't add again
        const { total } = await getPledgeStats();
        return NextResponse.json({ total, counted: false });
      }
      throw error;
    }

    const state = parsed.data.state;
    const doc = await PledgeStats.findOneAndUpdate(
      { _id: "pledges" },
      { $inc: { total: 1, ...(state ? { [`byState.${state}`]: 1 } : {}) } },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    ).lean();

    return NextResponse.json({ total: doc?.total ?? 0, counted: true });
  } catch (error) {
    console.error("pledge POST failed", error);
    return NextResponse.json({ error: "Could not save pledge" }, { status: 500 });
  }
}