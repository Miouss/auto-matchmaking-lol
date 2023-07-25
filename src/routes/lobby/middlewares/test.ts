import { Response, NextFunction } from "express";

import { performRequest } from "../../utils/performRequest";

export async function test(req: any, _: Response, next: NextFunction) {
  const endpoint = "/lol-login/v1/session";
  req.response = await performRequest(endpoint);
  next();
}
