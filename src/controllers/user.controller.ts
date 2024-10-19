import { Request, Response } from "express";
import { body, query } from "express-validator";
import { User } from "../models/user";
import YellowCardAPI from "../utils/yellowCardAPI";
import { errorResponse, successResponse } from "../utils/responseHandler";
import { WalletModel } from "../models/wallet";

// Validation Rules
export const userValidationRules = [
  body("baseName").notEmpty().withMessage("Base name is required"),
  body("discordUsername")
    .notEmpty()
    .withMessage("Discord username is required"),
  body("telegramUsername")
    .notEmpty()
    .withMessage("Telegram username is required"),
  body("whatsappNumber")
    .isMobilePhone("any")
    .withMessage("Invalid WhatsApp number"),
  body("walletAddress").notEmpty().withMessage("Wallet address is required"),
  body("bankAccountName")
    .notEmpty()
    .withMessage("Bank account name is required"),
  body("bankAccountNumber")
    .isNumeric()
    .withMessage("Bank account number must be numeric"),
  body("bankCode")
    .isNumeric()
    .isLength({ min: 3 })
    .withMessage("Bank code must be numeric"),
  body("bankName").isString().withMessage("Bank name is required"),
];

export const getUserProfileBySocialHandleValidationRules = [
  query("platform").notEmpty().withMessage("Platform is required"),
  query("id").notEmpty().withMessage("ID is required"),
];

// Controller function to handle user creation
export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      baseName,
      discordUsername,
      telegramUsername,
      whatsappNumber,
      walletAddress,
      bankAccountName,
      bankAccountNumber,
      bankCode,
      bankName,
    } = req.body;

    // Check if user already exists
    const userExists = await User.exists({
      $or: [
        { baseName },
        { whatsappNumber },
        { discordUsername },
        { telegramUsername },
      ],
    });

    if (userExists) {
      return errorResponse(res, 400, "User already exists");
    }

    // Create a new user
    const newUser = await User.create({
      baseName,
      discordUsername,
      telegramUsername,
      whatsappNumber,
      walletAddress,
      bankAccountName,
      bankAccountNumber,
      bankCode,
      bankName,
    });

    const wallet = await WalletModel.create({ user: newUser._id });

    return successResponse(res, 200, { user: newUser, wallet });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getUserProfileBySocialHandle = async (
  req: Request,
  res: Response
) => {
  try {
    const { platform, id } = req.params;

    let query: { [key: string]: string } = {};

    if (platform == "whatsapp") {
      query = { whatsappNumber: id };
    } else {
      query = { [`${platform}Username`]: id };
    }

    const user = await User.findOne(query);

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    return successResponse(res, 200, user);
  } catch (error: any) {
    return errorResponse(res, 500, error);
  }
};
