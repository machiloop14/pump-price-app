import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import uuid from "react-native-uuid";
import { db } from "../firebaseConfig";

export const submitFuelReport = async (
  stationName: string,
  state: string,
  fuelType: string,
  price: number,
  reportedBy: string,
  location: string
) => {
  try {
    const stationRef = doc(db, "stations", stationName);
    const stationSnap = await getDoc(stationRef);

    let recentPrices: number[] = [];

    // 1️⃣ Fetch existing station data (if any)
    if (stationSnap.exists()) {
      const station = stationSnap.data();

      recentPrices = (station.prices || [])
        .filter(
          (p: any) =>
            p.fuelType.toLowerCase() === fuelType.toLowerCase() &&
            p.state.toLowerCase() === state.toLowerCase()
        )
        .sort(
          (a: any, b: any) =>
            new Date(b.timeReported).getTime() -
            new Date(a.timeReported).getTime()
        )
        .slice(0, 20) // last 20 reports
        .map((p: any) => p.price);
    }

    // 2️⃣ If not enough history → auto-accept
    let trustScore = 1;
    let status = "Valid";

    if (recentPrices.length >= 3) {
      // mean
      const mean =
        recentPrices.reduce((sum, p) => sum + p, 0) / recentPrices.length;

      // std dev
      const stdDev = Math.sqrt(
        recentPrices.map((p) => (p - mean) ** 2).reduce((a, b) => a + b, 0) /
          recentPrices.length
      );

      const threshold = 2;

      // 3️⃣ Outlier check
      let outlierScore = 1;
      if (Math.abs(price - mean) > threshold * stdDev) {
        outlierScore = 0;
      }

      // 4️⃣ Time decay
      const lambda = 0.05;
      const timeDecay = Math.exp(-lambda * 0); // new report = most recent

      // 5️⃣ Trust Score
      trustScore = 0.7 * outlierScore + 0.3 * timeDecay;

      // 6️⃣ Status
      if (trustScore >= 0.6) status = "Valid";
      else if (trustScore >= 0.3) status = "Suspicious";
      else status = "Rejected";
    }

    const priceEntry = {
      id: uuid.v4(),
      fuelType,
      price,
      reportedBy,
      location,
      state,
      likes: [],
      dislikes: [],
      timeReported: new Date().toISOString(),
      trustScore,
      status,
    };

    if (stationSnap.exists()) {
      // ✅ Station exists → append new price entry
      await updateDoc(stationRef, {
        prices: arrayUnion(priceEntry),
      });
    } else {
      // ✅ Station does not exist → create it
      await setDoc(stationRef, {
        stationName,
        prices: [priceEntry],
      });
    }

    return { ok: true, trustScore, status };
  } catch (err) {
    console.log("Error submitting report", err);
    return { ok: false };
  }
};
