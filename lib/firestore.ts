import { doc, getDoc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Get a user document from Firestore.
 * Returns the raw data or null if not found / error.
 */
export async function getUserData(uid: string): Promise<Record<string, any> | null> {
  try {
    const ref = doc(db, "users", uid);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data() : null;
  } catch (err) {
    console.error("Firestore read error:", err);
    return null;
  }
}

/**
 * Save / merge data into a user document.
 * Uses { merge: true } so partial updates won't overwrite the whole doc.
 */
export async function saveUserData(uid: string, data: Record<string, any>): Promise<void> {
  try {
    const ref = doc(db, "users", uid);
    await setDoc(ref, { ...data, updatedAt: serverTimestamp() }, { merge: true });
  } catch (err) {
    console.error("Firestore write error:", err);
  }
}

/**
 * Delete a user document entirely (used for account deletion).
 */
export async function deleteUserDocument(uid: string): Promise<void> {
  try {
    const ref = doc(db, "users", uid);
    await deleteDoc(ref);
  } catch (err) {
    console.error("Firestore delete error:", err);
  }
}
