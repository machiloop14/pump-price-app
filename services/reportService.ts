// import {
//   addDoc,
//   collection,
//   doc,
//   getDoc,
//   serverTimestamp,
//   setDoc,
// } from "firebase/firestore";

// import { db } from "../firebaseConfig";
// import { CreateReportInput } from "../types/report";

// export async function submitReport(userId: string, data: CreateReportInput) {
//   const stationRef = doc(db, "stationss", data.placeId);

//   // 1️⃣ Ensure station exists
//   const stationSnap = await getDoc(stationRef);

//   if (!stationSnap.exists()) {
//     await setDoc(stationRef, {
//       name: data.stationName,
//       state: data.state,
//       address: data.address,
//       lat: data.lat,
//       lng: data.lng,
//       createdAt: serverTimestamp(),
//     });
//   }

//   // 2️⃣ Create report under station
//   const reportsRef = collection(stationRef, "reports");

//   await addDoc(reportsRef, {
//     fuelType: data.fuelType,
//     price: data.price,

//     userId,
//     likes: [],
//     dislikes: [],

//     submittedAt: serverTimestamp(),
//   });
// }

import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore";

import { db } from "../firebaseConfig";
import { CreateReportInput } from "../types/report";
import { computeTrustScore } from "../utils/trustscoring";
import { fetchRecentPricesForTrust } from "./reportQueries";

export async function submitReport(userId: string, data: CreateReportInput) {
  const stationRef = doc(db, "stationss", data.placeId);

  // 1️⃣ Ensure station exists
  const stationSnap = await getDoc(stationRef);

  if (!stationSnap.exists()) {
    await setDoc(stationRef, {
      name: data.stationName,
      state: data.state,
      address: data.address,
      lat: data.lat,
      lng: data.lng,
      createdAt: serverTimestamp(),
    });
  }

  // 2️⃣ TRUST SCORING (your algorithm)
  const submittedAt = Timestamp.now();

  const recentPrices = await fetchRecentPricesForTrust(
    data.placeId,
    data.fuelType
  );

  let trustScore = 1;
  let trustStatus: "valid" | "suspicious" | "rejected" = "valid";

  if (recentPrices.length >= 3) {
    const result = computeTrustScore(data.price, submittedAt, recentPrices);
    trustScore = result.trustScore;
    trustStatus = result.trustStatus;
  }

  // 3️⃣ Save report
  const reportsRef = collection(stationRef, "reports");

  await addDoc(reportsRef, {
    fuelType: data.fuelType,
    price: data.price,

    userId,
    likes: [],
    dislikes: [],

    trustScore,
    trustStatus,

    submittedAt: serverTimestamp(),
  });
}
