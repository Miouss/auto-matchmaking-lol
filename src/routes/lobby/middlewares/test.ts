import { Response, NextFunction } from "express";

import { request } from "../../../utils/request";

export async function test(req: any, _: Response, next: NextFunction) {
  const endpoint = "/lol-lobby/v2/lobby/matchmaking/search";
  req.response = await request(endpoint, "POST");
  next();
}
