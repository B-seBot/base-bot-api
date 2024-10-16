import express from "express";
import {
  createUser,
  userValidationRules,
} from "../controllers/user.controller";
import { validate } from "../middlewares/requestValidator";

const router = express.Router();

// POST: Create new user
router.post("/user", userValidationRules, validate, createUser);

export default router;
