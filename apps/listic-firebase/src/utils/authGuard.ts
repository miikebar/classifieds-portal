import * as functions from 'firebase-functions';

export const authGuard = async (ctx: functions.https.CallableContext) => {
  if (!ctx.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'The request does not have valid authentication credentials for the operation'
    );
  }
};
