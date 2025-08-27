import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACxz-Up9eR1vwaTuA9PGvN0I0HLBwvrwA",
  authDomain: "yera2-c7523.firebaseapp.com",
  projectId: "yera2-c7523",
  storageBucket: "yera2-c7523.firebasestorage.app",
  messagingSenderId: "443004844191",
  appId: "1:443004844191:web:81ab9edd7dd20d396acaaa",
  databaseURL: "https://yera2-c7523-default-rtdb.firebaseio.com"
};

// Initialize Firebase only if no apps exist
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getDatabase(app);
export const auth = getAuth(app);
export default app;
