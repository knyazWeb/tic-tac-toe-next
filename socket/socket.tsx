"use client";

import { io } from "socket.io-client";
import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "next-auth";
import { UserOnline, useUsers } from "@/contexts/onlineUsersContext";
import { AcceptModal } from "@/components/acceptModal/acceptModal";
import { useRouter } from "next/navigation";
import { IInvite, IRoom, SocketContextType } from "@/socket/interfaces";

const SocketContext = createContext<SocketContextType>({
  socket: null,
  roomId: null,
  room: {
    players: [],
    board: [],
    turn: "",
    timer: 0,
  },
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children, session }: { children: React.ReactNode; session: Session }) => {
  const [isConnected, setIsConnected] = useState(false);
  const { setUsers } = useUsers();
  const [invite, setInvite] = useState<IInvite | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [room, setRoom] = useState<any>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [socket, setSocket] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_SERVER_URL}`);

    // Connect to server when open home page (authorized)
    socket.on("connect", () => {
      console.log("Connected to server");
      setIsConnected(true);

      // Registration user in socket when user is authorized
      if (session.user) {
        socket.emit("register", session.user.name, session.user.id);

        // Get online users
        socket.on("users_online", (onlineUsers) => {
          setUsers(onlineUsers.filter((userOnline: UserOnline) => userOnline.username !== session.user.name));
        });
      }

      // Listen to the server for an invitation to the game
      socket.on("game_invite", (invite: IInvite) => {
        setInvite(invite);
        setIsInviteModalOpen(true);
      });

      // Listen when game starts
      socket.on("game_started", (room: IRoom, roomId: string) => {
        if (room && roomId) {
          setRoomId(roomId);
          setRoom(room);
          router.push(`/game-field/${roomId}`);
        } else {
          router.push("/active-players");
        }
      });
    });

    setSocket(socket);

    return () => {
      socket.off("connect");
      socket.off("game_invite");
      socket.off("game_started");
      socket.off("users_online");

      // Disconnect
      socket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, roomId, room, isConnected }}>
      {/*TODO: баг с модалкой (модалка ничьи и принятия приглашения когда вместе курсор не работает)*/}
      <AcceptModal
        isOpen={isInviteModalOpen}
        setIsOpen={setIsInviteModalOpen}
        invite={invite}
        onAccept={() => {
          socket.emit("accept_invite", invite.roomId);
          setIsInviteModalOpen(false);
        }}
        onReject={() => {
          socket.emit("reject_invite", invite.roomId);
          setIsInviteModalOpen(false);
        }}
      />
      {children}
    </SocketContext.Provider>
  );
};
