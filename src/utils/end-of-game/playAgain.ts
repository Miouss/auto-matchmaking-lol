import { request } from "../request";

export async function playAgain() {
  const endpoint = "/lol-lobby/v2/play-again";
  const response = await request(endpoint, "POST");

  const hasPlayedAgain = response.ok;

  return hasPlayedAgain;
}
