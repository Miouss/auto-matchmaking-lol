import { Request, Response, NextFunction } from "express";

import { performRequest } from "../../utils/performRequest";

export async function pickChampion(
  req: any,
  _: Response,
  next: NextFunction
) {
  const endpoint = "/lol-champ-select/v1/session/actions/1";
  req.response = await performRequest(endpoint, "PATCH", {
    championId: 221,
    completed: true,
  });
  next();
}
