import { AVATARS, type AvatarId } from "@/lib/constants";
import { cn } from "@/lib/utils";

const AVATAR_COLORS: Record<AvatarId, string> = {
  eagle: "from-sky-500 to-navy",
  lion: "from-gold to-gold-deep",
  baobab: "from-green to-navy",
  drum: "from-coral to-gold",
  star: "from-green-bright to-green",
  torch: "from-coral to-gold-deep",
  book: "from-sky to-navy",
  ballot: "from-green to-sky",
  shield: "from-gold to-navy",
  sun: "from-gold to-coral",
  wave: "from-sky to-green",
  crown: "from-gold-deep to-green",
};

export function AvatarBadge({
  avatarId,
  size = "md",
  className,
}: {
  avatarId: AvatarId | string | null | undefined;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const avatar =
    AVATARS.find((a) => a.id === avatarId) ?? AVATARS[0];
  const sizes = {
    sm: "size-9 text-lg",
    md: "size-12 text-2xl",
    lg: "size-16 text-3xl",
    xl: "size-24 text-5xl",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-gradient-to-br shadow-lg ring-2 ring-cream/20",
        AVATAR_COLORS[avatar.id],
        sizes[size],
        className,
      )}
      aria-label={avatar.label}
    >
      <span aria-hidden>{avatar.emoji}</span>
    </div>
  );
}
