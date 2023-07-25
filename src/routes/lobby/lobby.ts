import { Router } from "express";

import { test } from "./middlewares/test";
import { sendBack } from "./middlewares/sendBack";

const lobby = Router();

lobby.post("/", test, sendBack);

export { lobby };
