import { Document } from "mongoose";

export interface IUser extends Document {
  baseName: string;
  discordUsername: string;
  telegramUsername: string;
  whatsappNumber: string;
  walletAddress: string;
  bankAccountName: string;
  bankAccountNumber: string;
}
