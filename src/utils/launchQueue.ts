import { request } from "./request";

export async function launchQueue() {
  const endpoint = "/lol-lobby/v2/lobby/matchmaking/search";
  const response = await request(endpoint, "POST");

  const isLaunched = response.status === 200;

  return isLaunched;
}
