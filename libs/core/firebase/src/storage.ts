import {
  getStorage,
  FirebaseStorage,
  connectStorageEmulator,
} from 'firebase/storage';
import { app } from './app';

export let storage = {} as FirebaseStorage;

if (typeof window !== 'undefined') {
  storage = getStorage(app);

  if (
    process.env.NEXT_PUBLIC_FIREBASE_EMULATORS_ENABLED === 'true' &&
    !(window as any)._storageEmulatorInit
  ) {
    connectStorageEmulator(
      storage,
      process.env.NEXT_PUBLIC_FIREBASE_EMULATORS_HOST as string,
      9199
    );
    (window as any)._storageEmulatorInit = true;
  }
}

export const StorageLocation = {
  OFFERS: 'offers',
};
