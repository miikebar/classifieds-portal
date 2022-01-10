import { Collection } from '@listic/core-firebase-utils';
import { useCallback, useState } from 'react';
import { Offer } from '@listic/feature-offer-types';

export const useOfferStatusManager = (offerId: string) => {
  const [isPending, setPending] = useState(false);

  const setActive = useCallback(
    async (isActive: boolean) => {
      try {
        setPending(true);
        const [firestoreLite, doc, updateDoc] = await Promise.all([
          import('@listic/core/firebase/firestore-lite').then(
            (m) => m.firestoreLite
          ),
          import('firebase/firestore/lite').then((m) => m.doc),
          import('firebase/firestore/lite').then((m) => m.updateDoc),
        ]);
        const offerDoc = doc(firestoreLite, Collection.OFFERS, offerId);
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
