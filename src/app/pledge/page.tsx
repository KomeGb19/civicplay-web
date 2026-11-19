import type { Metadata } from "next";
import { PledgeShell } from "@/components/pledge/PledgeShell";
import { PledgeFlow } from "@/components/pledge/PledgeFlow";

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

export default function PledgePage() {
  return (
    <PledgeShell>
      {/* Pass a real number here once pledges are counted server-side:
          <PledgeFlow pledgeCount={12840} /> */}
      <PledgeFlow />
    </PledgeShell>
  );
}
