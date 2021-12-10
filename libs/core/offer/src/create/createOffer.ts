import { Collection, firestore } from '@listic/core/firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { Offer } from '../types/Offer';
import slugify from 'slugify';

export const createOffer = async (
  offer: Omit<Offer, 'active' | 'createdAt' | 'updatedAt' | 'slug'>
) => {
  const data: Offer = {
    ...offer,
    active: true,
    slug: slugify(offer.name, { lower: true, strict: true }),
    createdAt: serverTimestamp() as unknown as Timestamp,
    updatedAt: serverTimestamp() as unknown as Timestamp,
  };
  const docRef = await addDoc(collection(firestore, Collection.OFFERS), data);
  return { id: docRef.id, offer: data };
};
