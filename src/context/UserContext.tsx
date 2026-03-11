"use client";
import {
  createContext,
  useContext,
  useSyncExternalStore,
  useCallback,
  useEffect,
} from "react";
import { useRouter, usePathname } from "next/navigation";

interface UserContextType {
  username: string | null;
  login: (name: string) => void;
  isReady: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const getServerSnapshot = () => null;

const getSnapshot = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("@codeleap:username");
};

const subscribe = (callback: () => void) => {
  const handleStorage = (e: StorageEvent) => {
    if (e.key === "@codeleap:username") {
      callback();
    }
  };
  window.addEventListener("storage", handleStorage);
  return () => window.removeEventListener("storage", handleStorage);
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const username = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const isReady = typeof window !== "undefined";
  const router = useRouter();
  const pathname = usePathname();

  const login = useCallback(
    (name: string) => {
      localStorage.setItem("@codeleap:username", name);
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "@codeleap:username",
          newValue: name,
        }),
      );
      router.push("/feed");
    },
    [router],
  );

  const logout = useCallback(() => {
    localStorage.removeItem("@codeleap:username");
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "@codeleap:username",
        newValue: null,
      }),
    );
    router.push("/");
  }, [router]);

  useEffect(() => {
    if (!isReady) return;

    if (username && pathname === "/") {
      router.push("/feed");
    } else if (!username && pathname !== "/") {
      router.push("/");
    }
  }, [username, pathname, router, isReady]);

  if (!isReady) {
    return <div className="bg-[#DDDDDD] h-screen" />;
  }

  return (
    <UserContext.Provider value={{ username, login, isReady: true, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
