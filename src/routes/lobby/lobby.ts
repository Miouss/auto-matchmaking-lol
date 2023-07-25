import { Router } from "express";

import { test, sendBack, getSummonerId } from "./middlewares";

const lobby = Router();

lobby.post("/", test, sendBack);

lobby.get("/summonerId", getSummonerId);

export { lobby };
