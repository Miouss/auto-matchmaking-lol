import { wait, getSummonerId } from "../utils";

export async function handleGetSummonerId() {
  let summonerId: number = 0;

  while (!summonerId) {
    console.log(`Trying to get summoner ID...`);

    summonerId = await getSummonerId();

    if (!summonerId) await wait(1000);
  }

  console.log(`Summoner ID retrieved !`);
  console.log(`Summoner ID: ${summonerId}`);

  return summonerId;
}
