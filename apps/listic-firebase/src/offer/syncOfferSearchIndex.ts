import * as functions from 'firebase-functions';
import { algoliaClient, SEARCH_INDEX } from '../lib/algolia';
import { OfferSearchIndex } from '@listic/core-search';

const index = algoliaClient.initIndex(SEARCH_INDEX.OFFERS);

export const syncOfferSearchIndex = functions
  .region('europe-central2')
  // TODO: recreate core-firebase as buildable library so we can use it in firebase functions
  .firestore.document(`offers/{uid}`)
  .onWrite(async (change) => {
    if (!change.after.exists) {
      await index.deleteObject(change.before.id);
      return;
    }

    const offer = change.after.data();
    const object: OfferSearchIndex = {
      // TODO: use correct casting after buildable library conversion
      objectID: change.after.id,
      ...(offer as OfferSearchIndex),
      createdAt: (offer.createdAt as FirebaseFirestore.Timestamp).seconds,
      updatedAt: (offer.updatedAt as FirebaseFirestore.Timestamp).seconds,
      owner: {
        ...offer.owner,
        createdAt: (offer.owner.createdAt as FirebaseFirestore.Timestamp)
          .seconds,
      },
    };

    await index.saveObject(object);
  });