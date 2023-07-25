import { wait, acceptQueue } from "../utils";

export async function handleAcceptQueue() {
  let isAccepted = false;

  isAccepted = await acceptQueue();

  while(!isAccepted) {
    console.log("Trying to accept queue...");

    isAccepted = await acceptQueue();

    if(!isAccepted) await wait(1000);
  } 

  console.log("Queue accepted !");
}
