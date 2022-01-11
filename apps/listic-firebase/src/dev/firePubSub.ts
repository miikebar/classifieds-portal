import { PubSub } from '@google-cloud/pubsub';
import { Region } from '@listic/core-firebase-utils';
import * as functions from 'firebase-functions';
const pubSubClient = new PubSub({ projectId: process.env.GCLOUD_PROJECT });

export let firePubSub = {};

if (process.env.FUNCTIONS_EMULATOR) {
  firePubSub = functions
    .region(Region.DEFAULT)
    .https.onRequest(async (request, response) => {
      const functionName: string = request.body.function;

      if (!functionName) {
        throw new functions.https.HttpsError(
          'failed-precondition',
          'No function name was specified'
        );
      }

      await pubSubClient
        .topic(`firebase-schedule-${functionName}`)
        .publisher.publish(Buffer.from('{}'));

      response.status(200).send(`Fired PubSub function "${functionName}"`);
    });
}
