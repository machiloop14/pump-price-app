import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const toggleLike = async (
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
      likes: alreadyLiked
        ? p.likes.filter((id: string) => id !== userId) // UNLIKE
        : [...p.likes, userId], // ADD LIKE

      dislikes: alreadyDisliked
        ? p.dislikes.filter((id: string) => id !== userId) // remove dislike
        : p.dislikes,
    };
  });

  await updateDoc(stationRef, { prices: updatedPrices });
  return true;
};
