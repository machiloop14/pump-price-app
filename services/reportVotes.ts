import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

/**
 * Toggle like for a report
 */
export async function toggleLike(
  placeId: string,
  reportId: string,
  userId: string
) {
  const reportRef = doc(db, "stationss", placeId, "reports", reportId);

  // Remove user from dislikes if present
  await updateDoc(reportRef, {
    dislikes: arrayRemove(userId),
  });

  // Fetch current likes array
  const snap = await getDoc(reportRef);
  const likesField: string[] = snap.data()?.likes || [];

  if (likesField.includes(userId)) {
    // Already liked → remove
    await updateDoc(reportRef, { likes: arrayRemove(userId) });
  } else {
    // Add like
    await updateDoc(reportRef, { likes: arrayUnion(userId) });
  }
}

/**
 * Toggle dislike for a report
 */
export async function toggleDislike(
  placeId: string,
  reportId: string,
  userId: string
) {
  const reportRef = doc(db, "stationss", placeId, "reports", reportId);

  // Remove from likes
  await updateDoc(reportRef, {
    likes: arrayRemove(userId),
  });

  const snap = await getDoc(reportRef);
  const dislikesField: string[] = snap.data()?.dislikes || [];

  if (dislikesField.includes(userId)) {
    await updateDoc(reportRef, { dislikes: arrayRemove(userId) });
  } else {
    await updateDoc(reportRef, { dislikes: arrayUnion(userId) });
  }
}
