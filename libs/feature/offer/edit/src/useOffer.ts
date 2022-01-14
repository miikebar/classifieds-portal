import { Collection } from '@listic/core-firebase-utils';
import { firestore } from '@listic/core/firebase/firestore';
import { Offer } from '@listic/feature-offer-types';
import { doc, getDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

interface UseOfferProps {
  offerId: string;
}

export const useOffer = ({ offerId }: UseOfferProps) => {
  const [data, setData] = useState<Offer | null>(null);
  const [exists, setExists] = useState(true);

  const fetchOfferData = useCallback(async () => {
    try {
      const offerDoc = await getDoc(
        doc(firestore, `${Collection.OFFERS}/${offerId}`)
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
