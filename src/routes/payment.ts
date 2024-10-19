import { Router } from "express";
import {
  sendMoney,
  getAllNetworks,
  resolveBankAccount,
  sendMoneyValidationRules,
} from "../controllers/payment.controller";
import { validate } from "../middlewares/requestValidator";

const router = Router();

router.post("/send", sendMoneyValidationRules, validate, sendMoney);
router.get("/networks", getAllNetworks);
router.post("/resolve-bank-account", resolveBankAccount);

export default router;
