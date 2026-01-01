import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Report } from "../types/GooglePlace";

export async function fetchReportsForStation(
  placeId: string
): Promise<Report[]> {
  const reportsRef = collection(db, "stationss", placeId, "reports");
  const q = query(reportsRef, orderBy("submittedAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Report, "id">),
  }));
}
