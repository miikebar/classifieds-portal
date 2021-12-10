import { Collection, firestore } from '@listic/core/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { Offer } from '../types/Offer';

export const createOffer = async (offer: Offer) => {
  const docRef = await addDoc(collection(firestore, Collection.OFFERS), offer);
  return { id: docRef.id, offer };
};
