import { request } from "../request";

export async function canLaunchQueue(summonerId: number) {
  try {
    const members = await getLobbyMembers();
    if(!members) return false;
    
    const isLobbyFull = members.length === 2;
    const isEveryoneReady = members.every((member) => member.ready);
    const isLeader = members.find((member) => member.summonerId === summonerId)?.isLeader;
    const canLaunchQueue = isLobbyFull && isEveryoneReady && isLeader;

    if(!canLaunchQueue){
      console.log("Can't launch queue");
      console.log("Reasons:");
      if(!isLobbyFull) console.log("\tLobby is not full");
      if(!isEveryoneReady) console.log("\tNot everyone is ready");
      if(!isLeader) console.log("\tYou are not the leader");
    }

    return canLaunchQueue;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getLobbyMembers() {
  const endpoint = "/lol-lobby/v2/lobby";
  const response: LobbyState = (await request(endpoint)) as LobbyState;

  return response.data.members;
}

interface CustomSpectator {
  allowedChangeActivity: boolean;
  allowedInviteOthers: boolean;
  allowedKickOthers: boolean;
  allowedStartActivity: boolean;
  allowedToggleInvite: boolean;
  autoFillEligible: boolean;
  autoFillProtectedForPromos: boolean;
  autoFillProtectedForSoloing: boolean;
  autoFillProtectedForStreaking: boolean;
  botChampionId: number;
  botDifficulty: string;
  botId: string;
  firstPositionPreference: string;
  isBot: boolean;
  isLeader: boolean;
  isSpectator: boolean;
  puuid: string;
  ready: boolean;
  secondPositionPreference: string;
  showGhostedBanner: boolean;
  summonerIconId: number;
  summonerId: number;
  summonerInternalName: string;
  summonerLevel: number;
  summonerName: string;
  teamId: number;
}

interface GameConfig {
  allowablePremadeSizes: number[];
  customLobbyName: string;
  customMutatorName: string;
  customRewardsDisabledReasons: string[];
  customSpectatorPolicy: string;
  customSpectators: CustomSpectator[];
  customTeam100: CustomSpectator[];
  customTeam200: CustomSpectator[];
  gameMode: string;
  isCustom: boolean;
  isLobbyFull: boolean;
  isTeamBuilderManaged: boolean;
  mapId: number;
  maxHumanPlayers: number;
  maxLobbySize: number;
  maxTeamSize: number;
  pickType: string;
  premadeSizeAllowed: boolean;
  queueId: number;
  showPositionSelector: boolean;
}

interface Invitation {
  invitationId: string;
  invitationType: string;
  state: string;
  timestamp: string;
  toSummonerId: number;
  toSummonerName: string;
}

interface PartyMember {
  allowedChangeActivity: boolean;
  allowedInviteOthers: boolean;
  allowedKickOthers: boolean;
  allowedStartActivity: boolean;
  allowedToggleInvite: boolean;
  autoFillEligible: boolean;
  autoFillProtectedForPromos: boolean;
  autoFillProtectedForSoloing: boolean;
  autoFillProtectedForStreaking: boolean;
  botChampionId: number;
  botDifficulty: string;
  botId: string;
  firstPositionPreference: string;
  isBot: boolean;
  isLeader: boolean;
  isSpectator: boolean;
  puuid: string;
  ready: boolean;
  secondPositionPreference: string;
  showGhostedBanner: boolean;
  summonerIconId: number;
  summonerId: number;
  summonerInternalName: string;
  summonerLevel: number;
  summonerName: string;
  teamId: number;
}

interface Restriction {
  expiredTimestamp: number;
  restrictionArgs: {
    [key: string]: string;
  };
  restrictionCode: string;
  summonerIds: number[];
  summonerIdsString: string;
}

interface Warning {
  expiredTimestamp: number;
  restrictionArgs: {
    [key: string]: string;
  };
  restrictionCode: string;
  summonerIds: number[];
  summonerIdsString: string;
}

interface PartyInfo {
  canStartActivity: boolean;
  chatRoomId: string;
  chatRoomKey: string;
  gameConfig: GameConfig;
  invitations: Invitation[];
  localMember: PartyMember;
  members: PartyMember[];
  partyId: string;
  partyType: string;
  restrictions: Restriction[];
  warnings: Warning[];
}

interface LobbyState {
  data: PartyInfo;
  status: number;
}
