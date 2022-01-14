import { Collection } from '@listic/core-firebase-utils';
import { useCallback, useState } from 'react';
import { Offer } from '@listic/feature-offer-types';

export const useOfferStatusManager = (offerId: string | undefined) => {
  const [isPending, setPending] = useState(false);

  const setActive = useCallback(
    async (isActive: boolean) => {
      if (!offerId) {
        return;
      }

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
        await updateDoc(offerDoc, { isActive } as Partial<Offer>);
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
