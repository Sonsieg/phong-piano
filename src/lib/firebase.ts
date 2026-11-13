import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
// Firestore does not depend on Storage, Messaging or Authentication settings.
export const firebaseConfigured = Boolean(config.apiKey && config.projectId && config.appId);
export function getFirebase() {
  if (!firebaseConfigured) throw new Error('Chưa cấu hình Firebase.');
  const app = getApps().length ? getApp() : initializeApp(config);
  return { db: getFirestore(app) };
}
