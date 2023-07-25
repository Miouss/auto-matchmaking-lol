import { Response, NextFunction } from "express";

import { performRequest } from "../../utils/performRequest";

export async function acceptQueue(req: any, _: Response, next: NextFunction) {
  const endpoint = "/lol-matchmaking/v1/ready-check/accept";
  req.response = await performRequest(endpoint, "POST");
  next();
}
