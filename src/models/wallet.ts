import { Schema, model, Document } from "mongoose";

interface IWallet extends Document {
  user: Schema.Types.ObjectId;
  balance: number;
  currency: string;
}

const walletSchema = new Schema<IWallet>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    balance: { type: Number, default: 0 },
    currency: { type: String, default: "USD" },
  },
  { timestamps: true }
);

export const WalletModel = model<IWallet>("wallet", walletSchema);
