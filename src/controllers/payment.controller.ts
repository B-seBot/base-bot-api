import { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import { config } from "../config/env";
import YellowCardAPI, { ISendMoneyPayload } from "../utils/yellowCardAPI";
import { randomUUID } from "crypto";
import { errorResponse, successResponse } from "../utils/responseHandler";

const { YELLOWCARD_PAYOUT_CHANNEL_ID } = config;

// Validation rules
export const sendMoneyValidationRules = [
  body("baseName").notEmpty().withMessage("Base name is required"),
  //body("currency").isIn(["NGN", "USD", "USDT"]).withMessage("Invalid currency"),
  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than zero"),
  body("destinationType")
    .isIn(["wallet", "bank"])
    .withMessage("Invalid destination type, must be 'wallet' or 'bank'"),
];

export const sendMoney = async (req: Request, res: Response) => {
  try {
    const { baseName, currency, amount, destinationType } = req.body; // destinationType can be 'wallet' or 'bank'

    // Find the user to send money to
    const recipient = await User.findOne({ baseName });
    if (!recipient) {
      return errorResponse(res, 404, "Invalid base name");
    }

    if (destinationType === "bank") {
      const network = await YellowCardAPI.getNetwork(recipient.bankCode);

      const payload = {
        channelId: YELLOWCARD_PAYOUT_CHANNEL_ID,
        sequenceId: randomUUID(),
        amount,
        reason: "Payment",
        sender: {},
        destination: {
          accountNumber: recipient.bankAccountNumber,
          accountType: "bank",
          networkId: network.id,
          accountName: recipient.bankAccountName,
        },
        forceAccept: false,
        customerType: "retail" as ISendMoneyPayload["customerType"],
      };

      const response = await YellowCardAPI.sendMoney(payload);

      return successResponse(res, 200, response);
    } else {
      return errorResponse(
        res,
        400,
        `Unsupported destination type: ${destinationType}`
      );
    }
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, error);
  }
};

export const resolveBankAccount = async (req: Request, res: Response) => {
  try {
    const { accountNumber, networkId } = req.body;

    const response = await YellowCardAPI.resolveBankAccount(
      accountNumber,
      networkId
    );

    return successResponse(res, 200, response);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getAllNetworks = async (req: Request, res: Response) => {
  try {
    const response = await YellowCardAPI.getAllNetworks();

    return successResponse(res, 200, response);
  } catch (error: any) {
    return errorResponse(res, 500, error);
  }
};
