import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import type { LevelId } from "@/lib/constants";

const QuestionSchema = new Schema(
  {
    level: {
      type: String,
      enum: ["basic", "intermediary", "advance"],
      required: true,
      index: true,
    },
    text: { type: String, required: true },
    options: {
      type: [String],
      validate: {
        validator: (v: string[]) => v.length === 4,
        message: "Exactly 4 options required",
      },
      required: true,
    },
    correctIndex: { type: Number, required: true, min: 0, max: 3 },
    explanation: { type: String, required: true },
  },
  { timestamps: true },
);

export type QuestionDocument = InferSchemaType<typeof QuestionSchema> & {
  _id: mongoose.Types.ObjectId;
  level: LevelId;
};

export const Question: Model<QuestionDocument> =
  mongoose.models.Question ??
  mongoose.model<QuestionDocument>("Question", QuestionSchema);
