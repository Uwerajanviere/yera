// firebase/client.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Firebase configuration for yera2-c7523 project
const firebaseConfig = {
  apiKey: "AIzaSyACxz-Up9eR1vwaTuA9PGvN0I0HLBwvrwA",
  authDomain: "yera2-c7523.firebaseapp.com",
  projectId: "yera2-c7523",
  storageBucket: "yera2-c7523.firebasestorage.app",
  messagingSenderId: "443004844191",
  appId: "1:443004844191:web:81ab9edd7dd20d396acaaa",
  databaseURL: "https://yera2-c7523-default-rtdb.firebaseio.com"
};

// Validate configuration
const missingConfig = Object.entries(firebaseConfig)
  .filter(([key, value]) => !value && key !== 'measurementId' && key !== 'messagingSenderId')
  .map(([key]) => key);

if (missingConfig.length > 0) {
  console.error('Missing Firebase configuration:', missingConfig.join(', '));
  console.error('Please check your environment variables');
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getDatabase(app);
console.log("FIREBASE CONFIG:", {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  appId: firebaseConfig.appId,
});
