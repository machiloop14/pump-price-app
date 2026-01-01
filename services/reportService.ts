import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebaseConfig";
import { CreateReportInput } from "../types/report";

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

  // 2️⃣ Create report under station
  const reportsRef = collection(stationRef, "reports");

  await addDoc(reportsRef, {
    fuelType: data.fuelType,
    price: data.price,

    userId,
    likes: [],
    dislikes: [],

    submittedAt: serverTimestamp(),
  });
}
