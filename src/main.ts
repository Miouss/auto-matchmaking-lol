import express from "express";
import { lobby } from "./routes";

import { handleGetSummonerId, handleLaunchQueue, handleAcceptQueue } from "./handlers";

import { config } from "dotenv";
config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = express();
const PORT = 3000;

app.use("/lobby", lobby);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  let summonerId = await handleGetSummonerId();

  await handleLaunchQueue();
  await handleAcceptQueue();

  console.log(`Summoner ID: ${summonerId}`);
});
