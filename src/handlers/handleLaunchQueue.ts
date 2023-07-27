import { launchQueue } from "../utils";
import { getBoolean } from "./helpers";

export async function handleLaunchQueue() {
  const isLaunched = getBoolean(
    launchQueue,
    "Trying to launch queue...",
    "Queue launched !"
  );

  return isLaunched;
}
