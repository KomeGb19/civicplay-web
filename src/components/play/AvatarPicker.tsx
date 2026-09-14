"use client";

import { motion } from "motion/react";
import { AVATARS, type AvatarId } from "@/lib/constants";
import { AvatarBadge } from "@/components/play/AvatarBadge";
import { cn } from "@/lib/utils";

export function AvatarPicker({
  value,
  onChange,
}: {
  value: AvatarId | null;
  onChange: (id: AvatarId) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4">
      {AVATARS.map((avatar, index) => {
        const selected = value === avatar.id;
        return (
          <motion.button
            key={avatar.id}
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => onChange(avatar.id)}
            className={cn(
              "flex flex-col items-center gap-2 rounded-2xl border p-3 transition",
              selected
                ? "border-gold bg-gold/15 shadow-[0_0_24px_rgba(245,197,66,0.35)]"
                : "border-cream/15 bg-navy-deep/40 hover:border-cream/30",
            )}
          >
            <motion.div
              animate={selected ? { scale: [1, 1.12, 1] } : { scale: 1 }}
              transition={{ duration: 0.35 }}
            >
              <AvatarBadge avatarId={avatar.id} size="lg" />
            </motion.div>
            <span className="text-xs font-medium text-cream/80">
              {avatar.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
