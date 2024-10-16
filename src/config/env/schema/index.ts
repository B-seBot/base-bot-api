import { Joi } from "celebrate";

// define validation for all the env vars
export const schema = {
  PORT: Joi.number().required(),
  JWT_SECRET: Joi.string().required(),
  MONGODB_URI: Joi.string().required(),
  YELLOWCARD_API_BASE_URL: Joi.string().required(),
  YELLOWCARD_API_KEY: Joi.string().required(),
  YELLOWCARD_API_SECRET_KEY: Joi.string().required(),
};
