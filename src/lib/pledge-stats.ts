import { createHmac } from "node:crypto";
import { connectDb } from "@/lib/db";
import { PledgeStats } from "@/models/PledgeStats";

export function hashDevice(deviceId: string, secret: string) {
  return createHmac("sha256", secret).update(deviceId).digest("hex");
}

export async function getPledgeStats() {
  await connectDb();
  const doc = await PledgeStats.findById("pledges").lean();
  return {
    total: doc?.total ?? 0,
    byState: Object.fromEntries(
      doc?.byState instanceof Map ? doc.byState : Object.entries(doc?.byState ?? {}),
    ) as Record<string, number>,
  };
}

/** Total for server components. Returns null if the database is unreachable. */
export async function getPledgeTotal(): Promise<number | null> {
  try {
    return (await getPledgeStats()).total;
  } catch (error) {
    console.error("getPledgeTotal failed", error);
    return null;
  }
}