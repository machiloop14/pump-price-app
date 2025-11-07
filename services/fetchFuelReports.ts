import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { StationData } from "../types/fuel"; // optional if you created types

export const fetchAllReports = async (): Promise<StationData[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "stations"));

    const stations: StationData[] = [];
    querySnapshot.forEach((doc) => {
      stations.push(doc.data() as StationData);
    });

    return stations;
  } catch (error) {
    console.error("Error fetching stations: ", error);
    return [];
  }
};
