import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Comprehensive validation for client-side debugging
const missingKeys = Object.entries(firebaseConfig)
  .filter(([_, value]) => !value || value.trim() === '')
  .map(([key]) => key);

const isConfigValid = missingKeys.length === 0;

if (typeof window !== 'undefined') {
  if (!isConfigValid) {
    console.error("🔥 Firebase configuration is missing the following keys:", missingKeys);
    console.warn("Please check your .env file and ensure variables are prefixed with NEXT_PUBLIC_");
  } else {
    console.log("✅ Firebase initialized successfully with Project ID:", firebaseConfig.projectId);
  }
}

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, isConfigValid };