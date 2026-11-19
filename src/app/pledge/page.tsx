import type { Metadata } from "next";
import { PledgeShell } from "@/components/pledge/PledgeShell";
import { PledgeFlow } from "@/components/pledge/PledgeFlow";
import { MIN_PUBLIC_COUNT } from "@/lib/pledge-client";
import { getPledgeTotal } from "@/lib/pledge-stats";

export const metadata: Metadata = {
  title: "Take the Pledge: Vote Peacefully in 2027 | Civic Play",
  description:
    "Three promises for the 2027 elections: vote your conscience, keep the peace, and protect the process. Sign your pledge and share it.",
  openGraph: {
    title: "I took the Civic Play pledge. Will you?",
    description:
      "Vote your conscience. Keep the peace. Protect the process. Join fellow Nigerians.",
    type: "website",
    locale: "en_NG",
  },
};

export const revalidate = 60; // seconds

export default async function PledgePage() {
  const total = await getPledgeTotal();
  return (
    <PledgeShell>
      <PledgeFlow
        pledgeCount={
          total !== null && total >= MIN_PUBLIC_COUNT ? total : undefined
        }
      />
    </PledgeShell>
  );
}