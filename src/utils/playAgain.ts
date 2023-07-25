import { request } from "./request";

export async function playAgain() {
  const endpoint = "/lol-lobby/v2/play-again";
  await request(endpoint, "POST");
}
