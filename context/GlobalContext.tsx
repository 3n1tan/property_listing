'use client';
import { useState, createContext, useContext } from "react";

export const GlobalContext = createContext({} as any);

export function GlobalProvider({ children }: any) {
    const [count, setCount] = useState(0);
    
    return (
        <GlobalContext.Provider value={{
        count,
        setCount,
        }}>
        {children}
        </GlobalContext.Provider>
    );
    
}


export function useGlobal() {
  return useContext(GlobalContext);
}
