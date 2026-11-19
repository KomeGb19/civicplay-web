import mongoose, { Schema, type Model } from "mongoose";

export interface PledgeDeviceDoc {
  hash: string;
  createdAt: Date;
}

/**
 * One row per device that has been counted. Only a keyed hash is stored,
 * never the raw device id, so it can't be traced back to a person.
 */
const PledgeDeviceSchema = new Schema<PledgeDeviceDoc>(
  {
    hash: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
);

export const PledgeDevice: Model<PledgeDeviceDoc> =
  (mongoose.models.PledgeDevice as Model<PledgeDeviceDoc> | undefined) ??
  mongoose.model<PledgeDeviceDoc>("PledgeDevice", PledgeDeviceSchema);