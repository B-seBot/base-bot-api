import express from "express";
import { getWalletBalance } from "../controllers/wallet.controller";

const router = express.Router();

// GET /wallet/:userId/balance
router.get("/:userId/balance", getWalletBalance);

export default router;
