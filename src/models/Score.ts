import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import type { AvatarId, LevelId } from "@/lib/constants";

const ScoreSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    guestId: { type: String, index: true },
    username: { type: String, required: true },
    avatarId: { type: String, required: true },
    level: {
      type: String,
      enum: ["basic", "intermediary", "advance"],
      required: true,
      index: true,
    },
    score: { type: Number, required: true, min: 0, max: 150 },
  },
  { timestamps: true },
);

ScoreSchema.index({ level: 1, score: -1, createdAt: 1 });

export type ScoreDocument = InferSchemaType<typeof ScoreSchema> & {
  _id: mongoose.Types.ObjectId;
  level: LevelId;
  avatarId: AvatarId;
};

export const Score: Model<ScoreDocument> =
  mongoose.models.Score ?? mongoose.model<ScoreDocument>("Score", ScoreSchema);
