import { createContext, useEffect, useState, type ReactNode } from "react";  
import type { User } from "../types/auth";
import api from "../lib/axios";

interface AppContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}


export const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(!!token);

async function getUser() {
  if (token) {
    try {
      setLoading(true);
      const res = await api.get("/users/me");
      setUser(res.data);
      console.log("User data fetched:", res.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      if ((error as any).response?.status === 401) {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
      }
    } finally {
      setLoading(false);
    }
  } else {
    setLoading(false);
  }
}

useEffect(() => {
  getUser();
}, [token]);

  return (
    <AppContext.Provider value={{token, setToken,user,setUser, loading}}>
      {children}
    </AppContext.Provider>
  );
}