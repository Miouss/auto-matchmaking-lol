import { playAgain } from "../utils";
import { getBoolean } from "./helpers";

export async function handlePlayAgain() {
  const hasPlayedAgain = getBoolean(
    playAgain,
    "Trying to play again...",
    "Has played again !"
  );

  return hasPlayedAgain;
}
