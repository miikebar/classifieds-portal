import { app } from '@listic/core/firebase/app';
import { Auth, connectAuthEmulator, getAuth } from 'firebase/auth';

export let firebaseAuth = {} as Auth;

if (typeof window !== 'undefined') {
  firebaseAuth = getAuth(app);

  if (
    process.env.NEXT_PUBLIC_FIREBASE_EMULATORS_ENABLED === 'true' &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !(window as any)._authEmulatorInit
  ) {
    connectAuthEmulator(
      firebaseAuth,
      `http://${process.env.NEXT_PUBLIC_FIREBASE_EMULATORS_HOST}:9099`
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any)._authEmulatorInit = true;
  }
}
