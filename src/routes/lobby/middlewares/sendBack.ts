import { Response } from "express";

export async function sendBack(req: any, res: Response) {
  const { response } = req;

  return res.status(response.status).send(response.data);
}
