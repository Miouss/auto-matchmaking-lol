import { Response, NextFunction } from "express";

import { request } from "../../../utils/request";

export async function getChampSelectSession(
  req: any,
  _: Response,
  next: NextFunction
) {
  const endpoint = "/lol-champ-select/v1/session";
  req.response = await request(endpoint);
  next();
}
