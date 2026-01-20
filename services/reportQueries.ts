import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Report } from "../types/GooglePlace";

/**
 * Real-time listener (unchanged)
 */
export function listenToReportsForStation(
  placeId: string,
  callback: (reports: Report[]) => void
) {
  const reportsRef = collection(db, "stationss", placeId, "reports");
  const q = query(reportsRef, orderBy("submittedAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const reports: Report[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Report, "id">),
    }));
    callback(reports);
  });
}

/**
 *  NEW: Fetch recent valid prices for trust scoring
 */
export async function fetchRecentPricesForTrust(
  placeId: string,
  fuelType: string,
  max = 20
): Promise<number[]> {
  const reportsRef = collection(db, "stationss", placeId, "reports");

  const q = query(
    reportsRef,
    where("fuelType", "==", fuelType),
    where("trustStatus", "==", "valid"),
    orderBy("submittedAt", "desc"),
    limit(max)
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data().price);
}
