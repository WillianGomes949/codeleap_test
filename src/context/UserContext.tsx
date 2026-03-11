// UserContext.tsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface UserContextType {
  username: string | null;
  login: (name: string) => void;
  isReady: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Componente de loading que renderiza o mesmo no servidor e cliente
function LoadingScreen() {
  return (
    <div className="bg-[#DDDDDD] min-h-screen flex items-center justify-center">
      <div className="animate-pulse">
        <div className="h-8 w-32 bg-gray-300 rounded-md" />
      </div>
    </div>
  );
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Marca como montado apenas no cliente
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Carrega dados do localStorage apenas no cliente
  useEffect(() => {
    if (!isMounted) return;
    
    try {
      const storedUsername = localStorage.getItem('@codeleap:username');
      setUsername(storedUsername);
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
    setIsReady(true);
  }, [isMounted]);

  // Gerencia redirecionamentos
  useEffect(() => {
    if (!isReady || !isMounted) return;

    if (username) {
      if (pathname === '/') {
        router.push('/feed');
      }
    } else {
      if (pathname !== '/') {
        router.push('/');
      }
    }
  }, [username, pathname, router, isReady, isMounted]);

  const login = (name: string) => {
    try {
      localStorage.setItem('@codeleap:username', name);
      setUsername(name);
      router.push('/feed');
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('@codeleap:username');
      setUsername(null);
      router.push('/');
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  };

  // Durante SSR e hidratação inicial, mostra tela de loading
  // Isso garante que servidor e cliente renderizem o mesmo HTML
  if (!isMounted || !isReady) {
    return <LoadingScreen />;
  }

  return (
    <UserContext.Provider value={{ username, login, isReady, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};