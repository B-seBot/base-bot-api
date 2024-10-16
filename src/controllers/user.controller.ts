import { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";

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
    } = req.body;

    // Create a new user
    const newUser = new User({
      baseName,
      discordUsername,
      telegramUsername,
      whatsappNumber,
      walletAddress,
      bankAccountName,
      bankAccountNumber,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
