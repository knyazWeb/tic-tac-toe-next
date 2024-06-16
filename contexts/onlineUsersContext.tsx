"use client";
import React, { createContext, useContext, useState } from "react";

export interface UserOnline {
  username: string;
  socketId: string;
  room: string | null;
  gameStatus: string;
  blocked: string[];
}

const OnlineUsersContext = createContext<{
  users: UserOnline[];
  setUsers: React.Dispatch<React.SetStateAction<UserOnline[]>>;
}>({
  users: [],
  setUsers: () => {},
});

export const OnlineUsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<UserOnline[]>([]);

  return <OnlineUsersContext.Provider value={{ users, setUsers }}>{children}</OnlineUsersContext.Provider>;
};

export const useUsers = () => useContext(OnlineUsersContext);
