import { request } from "../request";

export async function getBannableChampionsIds() {
  const endpoint = "/lol-champ-select/v1/bannable-champion-ids";
  const bannableChampionsIds = await getChampionsIds(endpoint);

  return bannableChampionsIds;
}

export async function getPickableChampionsIds() {
  const endpoint = "/lol-champ-select/v1/pickable-champion-ids";
  const pickableChampionsIds = await getChampionsIds(endpoint);

  return pickableChampionsIds;
}

async function getChampionsIds(endpoint: string) {
  const response: any = await request(endpoint);

  if (!response.ok) return [];

  return response.data as number[];
}
