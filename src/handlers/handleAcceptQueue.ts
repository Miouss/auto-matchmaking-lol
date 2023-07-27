import { acceptQueue } from "../utils";
import { getBoolean } from "./helpers";

export async function handleAcceptQueue() {
  const isAccepted = getBoolean(
    acceptQueue,
    "Trying to accept queue...",
    "Queue accepted !"
  );

  return isAccepted;
}
