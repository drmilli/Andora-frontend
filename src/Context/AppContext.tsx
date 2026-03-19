import { createContext, useEffect, useState, type ReactNode } from "react";  
import type { User } from "../types/auth";

interface AppContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}


export const AppContext = createContext<AppContextType | undefined>(undefined);

export default function AppProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null);
    const [user, setUser] = useState<User | null>(null);

async function getUser() {
  if (token) {
    const res = await fetch("/api/user", {
      headers: {    
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();  
    //if the response is ok, set the user data
    if(res.ok){
    setUser(data);
    }

    console.log("User data fetched:", data);    
    }
}
useEffect(() => {
if (token) {
      getUser();
    }

}, [token]);

  return (
    <AppContext.Provider value={{token, setToken,user,setUser}}>
      {children}
    </AppContext.Provider>
  );
}