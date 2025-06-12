import admin from 'firebase-admin';

import { PRIVATE_FIREBASE_SERVICE_ACCOUNT } from "$env/static/private"


// Check if the app is already initialized
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(PRIVATE_FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export const firestoreAdmin = admin.firestore();