import { getSummonerId } from "../utils";
import { getData } from "./helpers";

export async function handleGetSummonerId() {
  let summonerId: number = (await getData(
    getSummonerId,
    "Trying to get summoner ID...",
    "Summoner ID retrieved !"
  )) as number;

  return summonerId;
}
