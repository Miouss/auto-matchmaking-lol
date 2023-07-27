import { request } from "../request";

export async function canPlayAgain() {
  const endpoint = "/lol-end-of-game/v1/gameclient-eog-stats-block";
  const response = await request(endpoint);

  const canPlayAgain = response.ok;

  return canPlayAgain;
}
