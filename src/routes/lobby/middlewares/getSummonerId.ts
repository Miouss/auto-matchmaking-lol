import { Response, NextFunction } from "express";

import { performRequest } from "../../utils/performRequest";

interface Data {
  accountId: number;
  connected: true;
  error: {
    description: string;
    id: string;
    messageId: string;
  };
  gasToken: {
    additionalProp1: {};
  };
  idToken: string;
  isInLoginQueue: boolean;
  isNewPlayer: boolean;
  puuid: string;
  state: "IN_PROGRESS";
  summonerId: number;
  userAuthToken: string;
  username: string;
}

interface Session {
  data: Data;
  status: number;
}

export async function getSummonerId(_: any, __: Response, next: NextFunction) {
  const endpoint = "/lol-login/v1/session";
  const response: Session = (await performRequest(endpoint)) as Session;

  const summonerId = response.data.summonerId;

  next();
}
