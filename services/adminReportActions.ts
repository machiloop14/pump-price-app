import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function approveReport(
  stationId: string,
  reportId: string,
  adminId: string
) {
  const ref = doc(db, "stationss", stationId, "reports", reportId);

  await updateDoc(ref, {
    trustStatus: "valid",
    trustScore: 0.75,
  });
}

export async function rejectReport(
  stationId: string,
  reportId: string,
  adminId: string
) {
  const ref = doc(db, "stationss", stationId, "reports", reportId);

  await updateDoc(ref, {
    trustStatus: "rejected",
    trustScore: 0.2,
  });
}
