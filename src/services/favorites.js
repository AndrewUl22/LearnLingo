import { ref, get, set, remove } from "firebase/database";
import { db } from "./firebase";

export async function getFavoriteIds(uid) {
  const favRef = ref(db, `users/${uid}/favorites`);
  const snapshot = await get(favRef);
  if (!snapshot.exists()) return [];
  return Object.keys(snapshot.val());
}

export function addFavorite(uid, teacherId) {
  const favRef = ref(db, `users/${uid}/favorites/${teacherId}`);
  return set(favRef, true);
}

export function removeFavorite(uid, teacherId) {
  const favRef = ref(db, `users/${uid}/favorites/${teacherId}`);
  return remove(favRef);
}
