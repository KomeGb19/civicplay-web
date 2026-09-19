import { notFound } from "next/navigation";
import { QuizGame } from "@/components/play/QuizGame";
import { isLevelId } from "@/lib/constants";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  if (!isLevelId(level)) notFound();
  return <QuizGame level={level} />;
}
