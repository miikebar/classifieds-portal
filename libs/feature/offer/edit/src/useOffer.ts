import { Collection } from '@listic/core-firebase-utils';
import { Offer } from '@listic/feature-offer-types';
import { useCallback, useEffect, useState } from 'react';

interface UseOfferProps {
  offerId: string;
}

export const useOffer = ({ offerId }: UseOfferProps) => {
  const [data, setData] = useState<Offer | null>(null);
  const [exists, setExists] = useState(true);

  const fetchOfferData = useCallback(async () => {
    try {
      const [getDoc, doc, firestoreLite] = await Promise.all([
        import('firebase/firestore/lite').then((m) => m.getDoc),
        import('firebase/firestore/lite').then((m) => m.doc),
        import('@listic/core/firebase/firestore-lite').then(
          (m) => m.firestoreLite
        ),
      ]);
      const offerDoc = await getDoc(
        doc(firestoreLite, `${Collection.OFFERS}/${offerId}`)
      );
      setData(offerDoc.data() as Offer);
    } catch (error) {
      setExists(false);
    }
  }, [offerId]);

  useEffect(() => {
    fetchOfferData();
  }, [fetchOfferData]);

  return { data, exists };
};
