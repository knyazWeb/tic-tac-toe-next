"use client";
import { createContext } from "react";

export const OnlinePlayContext = createContext(null);

export const OnlinePlayProvider = ({ children, value }: { children: React.ReactNode; value: boolean }) => {
  return <OnlinePlayContext.Provider value={value}>{children}</OnlinePlayContext.Provider>;
};
