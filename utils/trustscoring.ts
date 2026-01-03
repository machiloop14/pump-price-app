import { Timestamp } from "firebase/firestore";

export type TrustStatus = "valid" | "suspicious" | "rejected";

const THRESHOLD = 2; // std deviation multiplier
const LAMBDA = 0.00001; // time decay constant

export function computeTrustScore(
  price: number,
  submittedAt: Timestamp,
  recentPrices: number[]
): { trustScore: number; trustStatus: TrustStatus } {
  // Mean
  const mean =
    recentPrices.reduce((sum, p) => sum + p, 0) / recentPrices.length;

  // Standard deviation
  const variance =
    recentPrices.reduce((sum, p) => sum + Math.pow(p - mean, 2), 0) /
    recentPrices.length;

  const stdDev = Math.sqrt(variance);

  // Outlier score
  const lower = mean - THRESHOLD * stdDev;
  const upper = mean + THRESHOLD * stdDev;

  const outlierScore = price >= lower && price <= upper ? 1 : 0;

  // Time decay
  const diffMs = Date.now() - submittedAt.toMillis();
  const timeDecay = Math.exp(-LAMBDA * diffMs);

  // Trust score
  const trustScore = 0.7 * outlierScore + 0.3 * timeDecay;

  // Classification
  let trustStatus: TrustStatus;
  if (trustScore >= 0.6) trustStatus = "valid";
  else if (trustScore >= 0.3) trustStatus = "suspicious";
  else trustStatus = "rejected";

  return { trustScore, trustStatus };
}
