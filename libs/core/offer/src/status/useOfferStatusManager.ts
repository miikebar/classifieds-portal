import { useCallback, useState } from 'react';
import { Collection, firestore } from '@listic/core/firebase';
import { updateDoc, doc } from 'firebase/firestore';
import { Offer } from '..';

export const useOfferStatusManager = (offerId: string) => {
  const [isPending, setPending] = useState(false);

  const setActive = useCallback(
    async (isActive: boolean) => {
      try {
        setPending(true);
        const offerDoc = doc(firestore, Collection.OFFERS, offerId);
        await updateDoc(offerDoc, { active: isActive } as Partial<Offer>);
      } catch (error) {
        console.error(error);
      } finally {
        setPending(false);
      }
    },
    [offerId]
  );

  return { isPending, setActive };
};
