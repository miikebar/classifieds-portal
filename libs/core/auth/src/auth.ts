/* eslint-disable @typescript-eslint/no-explicit-any */
import { app } from '@listic/core/firebase';
import { Auth, connectAuthEmulator, getAuth } from 'firebase/auth';

export let auth = {} as Auth;

if (typeof window !== 'undefined') {
  auth = getAuth(app);

  if (
    process.env.NEXT_PUBLIC_FIREBASE_EMULATORS_ENABLED === 'true' &&
    !(window as any)._authEmulatorInit
  ) {
    connectAuthEmulator(
      auth,
      `http://${process.env.NEXT_PUBLIC_FIREBASE_EMULATORS_HOST}:9099`
    );
    (window as any)._authEmulatorInit = true;
  }
}
