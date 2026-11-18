import { createContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "../types/auth";
import axios from "axios";
import api from "../lib/axios";

interface AppContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}


// The context and its provider live together on purpose; fast refresh simply
// does a full reload when this file changes.
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(!!token);

  // Load the signed-in user whenever the token changes. `loading` starts true
  // when there is a stored token, and is cleared once the first fetch settles;
  // after a login, setUser has already been called, so no spinner is needed.
  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    api
      .get("/users/me")
      .then((res) => {
        if (!cancelled) setUser(res.data);
      })
      .catch((error) => {
        console.error("Failed to fetch user:", error);
        // 401: expired/invalid session. 403: account suspended.
        const status = axios.isAxiosError(error) ? error.response?.status : undefined;
        if (!cancelled && (status === 401 || status === 403)) {
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    // With no token there is nothing to wait for, whatever the fetch did
    <AppContext.Provider value={{ token, setToken, user, setUser, loading: loading && !!token }}>
      {children}
    </AppContext.Provider>
  );
}
