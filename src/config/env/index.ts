import dotenv from "dotenv";
import { schema } from "./schema";
import { Validate } from "./validators";
import { ConfigTypes } from "../types";
dotenv.config();

// validate environment variables
const envVarsSchema = Validate(schema);

const { error, value: envVariables } = envVarsSchema.validate(process.env);
if (error) throw new Error(`Config validation error: ${error.message}`);

export const config: ConfigTypes = {
  PORT: envVariables.PORT,
  JWT_SECRET: envVariables.JWT_SECRET,
  MONGODB_URI: envVariables.MONGODB_URI,
  YELLOWCARD_API_BASE_URL: envVariables.YELLOWCARD_API_BASE_URL,
  YELLOWCARD_API_KEY: envVariables.YELLOWCARD_API_KEY,
  YELLOWCARD_API_SECRET_KEY: envVariables.YELLOWCARD_API_SECRET_KEY,
  YELLOWCARD_PAYOUT_CHANNEL_ID: envVariables.YELLOWCARD_PAYOUT_CHANNEL_ID,
};
