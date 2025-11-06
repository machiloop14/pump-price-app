import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
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

    const priceEntry = {
      fuelType,
      price,
      reportedBy,
      location,
      likes: 0,
      dislikes: 0,
      timeReported: new Date().toISOString(),
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
        state,
        prices: [priceEntry],
      });
    }

    return true;
  } catch (err) {
    console.log("Error submitting report", err);
    return false;
  }
};
