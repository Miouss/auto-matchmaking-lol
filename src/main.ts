import express from "express";
import { lobby } from "./routes";

import {
  handleGetSummonerId,
  handleLaunchQueue,
  handleAcceptQueue,
  handlePlayAgain,
} from "./handlers";

import { config } from "dotenv";
import {
  wait,
  getMatchMakingState,
  canLaunchQueue,
  getGameFlowPhase,
  getSummonerActions,
  getChampSelectPhase,
  pickRandomChampion,
  banRandomChampion,
} from "./utils";
config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = express();
const PORT = 3000;

app.use("/lobby", lobby);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  let summonerId = await handleGetSummonerId();
  let hasPicked = false;
  let hasBanned = false;
  let hasLaunchedQueue = false;

  while (true) {
    if (!summonerId) {
      summonerId = await handleGetSummonerId();
    }

    let phase = await getGameFlowPhase();

    if (phase !== "ChampSelect" && (hasPicked || hasBanned)) {
      hasPicked = false;
      hasBanned = false;
    }

    if (phase === "Lobby" && !hasLaunchedQueue) {
      hasLaunchedQueue = false;
    }

    switch (phase) {
      case "InProgress":
        console.log("Game is in progress, waiting 10 seconds...");
        await wait(10);
        break;
      case "ChampSelect":
        if (hasPicked && hasBanned) {
          console.log(
            "Champions have been picked and banned, waiting 10 seconds..."
          );

          await wait(10);
        } else {
          const champSelectPhase = await getChampSelectPhase();

          if (champSelectPhase === "BAN_PICK") {
            const actions = await getSummonerActions(summonerId)!;
            if (!actions) {
              console.log("no actions found");
              break;
            }

            if (!hasPicked) {
              hasPicked = await pickRandomChampion(actions);
            }

            if (!hasBanned) {
              hasBanned = await banRandomChampion(actions);
            }

            console.log("Champ select still in progress, waiting 3 seconds...");
            await wait(3);
          } else {
            console.log("Champ select in planning phase, waiting 5 seconds...");
            await wait(5);
          }
        }
        break;
      case "Lobby":
        if (!hasLaunchedQueue) {
          if (await canLaunchQueue(summonerId)) {
            hasLaunchedQueue = await handleLaunchQueue();
          } else{
            console.log("Cannot launch queue, waiting 5 seconds...");
            await wait(5);
          }
        } else {
          console.log("Currently in queue, waiting 5 seconds...");
          await wait(5);
        }
        break;
      case "ReadyCheck":
        const { playerResponse } = await getMatchMakingState();

        switch (playerResponse) {
          case "Accepted":
            console.log("Game accepted, waiting 3 seconds...");
            break;
          case "None":
            console.log("Found a game, accepting queue...");
            await handleAcceptQueue();
            break;
          case "Declined":
            console.log("Game declined, waiting 3 seconds...");
            break;
        }

        await wait(3);
        break;
      case "Matchmaking":
        console.log("Matchmaking is in progress, waiting 3 seconds...");
        await wait(3);
        break;
      case "PreEndOfGame":
        await handlePlayAgain();
        break;
      default:
        console.log(
          `Gameflow phase: ${phase} not handled. Waiting 10 seconds...`
        );
        await wait(10);
        break;
    }
  }
});
