import { request } from "../request";

export async function getGameFlowPhase() {
  const endpoint = "/lol-gameflow/v1/gameflow-phase";
  const response = await request(endpoint);

  const phase = response.data as Phase;

  return phase;
}

type Phase =
  | "None"
  | "Lobby"
  | "Matchmaking"
  | "CheckedIntoTournament"
  | "ReadyCheck"
  | "ChampSelect"
  | "GameStart"
  | "FailedToLaunch"
  | "InProgress"
  | "Reconnect"
  | "WaitingForStats"
  | "PreEndOfGame"
  | "EndOfGame"
  | "TerminatedInError";
