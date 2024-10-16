import { Schema, model } from "mongoose";
import { IUser } from "../interface";

const userSchema = new Schema<IUser>(
  {
    baseName: { type: String, required: true },
    discordUsername: { type: String, required: true },
    telegramUsername: { type: String, required: true },
    whatsappNumber: { type: String, required: true },
    walletAddress: { type: String, required: true },
    bankAccountName: { type: String, required: true },
    bankAccountNumber: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
