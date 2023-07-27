import { request } from "../request";

export async function getChampSelectPhase() {
  const endpoint = "/lol-lobby-team-builder/champ-select/v1/session/timer";
  const response: any = await request(endpoint);

  if(!response.ok) return null;

  const phase = response.data.phase;

  return phase;
}

