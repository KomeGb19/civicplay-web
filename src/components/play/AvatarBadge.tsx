import { AVATARS, type AvatarId } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Style, Avatar } from "@dicebear/core";
import critters from "@dicebear/styles/critters.json";

// Create the style once
const style = new Style(critters);
// Cache for avatar SVG strings to avoid regenerating on every render
const avatarSvgCache = new Map<string, string>();
// Cache for object URLs to avoid creating new blobs/urls for the same SVG
const avatarUrlCache = new Map<string, string>();

export function AvatarBadge({
  avatarId,
  size = "md",
  className,
}: {
  avatarId: AvatarId | string | null | undefined;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const avatar = AVATARS.find((a) => a.id === avatarId) ?? AVATARS[0];
  const sizes = {
    sm: "size-9 text-lg",
    md: "size-12 text-2xl",
    lg: "size-16 text-3xl",
    xl: "size-24 text-5xl",
  };

  // Get or generate SVG string for this avatar id
  let svg = avatarSvgCache.get(avatar.id);
  if (!svg) {
    const avatarInstance = new Avatar(style, {
      seed: avatar.id,
      tags: ["animation"],
      animationVariant: ["medium", "medium"],
    });
    svg = avatarInstance.toString();
    avatarSvgCache.set(avatar.id, svg);
  }

  // Get or create object URL for this SVG
  let url = avatarUrlCache.get(svg);
  if (!url) {
    try {
      const blob = new Blob([svg], { type: "image/svg+xml" });
      url = URL.createObjectURL(blob);
      avatarUrlCache.set(svg, url);
    } catch (e) {
      // Fallback to data URL if blob fails (shouldn't happen in modern browsers)
      url = `data:image/svg+xml;base64,${btoa(svg)}`;
    }
  }

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full shadow-lg ring-2 ring-cream/20",
        sizes[size],
        className,
      )}
      aria-label={avatar.label}
    >
      <img
        src={url}
        alt={avatar.label}
        className="w-full h-full object-contain rounded-full"
      />
    </div>
  );
}
