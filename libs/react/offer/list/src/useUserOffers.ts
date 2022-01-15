import { Collection } from '@listic/core-firebase-utils';
import { Offer } from '@listic/feature-offer-types';
import { useAuth } from '@listic/react/auth/core';
import { useCallback, useEffect, useState } from 'react';

export interface OfferWithId extends Offer {
  id: string;
}

export const useUserOffers = () => {
  const { uid } = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<OfferWithId[]>([]);

  const fetchUserOffers = useCallback(async () => {
    if (!uid) return;

    const [query, collection, where, orderBy, getDocs, firestoreLite] =
      await Promise.all([
        import('firebase/firestore/lite').then((m) => m.query),
        import('firebase/firestore/lite').then((m) => m.collection),
        import('firebase/firestore/lite').then((m) => m.where),
        import('firebase/firestore/lite').then((m) => m.orderBy),
        import('firebase/firestore/lite').then((m) => m.getDocs),
        import('@listic/core/firebase/firestore-lite').then(
          (m) => m.firestoreLite
        ),
      ]);

    const offersQuery = query(
      collection(firestoreLite, Collection.OFFERS),
      where('owner.id', '==', uid),
      orderBy('createdAt')
    );

    const snapshot = await getDocs(offersQuery);

    setData(
      snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as OfferWithId))
    );
    setLoading(false);
  }, [uid]);

  useEffect(() => {
    fetchUserOffers();
  }, [fetchUserOffers]);

  return { data, isLoading };
};
