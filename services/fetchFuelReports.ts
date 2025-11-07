import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { StationData } from "../types/fuel";

export const listenToStations = (
  callback: (stations: StationData[]) => void
) => {
  const stationsRef = collection(db, "stations");

  // real-time listener
  const unsubscribe = onSnapshot(stationsRef, (snapshot) => {
    const stations: StationData[] = snapshot.docs.map((doc) => {
      return doc.data() as StationData;
    });

    callback(stations);
  });

  // return unsubscribe so caller can stop listening
  return unsubscribe;
};
