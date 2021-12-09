import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { app } from './app';

export const firestore = getFirestore(app);

if (
  process.env.NEXT_PUBLIC_FIREBASE_EMULATORS_ENABLED === 'true' &&
  typeof window !== 'undefined' &&
  !(window as any)._firestoreEmulatorInit
) {
  connectFirestoreEmulator(
    firestore,
    process.env.NEXT_PUBLIC_FIREBASE_EMULATORS_HOST as string,
    8080
  );
  (window as any)._firestoreEmulatorInit = true;
}
