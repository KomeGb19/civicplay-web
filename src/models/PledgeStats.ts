import mongoose, { Schema, type Model } from "mongoose";

export interface PledgeStatsDoc {
  _id: string;
  total: number;
  byState: Map<string, number>;
}

/** One document (_id "pledges") holding the running totals. */
const PledgeStatsSchema = new Schema<PledgeStatsDoc>(
  {
    _id: { type: String, required: true },
    total: { type: Number, default: 0, min: 0 },
    byState: { type: Map, of: Number, default: {} },
  },
  { versionKey: false },
);

export const PledgeStats: Model<PledgeStatsDoc> =
  (mongoose.models.PledgeStats as Model<PledgeStatsDoc> | undefined) ??
  mongoose.model<PledgeStatsDoc>("PledgeStats", PledgeStatsSchema);