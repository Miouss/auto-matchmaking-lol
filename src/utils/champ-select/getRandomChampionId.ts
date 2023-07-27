export function getRandomChampionId(list: number[], exceptions: number[] = []) {
  const filteredList = list.filter((num) => !exceptions.includes(num));

  if (filteredList.length === 0) {
    throw new Error(
      "No valid numbers left in the array after applying exceptions."
    );
  }

  const randomIndex = Math.floor(Math.random() * filteredList.length);
  const randomChampionId = filteredList[randomIndex];

  return randomChampionId;
}
