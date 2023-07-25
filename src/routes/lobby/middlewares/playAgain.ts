import { Response, NextFunction } from "express";

import { request } from "../../../utils/request";

export async function playAgain(req: any, _: Response, next: NextFunction) {
  const endpoint = "/lol-lobby/v2/play-again";
  req.response = await request(endpoint, "POST");
  next();
}
