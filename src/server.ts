import "dotenv/config";
import { createServer } from "node:http";
import app from "./app";
import { config } from "./config/env";
import { connect } from "./config/db";

const { PORT } = config;

const server = createServer(app);

connect().then(() => {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
