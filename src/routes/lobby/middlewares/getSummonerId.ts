import { Response, NextFunction } from "express";

import { request } from "../../../utils/request";

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

export async function getSummonerId(req: any, _: Response, next: NextFunction) {
  const endpoint = "/lol-login/v1/session";
  const response: Session = (await request(endpoint)) as Session;

  req.response = {
    status: response.status,
    data: response.data.summonerId,
  };

  next();
}
