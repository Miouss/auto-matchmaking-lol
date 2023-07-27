import { wait } from "../../utils";

export async function getData(action: any, tryMsg: string, successMsg: string) {
  let data: unknown;
  let counter = 0;

  while (!data && counter < 5) {
    console.log(tryMsg);

    data = await action();

    if (!data){
      await wait(10);
      console.log(data);
    } else {
      console.log(successMsg);
    }

    counter++;
  }

  return data;
}
