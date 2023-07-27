import { wait } from "../../utils";

export async function getBoolean(action: any, tryMsg: string, successMsg: string) {
  let isActionDone = false;
  let counter = 0;

  while (!isActionDone && counter < 5) {
    console.log(tryMsg);

    isActionDone = await action();

    if (!isActionDone){
      await wait(10);
      console.log(isActionDone);
    }else {
      console.log(successMsg);
    }

    counter++;
  }
  
  return isActionDone;
}
