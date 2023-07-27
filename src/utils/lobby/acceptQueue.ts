import { request } from "../request";

export async function acceptQueue() {
  const endpoint = "/lol-matchmaking/v1/ready-check/accept";
  const response = await request(endpoint, "POST");
  const isAccepted = response.ok;

  return isAccepted;
}
