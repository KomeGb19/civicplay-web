import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import type { AvatarId, LevelId } from "@/lib/constants";

const BestScoresSchema = new Schema(
  {
    basic: { type: Number, default: 0 },
    intermediary: { type: Number, default: 0 },
    advance: { type: Number, default: 0 },
  },
  { _id: false },
);

const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, sparse: true, unique: true },
    emailVerified: { type: Date },
    image: { type: String },
    passwordHash: { type: String },
    username: { type: String, sparse: true, unique: true, lowercase: true },
    avatarId: { type: String },
    role: {
      type: String,
      enum: ["user", "guest"],
      default: "user",
    },
    guestId: { type: String, sparse: true, unique: true },
    bestScores: { type: BestScoresSchema, default: () => ({}) },
  },
  { timestamps: true },
);

export type UserDocument = InferSchemaType<typeof UserSchema> & {
  _id: mongoose.Types.ObjectId;
  avatarId?: AvatarId;
  bestScores: Record<LevelId, number>;
};

export const User: Model<UserDocument> =
  mongoose.models.User ?? mongoose.model<UserDocument>("User", UserSchema);
