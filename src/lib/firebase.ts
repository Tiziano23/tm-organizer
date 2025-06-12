import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  type Firestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA06fNJfMQtk17jkPb-5tSR8IIy-nsTpgw",
  authDomain: "tm-organizer.firebaseapp.com",
  projectId: "tm-organizer",
  storageBucket: "tm-organizer.firebasestorage.app",
  messagingSenderId: "756757157928",
  appId: "1:756757157928:web:4a2e3ddf23350e3d8b3d1d",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

let firestore: Firestore;
try {
  firestore = initializeFirestore(app, { localCache: persistentLocalCache() });
} catch (e) {
  firestore = getFirestore(app);
}

export { firestore };

export const auth = getAuth(app);
