import * as adminSDK from 'firebase-admin';

adminSDK.initializeApp();
adminSDK.firestore().settings({
  ignoreUndefinedProperties: true,
});

export const admin = adminSDK;
