import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, browserLocalPersistence, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrwNRJ_2-mLTJm7wpPhwNP6KgXYtfwtiI",
  authDomain: "t-rex-68c12.firebaseapp.com",
  projectId: "t-rex-68c12",
  storageBucket: "t-rex-68c12.appspot.com",
  messagingSenderId: "173002783240",
  appId: "1:173002783240:web:62115a2debebe01ee4efbd",
  measurementId: "G-WQBCFJJLS6",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);

// Ensure auth persists across browser sessions
setPersistence(auth, browserLocalPersistence).catch(console.error);
