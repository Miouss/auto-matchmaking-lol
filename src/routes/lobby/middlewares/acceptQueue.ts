import { Response, NextFunction } from "express";

import { request } from "../../../utils/request";

export async function acceptQueue(req: any, _: Response, next: NextFunction) {
  const endpoint = "/lol-matchmaking/v1/ready-check/accept";
  req.response = await request(endpoint, "POST");
  next();
}
