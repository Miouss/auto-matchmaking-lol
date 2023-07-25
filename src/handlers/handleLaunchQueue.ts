import { wait, launchQueue } from "../utils";

export async function handleLaunchQueue() {
  let isLaunched = false;

  while (!isLaunched) {
    console.log("Trying to launch queue...");

    isLaunched = await launchQueue();

    if (!isLaunched) await wait(1000);
  }

  console.log("Queue launched !");
}
