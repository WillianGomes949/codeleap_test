// UserContext.tsx
'use client';
import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface UserContextType {
  username: string | null;
  login: (name: string) => void;
  logout: () => void;
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

  // 1. Carregamento inicial do localStorage (Roda apenas uma vez no mount do cliente)
  useEffect(() => {
    const initUser = () => {
      try {
        const storedUsername = localStorage.getItem('@codeleap:username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error('Error accessing localStorage:', error);
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
      router.replace('/feed'); // Use replace para não sujar o histórico
    } else if (!username && !isPublicRoute) {
      router.replace('/');
    }
  }, [username, pathname, isReady, router]);

  const login = useCallback((name: string) => {
    try {
      localStorage.setItem('@codeleap:username', name);
      setUsername(name);
      // O useEffect acima cuidará do redirecionamento automaticamente
    } catch (error) {
      console.error('Error saving user:', error);
    }
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('@codeleap:username');
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

  // Bloqueia a renderização até que o localStorage tenha sido verificado
  // Isso evita o "flash" de conteúdo não autenticado ou erros de hidratação
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