import { Collection } from '@listic/core-firebase-utils';
import { onAuthStateChanged, User } from 'firebase/auth';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { SignUpData, SignInData } from '@listic/core/auth';
import { firebaseAuth } from '@listic/core/firebase/auth';

type AuthContextData = ReturnType<typeof useProvideAuth>;
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const value = useProvideAuth();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useProvideAuth = () => {
  const [isLoading, setLoading] = useState(true);
  const [isProfileCreationPending, setProfileCreationPending] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;
  const uid = user?.uid;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const createUser = useCallback(
    async ({ name, surname, email, password, phone }: SignUpData) => {
      try {
        setProfileCreationPending(true);

        const [
          createUserWithEmailAndPassword,
          doc,
          serverTimestamp,
          setDoc,
          firestoreLite,
        ] = await Promise.all([
          import('firebase/auth').then((m) => m.createUserWithEmailAndPassword),
          import('firebase/firestore/lite').then((m) => m.doc),
          import('firebase/firestore/lite').then((m) => m.serverTimestamp),
          import('firebase/firestore/lite').then((m) => m.setDoc),
          import('@listic/core/firebase/firestore-lite').then(
            (m) => m.firestoreLite
          ),
        ]);

        const { user } = await createUserWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        );

        await setDoc(doc(firestoreLite, Collection.USERS, user.uid), {
          name,
          surname,
          email,
          phone,
          createdAt: serverTimestamp(),
        });
      } catch (error) {
        console.error(error);
        throw error;
      } finally {
        setProfileCreationPending(false);
      }
    },
    []
  );

  const signIn = useCallback(async ({ email, password }: SignInData) => {
    const signInWithEmailAndPassword = await import('firebase/auth').then(
      (m) => m.signInWithEmailAndPassword
    );
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  }, []);

  const signOut = useCallback(async () => {
    const signOut = await import('firebase/auth').then((m) => m.signOut);
    return signOut(firebaseAuth);
  }, []);

  return {
    uid,
    user,
    isLoading,
    isAuthenticated,
    isProfileCreationPending,
    createUser,
    signIn,
    signOut,
  };
};

export const useAuth = () => {
  return useContext(AuthContext);
};
