import { ref, get, query, orderByKey, limitToFirst } from "firebase/database";
import { db } from "./firebase";

export async function fetchTeachersPage(count) {
  const teachersRef = ref(db, "teachers");
  const teachersQuery = query(teachersRef, orderByKey(), limitToFirst(count));
  const snapshot = await get(teachersQuery);

  if (!snapshot.exists()) return [];

  const value = snapshot.val();
  return Object.entries(value).map(([id, teacher]) => ({ id, ...teacher }));
}

export function fetchAllTeachers() {
  return fetchTeachersPage(1000);
}
