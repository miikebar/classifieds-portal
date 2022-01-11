import { Collection, Region } from '@listic/core-firebase-utils';
import { Offer } from '@listic/feature-offer-types';
import * as functions from 'firebase-functions';
import { admin } from '../lib/firebase';

export const handleExpiredPromoting = functions
  .region(Region.DEFAULT)
  .pubsub.schedule('every 12 hours')
  .timeZone('Europe/Warsaw')
  .onRun(async (ctx) => {
    const offers = await admin
      .firestore()
      .collection(Collection.OFFERS)
      .where('promoteExpires', '<=', admin.firestore.Timestamp.now())
      .get();

    const updates = offers.docs.map((doc) =>
      doc.ref.update({
        isPromoted: false,
        promoteExpires: admin.firestore.FieldValue.delete(),
      } as Pick<Offer, 'isPromoted' | 'promoteExpires'>)
    );

    await Promise.all(updates);
  });
