export async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
export function getRandomNoDuplicateArray(maxValue: number): number[] {
  let result: any = [];
  while (result.length < maxValue) {
    const randomValu = Math.floor(Math.random() * maxValue) + 1;
    if (result.indexOf(randomValu) === -1) result.push(randomValu);
  }
  return result;
}
