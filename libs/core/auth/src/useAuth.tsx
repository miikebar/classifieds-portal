import { app, Collection, firestore } from '@listic/core/firebase';
import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  User,
  UserProfile,
  signOut as authSignOut,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { SignUpData } from './signup/SignupSchema';

const auth = getAuth(app);

if (
  process.env.NEXT_PUBLIC_FIREBASE_EMULATORS_ENABLED === 'true' &&
  typeof window !== 'undefined' &&
  !(window as any)._authEmulatorInit
) {
  connectAuthEmulator(
    auth,
    `http://${process.env.NEXT_PUBLIC_FIREBASE_EMULATORS_HOST}:9099`
  );
  (window as any)._authEmulatorInit = true;
}

type AuthContextData = ReturnType<typeof useProvideAuth>;
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const value = useProvideAuth();
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useProvideAuth = () => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;
  const uid = user?.uid;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const createUser = useCallback(
    async ({ name, surname, email, password, phone }: SignUpData) => {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(firestore, Collection.USERS, user.uid), {
        name,
        surname,
        email,
        ...{ phone },
      } as UserProfile);
    },
    []
  );

  const signOut = useCallback(() => {
    return authSignOut(auth);
  }, []);

  return {
    uid,
    user,
    isLoading,
    isAuthenticated,
    createUser,
    signOut,
  };
};

export const useAuth = () => {
  return useContext(AuthContext);
};
