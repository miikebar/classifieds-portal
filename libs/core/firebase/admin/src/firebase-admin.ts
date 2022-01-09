import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { v4 as uuid } from 'uuid';

export const app = initializeApp(
  {
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_ADMIN_KEY,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    }),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    serviceAccountId: process.env.FIREBASE_SERVICE_ACCOUNT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    databaseAuthVariableOverride: { uid: 'server' },
  },
  uuid()
);

export const adminFirestore = getFirestore(app);
