import { Response, NextFunction } from "express";

import { performRequest } from "../../utils/performRequest";

export async function playAgain(req: any, _: Response, next: NextFunction) {
  const endpoint = "/lol-lobby/v2/play-again";
  req.response = await performRequest(endpoint, "POST");
  next();
}
