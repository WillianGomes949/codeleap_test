// UserContext.tsx
'use client';
import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface UserContextType {
  username: string | null;
  login: (name: string) => Promise<void>;
  logout: () => Promise<void>;
  isReady: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

function LoadingScreen() {
  return (
    <div className="bg-neutral-100 min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary-blue border-t-transparent rounded-full animate-spin" />
        <p className="text-neutral-500 font-medium animate-pulse">Loading experience...</p>
      </div>
    </div>
  );
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // 1. Carregamento inicial da sessão (cookie) - funciona em qualquer navegador
  useEffect(() => {
    const initUser = async () => {
      try {
        const res = await fetch('/api/auth/session', {
          credentials: 'include',
        });
        const data = await res.json();
        if (data.user) {
          setUsername(data.user.username);
        }
      } catch (error) {
        console.error('Error accessing session:', error);
      } finally {
        setIsReady(true);
      }
    };

    initUser();
  }, []);

  // 2. Gerenciamento de Redirecionamento Protegido
  useEffect(() => {
    if (!isReady) return;

    const isPublicRoute = pathname === '/';

    if (username && isPublicRoute) {
      router.replace('/feed');
    } else if (!username && !isPublicRoute) {
      router.replace('/');
    }
  }, [username, pathname, isReady, router]);

  const login = useCallback(async (name: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name }),
        credentials: 'include',
      });

      const data = await res.json();

      if (res.ok && data.user) {
        setUsername(data.user.username);
        // O useEffect acima cuidará do redirecionamento automaticamente
      } else {
        throw new Error(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUsername(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }, []);

  // Memoriza o valor do context para evitar re-renders desnecessários
  const contextValue = useMemo(() => ({
    username,
    login,
    logout,
    isReady
  }), [username, login, logout, isReady]);

  // Bloqueia a renderização até que a sessão tenha sido verificada
  if (!isReady) {
    return <LoadingScreen />;
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};