"use client";

import { io } from "socket.io-client";
import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "next-auth";
import { useUsers } from "@/contexts/onlineUsersContext";
import { AcceptModal } from "@/components/acceptModal/acceptModal";
import { useRouter } from "next/navigation";
import { checkAccess } from "@/lib/actions";

type SocketContextType = {
  socket: any | null;
  roomId: string | null;
  players: string[];
  room: any;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  roomId: null,
  room: null,
  players: [],
  isConnected: false,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children, session }: { children: React.ReactNode; session: Session }) => {
  const [socket, setSocket] = useState(null);
  const { setUsers } = useUsers();
  const [isConnected, setIsConnected] = useState(false);
  const [invite, setInvite] = useState(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const router = useRouter();
  const [roomId, setRoomId] = useState<string | null>(null);
  const [room, setRoom] = useState<any>(null);
  const [players, setPlayers] = useState<string[]>([]);

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
      socket.on("game_invite", (invite) => {
        setInvite(invite);
        setIsInviteModalOpen(true);
      });

      socket.on("room_joined", async (roomId, room) => {
        const access: boolean = await checkAccess(roomId, session.user.id);
        if (access) {
          setRoom(room);
          setRoomId(roomId);
          router.push(`/game-field/${roomId}`);
        } else {
          router.push("/");
        }
      });
      socket.on("player_names", (players) => {
        setPlayers(players);
      });
    });

    setSocket(socket);

    return () => {
      socket.off("connect");
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, roomId, room, players, isConnected }}>
      {/*TODO: баг с модалкой (модалка ничьи и принятия приглашения когда вместе курсор не работает)*/}
      <AcceptModal
        isOpen={isInviteModalOpen}
        setIsOpen={setIsInviteModalOpen}
        invite={invite}
        onAccept={() => {
          socket.emit("accept_invite", invite.room);
          setIsInviteModalOpen(false);
        }}
        onReject={() => {
          setIsInviteModalOpen(false);
        }}
      />
      {children}
    </SocketContext.Provider>
  );
};
