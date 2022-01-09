import { app } from '@listic/core/firebase/app';
import {
  getStorage,
  FirebaseStorage,
  connectStorageEmulator,
} from 'firebase/storage';

export let firebaseStorage = {} as FirebaseStorage;

if (typeof window !== 'undefined') {
  firebaseStorage = getStorage(app);

  if (
    process.env.NEXT_PUBLIC_FIREBASE_EMULATORS_ENABLED === 'true' &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !(window as any)._storageEmulatorInit
  ) {
    connectStorageEmulator(
      firebaseStorage,
      process.env.NEXT_PUBLIC_FIREBASE_EMULATORS_HOST as string,
      9199
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any)._storageEmulatorInit = true;
  }
}
