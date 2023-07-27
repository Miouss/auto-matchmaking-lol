import { request } from "../request";

export async function pickChampion(actionId: number, championId: number) {
  const hasPickedChampion = await selectChampion(actionId, championId, "pick");

  return hasPickedChampion;
}

export async function banChampion(actionId: number, championId: number) {
  const hasBannedChampion = await selectChampion(actionId, championId, "ban");

  return hasBannedChampion;
}

async function selectChampion(
  actionId: number,
  championId: number,
  type: "ban" | "pick"
) {
  let endpoint = `/lol-lobby-team-builder/champ-select/v1/session/actions/${actionId}`;
  const response = await request(endpoint, "PATCH", {
    championId,
    completed: true,
    type,
  });

  if (!response.ok) console.log(response.data);

  const hasSelectedChampion = response.ok;

  return hasSelectedChampion;
}
