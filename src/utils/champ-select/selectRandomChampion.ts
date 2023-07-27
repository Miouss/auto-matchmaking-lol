import { getRandomChampionId } from "./getRandomChampionId";
import {
  pickChampion,
  getPickableChampionsIds,
  banChampion,
  getBannableChampionsIds,
} from "../";

export async function banRandomChampion(actions: any) {
  return await selectRandomChampion(
    actions,
    getBannableChampionsIds,
    banChampion,
    "ban"
  );
}

export async function pickRandomChampion(actions: any) {
  return await selectRandomChampion(
    actions,
    getPickableChampionsIds,
    pickChampion,
    "pick"
  );
}

async function selectRandomChampion(
  actions: any,
  getChampionsIds: any,
  selectChampion: any,
  type: "ban" | "pick"
) {
  const canSelect = actions[type].isInProgress;

  if (canSelect) {
    const championsIds = await getChampionsIds();

    const champId = getRandomChampionId(championsIds);

    const hasSelected = await selectChampion(actions[type].id, champId);

    if (hasSelected) {
      console.log(`Champion with id ${champId} has been ${type}ed`);
    }

    return hasSelected;
  }
}
