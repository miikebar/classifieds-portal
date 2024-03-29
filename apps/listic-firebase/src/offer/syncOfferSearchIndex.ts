import * as functions from 'firebase-functions';
import { algoliaClient, SEARCH_INDEX } from '../lib/algolia';
import { OfferSearchIndex } from '@listic/core-search';
import { Collection, Region } from '@listic/core-firebase-utils';
import { Offer } from '@listic/feature-offer-types';

const index = algoliaClient.initIndex(SEARCH_INDEX.OFFERS);

export const syncOfferSearchIndex = functions
  .region(Region.DEFAULT)
  .firestore.document(`${Collection.OFFERS}/{uid}`)
  .onWrite(async (change) => {
    if (!change.after.exists) {
      return index.deleteObject(change.before.id);
    }

    const offer = change.after.data() as Offer;

    const object: OfferSearchIndex = {
      objectID: change.after.id,
      ...offer,
      createdAt: (offer.createdAt as FirebaseFirestore.Timestamp).seconds,
      updatedAt: (offer.updatedAt as FirebaseFirestore.Timestamp).seconds,
      owner: {
        ...offer.owner,
        createdAt: (offer.owner.createdAt as FirebaseFirestore.Timestamp)
          .seconds,
      },
    };

    return index.saveObject(object);
  });
