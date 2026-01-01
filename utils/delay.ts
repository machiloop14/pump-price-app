// src/utils/delay.ts

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
