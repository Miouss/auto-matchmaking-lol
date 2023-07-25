import { Response, NextFunction } from "express";

import { performRequest } from "../../utils/performRequest";

export async function getChampSelectSession(
  req: any,
  _: Response,
  next: NextFunction
) {
  const endpoint = "/lol-champ-select/v1/session";
  req.response = await performRequest(endpoint);
  next();
}
