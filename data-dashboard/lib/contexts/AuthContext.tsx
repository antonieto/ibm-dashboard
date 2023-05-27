import { createContext, useEffect, useState } from 'react';
import { User } from '@/server/models';
import trpc from '../hooks/trpc';

interface AuthPayload {
  user: Omit<User, 'password'> | null;
}

export const AuthContext = createContext<AuthPayload | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

const DEFAULT_AUTH_STATE: AuthPayload = {
  user: null,
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [auth, setAuth] = useState<AuthPayload>(DEFAULT_AUTH_STATE);
  const { data, isLoading } = trpc.auth.me.useQuery();

  useEffect(() => {
    if (data !== undefined && !isLoading) {
      setAuth({
        user: {
          createdAt: new Date(data.user.createdAt),
          email: data.user.email,
          id: data.user.id,
        },
      });
    } else {
      setAuth(DEFAULT_AUTH_STATE);
    }
  }, [data, isLoading]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
