import { useAuth } from '@listic/core/auth';
import { Document, firestore } from '@listic/core/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { UserProfile } from '..';

export const useUserProfile = () => {
  const { uid, isAuthenticated } = useAuth();
  const [data, setData] = useState<UserProfile | null>(null);

  const fetchUserProfile = useCallback(async () => {
    if (!isAuthenticated) {
      return setData(null);
    }

    if (uid) {
      const docRef = doc(firestore, Document.forUser(uid).USER_PROFILE);
      const docSnap = await getDoc(docRef);
      const profile = docSnap.exists() ? docSnap.data() : null;
      setData(profile as UserProfile);
    }
  }, [isAuthenticated, uid]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return { user: data };
};
