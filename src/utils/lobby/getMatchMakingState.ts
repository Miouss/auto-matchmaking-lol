import { request } from "../request";

export async function getMatchMakingState() {
  const endpoint = "/lol-matchmaking/v1/ready-check";
  const response = (await request(endpoint)) as MatchMakingStateType;

  return response.data;
}

interface ReadyCheck {
  declinerIds: number[];
  dodgeWarning: "None" | "Warning" | "Penalty";
  playerResponse: "None" | "Accepted" | "Declined";
  state:
    | "Invalid"
    | "InProgress"
    | "EveryoneReady"
    | "StrangerNotReady"
    | "PartyNotReady"
    | "Error";
  suppressUx: boolean;
  timer: number;
}

interface MatchMakingStateType {
  data: ReadyCheck;
  status: number;
  ok: boolean;
}
