export const LEVELS = ["basic", "intermediary", "advance"] as const;
export type LevelId = (typeof LEVELS)[number];

export const LEVEL_META: Record<
  LevelId,
  { label: string; order: number; unlocks: LevelId | null }
> = {
  basic: { label: "Basic", order: 0, unlocks: "intermediary" },
  intermediary: { label: "Intermediary", order: 1, unlocks: "advance" },
  advance: { label: "Advance", order: 2, unlocks: null },
};

export const QUESTIONS_PER_ROUND = 15;
export const POINTS_PER_CORRECT = 10;
export const MAX_SCORE = QUESTIONS_PER_ROUND * POINTS_PER_CORRECT;
export const TIMER_SECONDS = 15;
export const UNLOCK_THRESHOLD = 90;

export const AVATARS = [
  { id: "eagle", label: "Eagle", emoji: "🦅" },
  { id: "lion", label: "Lion", emoji: "🦁" },
  { id: "baobab", label: "Baobab", emoji: "🌳" },
  { id: "drum", label: "Talking Drum", emoji: "🥁" },
  { id: "star", label: "Green Star", emoji: "⭐" },
  { id: "torch", label: "Torch", emoji: "🔥" },
  { id: "book", label: "Civic Book", emoji: "📘" },
  { id: "ballot", label: "Ballot", emoji: "🗳️" },
  { id: "shield", label: "Shield", emoji: "🛡️" },
  { id: "sun", label: "Rising Sun", emoji: "☀️" },
  { id: "wave", label: "Niger Wave", emoji: "🌊" },
  { id: "crown", label: "Citizen Crown", emoji: "👑" },
] as const;

export type AvatarId = (typeof AVATARS)[number]["id"];

export function isLevelId(value: string): value is LevelId {
  return (LEVELS as readonly string[]).includes(value);
}

export function isAvatarId(value: string): value is AvatarId {
  return AVATARS.some((a) => a.id === value);
}
