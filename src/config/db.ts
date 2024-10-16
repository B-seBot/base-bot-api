import mongoose from "mongoose";
import { config } from "../config/env";

const { MONGODB_URI } = config;

export const connect = () =>
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.error("MongoDB connection error:", error));
