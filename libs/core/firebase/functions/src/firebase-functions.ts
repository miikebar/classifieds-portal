import { app } from '@listic/core/firebase/app';
import {
  Functions,
  getFunctions,
  connectFunctionsEmulator,
} from 'firebase/functions';
import { Region } from '@listic/core-firebase-utils';

export let firebaseFunctions = {} as Functions;

if (typeof window !== 'undefined') {
  firebaseFunctions = getFunctions(app, Region.DEFAULT);

  if (
    process.env.NEXT_PUBLIC_FIREBASE_EMULATORS_ENABLED === 'true' &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !(window as any)._functionsEmulatorInit
  ) {
    connectFunctionsEmulator(
      firebaseFunctions,
      process.env.NEXT_PUBLIC_FIREBASE_EMULATORS_HOST as string,
      5001
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any)._functionsEmulatorInit = true;
  }
}
