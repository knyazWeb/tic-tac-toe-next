"use client";
import React, { createContext, useContext, useState } from "react";

interface User {
  username: string;
  blocked: any[];
  room: null | string;
  gameStatus: string;
}

const OnlineUsersContext = createContext<{
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}>({
  users: [],
  setUsers: () => {},
});

export const OnlineUsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  return <OnlineUsersContext.Provider value={{ users, setUsers }}>{children}</OnlineUsersContext.Provider>;
};

export const useUsers = () => useContext(OnlineUsersContext);
