import express from "express";
import { lobby } from "./routes";

import { config } from "dotenv";
config();

const app = express();
const PORT = 3000;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
app.use("/lobby", lobby);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
