"use client";
import { createContext, useEffect } from "react";
import { useSocket } from "@/socket/socket";
import { useRouter } from "next/navigation";

export const OnlinePlayContext = createContext(null);

export const OnlinePlayProvider = ({ children, value }: { children: React.ReactNode; value: boolean }) => {
  const { room } = useSocket();
  const router = useRouter();

  useEffect(() => {
    if (!room && value === true) {
      router.push("/active-players");
    }
  }, [room, router]);

  if (!room && value === true) {
    return null;
  }
  return <OnlinePlayContext.Provider value={value}>{children}</OnlinePlayContext.Provider>;
};
