export function getCashTime(): number {
  const casheTime = 60;
  return casheTime * 60000 + Date.now();
}
