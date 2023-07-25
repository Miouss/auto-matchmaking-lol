import { Response, NextFunction } from "express";

import { request } from "../../../utils/request";

export async function pickChampion(
  req: any,
  _: Response,
  next: NextFunction
) {
  const endpoint = "/lol-champ-select/v1/session/actions/1";
  req.response = await request(endpoint, "PATCH", {
    championId: 221,
    completed: true,
  });
  next();
}
