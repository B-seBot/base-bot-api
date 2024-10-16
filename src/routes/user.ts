import express from "express";
import {
  createUser,
  userValidationRules,
} from "../controllers/user.controller";
import { validate } from "../middlewares/requestValidator";

const router = express.Router();

// POST: Create new user
router.post("/user", userValidationRules, validate, createUser);

/**
 * Endpoint /send
 * Send funds to a basename, specify the amount, and choose whether to send to their linked bank account or crypto wallet
 * @param amount
 * @param baseName
 * @param currency
 * @returns social handles of the receiver, amount, currency, baseName
 */

/**
 * Endpoint /batch-send
 * The same with /send just that it access multiple base name
 * Enter multiple Basenames and send funds to multiple recipients in one go. Perfect for payroll or bulk payouts, It manages currency conversion
 */

/**
 * Endpoint: /bridge
 * Lets you transfer tokens between blockchains. Whether you're moving assets to the Base chain or sending them elsewhere
 */

export default router;
