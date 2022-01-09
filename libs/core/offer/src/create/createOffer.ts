import { Collection } from '@listic/core-firebase-utils';
import type { Timestamp } from 'firebase/firestore';
import slugify from 'slugify';
import { Offer } from '../types/Offer';

export const createOffer = async (
  offer: Omit<Offer, 'active' | 'createdAt' | 'updatedAt' | 'slug'>
) => {
  const [firestoreLite, serverTimestamp, addDoc, collection] =
    await Promise.all([
      import('@listic/core/firebase/firestore-lite').then(
        (m) => m.firestoreLite
      ),
      import('firebase/firestore/lite').then((m) => m.serverTimestamp),
      import('firebase/firestore/lite').then((m) => m.addDoc),
      import('firebase/firestore/lite').then((m) => m.collection),
    ]);

  const data: Offer = {
    ...offer,
    active: true,
    slug: slugify(offer.name, { lower: true, strict: true }),
    createdAt: serverTimestamp() as unknown as Timestamp,
    updatedAt: serverTimestamp() as unknown as Timestamp,
  };

  const docRef = await addDoc(
    collection(firestoreLite, Collection.OFFERS),
    data
  );
  return { id: docRef.id, offer: data, docRef };
};
