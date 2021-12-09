import {
  getFirestore,
  connectFirestoreEmulator,
  Firestore,
} from 'firebase/firestore';
import { app } from './app';

export let firestore = {} as Firestore;

if (typeof window !== 'undefined') {
  firestore = getFirestore(app);

  if (
    process.env.NEXT_PUBLIC_FIREBASE_EMULATORS_ENABLED === 'true' &&
    !(window as any)._firestoreEmulatorInit
  ) {
    connectFirestoreEmulator(
      firestore,
      process.env.NEXT_PUBLIC_FIREBASE_EMULATORS_HOST as string,
      8080
    );
    (window as any)._firestoreEmulatorInit = true;
  }
}
