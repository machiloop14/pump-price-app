import {
  collectionGroup,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export interface FlaggedReport {
  id: string;
  stationId: string;
  stationName: string; // populated manually
  stationAddress: string;
  fuelType: string;
  price: number;
  trustStatus: "suspicious" | "rejected";
  submittedAt: any;
  userId: string;
}

// export function listenToFlaggedReports(
//   callback: (reports: FlaggedReport[]) => void
// ) {
//   const q = query(
//     collectionGroup(db, "reports"),
//     where("trustStatus", "in", ["suspicious", "rejected"])
//   );

//   return onSnapshot(q, (snapshot) => {
//     const reports = snapshot.docs.map((doc) => {
//       const stationRef = doc.ref.parent.parent;

//       return {
//         id: doc.id,
//         stationId: stationRef?.id ?? "",
//         ...(doc.data() as Omit<FlaggedReport, "id" | "stationId">),
//       };
//     });

//     callback(reports);
//   });
// }
export function listenToFlaggedReports(
  callback: (reports: FlaggedReport[]) => void
) {
  const q = query(
    collectionGroup(db, "reports"),
    where("trustStatus", "in", ["suspicious", "rejected"])
  );

  return onSnapshot(q, async (snapshot) => {
    const reports: FlaggedReport[] = [];

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      const stationRef = docSnap.ref.parent.parent;

      if (!stationRef) continue;

      // 🔹 Fetch station document
      const stationSnap = await getDoc(doc(db, "stationss", stationRef.id));

      const stationName = stationSnap.exists()
        ? stationSnap.data().name
        : "Unknown Station";

      const stationAddress = stationSnap.exists()
        ? stationSnap.data().address
        : "Unknown address";

      reports.push({
        id: docSnap.id,
        stationId: stationRef.id,
        stationName,
        fuelType: data.fuelType,
        price: data.price,
        trustStatus: data.trustStatus,
        submittedAt: data.submittedAt,
        userId: data.userId,
        stationAddress,
      });
    }

    callback(reports);
  });
}
