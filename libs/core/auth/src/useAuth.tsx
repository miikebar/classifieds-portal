import { Collection, firestore } from '@listic/core/firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut as authSignOut,
  signInWithEmailAndPassword,
  User,
  UserProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth } from './auth';
import { SignInData } from './signin/SignInSchema';
import { SignUpData } from './signup/SignupSchema';

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

  const signIn = useCallback(({ email, password }: SignInData) => {
    return signInWithEmailAndPassword(auth, email, password);
  }, []);

  const signOut = useCallback(() => {
    return authSignOut(auth);
  }, []);

  return {
    uid,
    user,
    isLoading,
    isAuthenticated,
    createUser,
    signIn,
    signOut,
  };
};

export const useAuth = () => {
  return useContext(AuthContext);
};
