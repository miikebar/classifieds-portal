import { Collection } from '@listic/core-firebase-utils';
import { firestore } from '@listic/core/firebase/firestore';
import { Offer } from '@listic/feature-offer-types';
import { useAuth } from '@listic/react/auth/core';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

export interface OfferWithId extends Offer {
  id: string;
}

export const useUserOffers = () => {
  const { uid } = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<OfferWithId[]>([]);

  const fetchUserOffers = useCallback(() => {
    if (!uid) return;

    const offersQuery = query(
      collection(firestore, Collection.OFFERS),
      where('owner.id', '==', uid),
      orderBy('createdAt')
    );

    const unsubscribe = onSnapshot(offersQuery, (snapshot) => {
      setLoading(false);
      setData(
        snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as OfferWithId)
        )
      );
    });

    return unsubscribe;
  }, [uid]);

  useEffect(() => {
    return fetchUserOffers();
  }, [fetchUserOffers]);

  return { data, isLoading };
};
