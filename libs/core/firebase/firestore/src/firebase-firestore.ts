import { app } from '@listic/core/firebase/app';
import {
  getFirestore,
  connectFirestoreEmulator,
  Firestore,
} from 'firebase/firestore';

export let firestore = {} as Firestore;

if (typeof window !== 'undefined') {
  firestore = getFirestore(app);

  if (
    process.env.NEXT_PUBLIC_FIREBASE_EMULATORS_ENABLED === 'true' &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !(window as any)._firestoreEmulatorInit
  ) {
    connectFirestoreEmulator(
      firestore,
      process.env.NEXT_PUBLIC_FIREBASE_EMULATORS_HOST as string,
      8080
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any)._firestoreEmulatorInit = true;
  }
}
