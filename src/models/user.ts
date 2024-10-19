import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  baseName: string;
  discordUsername: string;
  telegramUsername: string;
  whatsappNumber: string;
  walletAddress: string;
  bankName: string;
  bankAccountName: string;
  bankAccountNumber: string;
  bankCode: string;
}

const userSchema = new Schema<IUser>(
  {
    baseName: { type: String, required: true, unique: true },
    discordUsername: { type: String, required: true, unique: true },
    telegramUsername: { type: String, required: true, unique: true },
    whatsappNumber: { type: String, required: true, unique: true },
    walletAddress: { type: String, required: true },
    bankName: { type: String, required: true },
    bankAccountName: { type: String, required: true },
    bankAccountNumber: { type: String, required: true },
    bankCode: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = model<IUser>("user", userSchema);
