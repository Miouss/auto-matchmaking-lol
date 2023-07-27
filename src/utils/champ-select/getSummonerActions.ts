import { request } from "../request";

export async function getSummonerActions(summonerId: number) {
  const session = await getChampSelectSession();
  const cellId = getCellId(session, summonerId);

  const isSummonerCellIdFound = cellId !== undefined;

  if (!isSummonerCellIdFound) {
    console.log("Summoner not found in session");

    return null;
  }

  const actions = getActions(session, cellId);

  return actions;
}

async function getChampSelectSession() {
  const endpoint = "/lol-champ-select/v1/session";
  const response: any = await request(endpoint);

  return response.data as Session;
}

function getCellId(session: Session, summonerId: number) {
  const cellId = session.myTeam.find(
    (member: MyTeamMember) => member.summonerId === summonerId
  )!.cellId;

  return cellId;
}

function getActions(session: Session, cellId: number) {
  const { actions } = session;

  const banAction = findActorCellIdAction(actions[0], cellId);
  const pickAction = findActorCellIdAction(actions[2], cellId);

  return { ban: banAction, pick: pickAction } as Actions;
}

function getIds(actions: Actions) {
  const banId = actions.ban!.id;

  const pickId = actions.pick!.id;

  return { ban: banId, pick: pickId };
}

function hasPickedAndBanned(actions: Actions) {
  const hasBanned = actions.ban?.completed;
  const hasPicked = actions.pick?.completed;

  console.log("hasBanned", hasBanned);
  console.log("hasPicked", hasPicked);

  return hasPicked && hasBanned;
}

function findActorCellIdAction(actions: ActionsItem[], cellId: number) {
  return actions.find((action: any) => action.actorCellId === cellId);
}

interface Actions {
  ban: ActionsItem;
  pick: ActionsItem;
}

interface MyTeamMember {
  assignedPosition: string;
  cellId: number;
  championId: number;
  championPickIntent: number;
  entitledFeatureType: string;
  nameVisibilityType: string;
  obfuscatedPuuid: string;
  obfuscatedSummonerId: number;
  puuid: string;
  selectedSkinId: number;
  spell1Id: number;
  spell2Id: number;
  summonerId: number;
  team: number;
  wardSkinId: number;
}

interface ActionsItem {
  actorCellId: number;
  championId: number;
  completed: boolean;
  id: number;
  isAllyAction: boolean;
  isInProgress: boolean;
  type: string;
}

interface Session {
  actions: ActionsItem[][];
  myTeam: MyTeamMember[];
}
