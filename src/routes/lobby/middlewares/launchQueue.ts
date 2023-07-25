import { Response, NextFunction } from "express";

import { performRequest } from "../../utils/performRequest";

export async function launchQueue(req: any, res: Response, next: NextFunction) {
  const endpoint = "/lol-lobby/v2/lobby/matchmaking/search";
  req.response = await performRequest(endpoint, "POST");
  next();
}
