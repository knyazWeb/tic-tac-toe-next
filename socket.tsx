"use client";

import { io } from "socket.io-client";
import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "next-auth";
import { useUsers } from "@/contexts/onlineUsersContext";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children, session }: { children: React.ReactNode; session: Session }) => {
  const [socket, setSocket] = useState(null);
  const { setUsers } = useUsers();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_SERVER_URL}`);

    socket.on("connect", () => {
      console.log("connected to server");
      setIsConnected(true);

      if (session.user) {
        socket.emit("register", session.user.name, session.user.id);
        socket.on("users_online", (onlineUsers) => {
          setUsers(onlineUsers.filter((u) => u.username !== session.user.name));
        });
      }
    });
    setSocket(socket);

    return () => {
      socket.off("connect");
    };
  }, []);

  return <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>;
};
