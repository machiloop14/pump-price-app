import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Report } from "../types/GooglePlace";

/**
 * Sets up a real-time listener for a station's reports
 * @param placeId Google Place ID of the station
 * @param callback Called whenever reports change
 * @returns unsubscribe function
 */
export function listenToReportsForStation(
  placeId: string,
  callback: (reports: Report[]) => void
) {
  const reportsRef = collection(db, "stationss", placeId, "reports");
  const q = query(reportsRef, orderBy("submittedAt", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const reports: Report[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Report, "id">),
    }));
    callback(reports);
  });

  return unsubscribe;
}
