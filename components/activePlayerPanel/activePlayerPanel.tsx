"use client";
import SwitchToggle from "@/components/ui/switchToggle/switchToggle";
import ActivePlayerCard from "@/components/ui/activePlayerCard/activePlayerCard";

import { useUsers } from "@/contexts/onlineUsersContext";
import { useEffect, useState } from "react";
import { useSocket } from "@/socket/socket";
import { User } from "@/lib/interfaces";
import { Session } from "next-auth";
import Loader from "@/components/activePlayerPanel/loader/loader";

export default function ActivePlayerPanel({ session }: { session: Session }) {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { users } = useUsers();
  const { socket } = useSocket();
  const [onlyFree, setOnlyFree] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setAllUsers(data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <Loader />;
  }
  const currentUser = allUsers.find((user: User) => user.login === session.user.name);

  const inviteUser = (username: string) => {
    socket.emit("invite_user", username);
  };

  return (
    <div className="w-full max-w-[780px] max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-hide p-8 bg-white rounded-[40px] shadow-container mobile:p-4 ">
      <div className="flex justify-between items-center mb-6 mobile:flex-col mobile:gap-4">
        <p className="text-2xl font-bold mobile:text-xl mobile:self-start">Активные игроки</p>
        <div className="flex gap-3 items-center mobile:text-sm mobile:self-end mr-1">
          Только свободные
          <SwitchToggle
            enabled={onlyFree}
            setEnabled={() => setOnlyFree(!onlyFree)}
          />
        </div>
      </div>
      <div className="mobile:overflow-x-auto mobile:min-w-[330px] scrollbar-hide">
        {users.map((user, index) => {
          if (currentUser.blocked.includes(user.username)) return null;
          if (onlyFree && user.gameStatus === "В игре") return null;
          if (onlyFree && user.gameStatus === "Свободен") {
            return (
              <ActivePlayerCard
                inviteUser={inviteUser}
                key={index}
                status={user.gameStatus}
                name={user.username}
              />
            );
          }
          return (
            <ActivePlayerCard
              inviteUser={inviteUser}
              key={index}
              status={user.gameStatus}
              name={user.username}
            />
          );
        })}
      </div>
    </div>
  );
}
