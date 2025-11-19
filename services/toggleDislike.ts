import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const toggleDislike = async (
  stationName: string,
  priceId: string,
  userId: string
) => {
  const stationRef = doc(db, "stations", stationName);
  const snap = await getDoc(stationRef);

  if (!snap.exists()) return false;

  const data = snap.data();
  const prices = data.prices || [];

  const updatedPrices = prices.map((p: any) => {
    if (p.id !== priceId) return p;

    const alreadyLiked = p.likes.includes(userId);
    const alreadyDisliked = p.dislikes.includes(userId);

    return {
      ...p,
      dislikes: alreadyDisliked
        ? p.dislikes.filter((id: string) => id !== userId) // REMOVE dislike
        : [...p.dislikes, userId], // ADD dislike

      likes: alreadyLiked
        ? p.likes.filter((id: string) => id !== userId) // remove like
        : p.likes,
    };
  });

  await updateDoc(stationRef, { prices: updatedPrices });
  return true;
};
