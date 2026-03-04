'use client';

import { createContext, useContext } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';

interface AuthContextType {
  user: { id: string; email: string; name: string | null } | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<unknown>;
  signup: (email: string, password: string, name?: string) => Promise<unknown>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
