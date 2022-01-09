import { Document } from '@listic/core-firebase-utils';
import { useAuth } from '@listic/react/auth/core';
import { useCallback, useEffect, useState } from 'react';
import type { UserProfile } from '@listic/core-user-types';

export const useUserProfile = () => {
  const { uid, isAuthenticated, isProfileCreationPending } = useAuth();
  const [data, setData] = useState<UserProfile | null>(null);

  const fetchUserProfile = useCallback(async () => {
    if (!isAuthenticated || isProfileCreationPending) {
      return setData(null);
    }

    if (uid) {
      const [doc, getDoc, firestoreLite] = await Promise.all([
        import('firebase/firestore/lite').then((m) => m.doc),
        import('firebase/firestore/lite').then((m) => m.getDoc),
        import('@listic/core/firebase/firestore-lite').then(
          (m) => m.firestoreLite
        ),
      ]);

      const docRef = doc(firestoreLite, Document.forUser(uid).USER_PROFILE);
      const docSnap = await getDoc(docRef);
      const profile = docSnap.exists() ? docSnap.data() : null;
      setData(profile as UserProfile);
    }
  }, [isAuthenticated, isProfileCreationPending, uid]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return { user: data, setData };
};
