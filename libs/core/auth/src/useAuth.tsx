import { createContext, useContext, useEffect, useState } from 'react';
import {
  getAuth,
  connectAuthEmulator,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { app } from '@listic/core/firebase';

const auth = getAuth(app);

if (process.env.NEXT_PUBLIC_FIREBASE_EMULATORS_ENABLED === 'true') {
  connectAuthEmulator(
    auth,
    `http://${process.env.NEXT_PUBLIC_FIREBASE_EMULATORS_HOST}:9099`
  );
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

  return {
    uid,
    user,
    isLoading,
    isAuthenticated,
  };
};

export const useAuth = () => {
  return useContext(AuthContext);
};
