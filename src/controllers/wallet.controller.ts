import { Request, Response } from "express";
import { WalletModel } from "../models/wallet";
import { User } from "../models/user";
import { errorResponse, successResponse } from "../utils/responseHandler";

export const getWalletBalance = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    // Ensure user exists
    const user = await User.findById(userId);
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    // Fetch the user's wallet
    const wallet = await WalletModel.findOne({ user: user._id });
    if (!wallet) {
      return errorResponse(res, 404, "Wallet not found");
    }

    // Return the balance
    return successResponse(res, 200, {
      balance: wallet.balance,
      currency: wallet.currency,
    });
  } catch (error) {
    return errorResponse(res, 500, error);
  }
};
