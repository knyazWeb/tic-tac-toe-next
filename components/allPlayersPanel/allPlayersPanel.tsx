"use client";
import { User } from "@/lib/interfaces";
import SecondaryButton from "@/components/ui/secondaryButton/secondaryButton";
import PlayerStatusCard from "@/components/ui/playerStatusCard/playerStatusCard";
import { Ban } from "lucide-react";
import { blockUser, unblockUser } from "@/lib/actions";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import Loader from "@/components/allPlayersPanel/loader/loader";

export default function AllPlayersPanel({ session }: { session: Session }) {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [buttonActive, setButtonActive] = useState<boolean>(true);
  const [blockedUsers, setBlockedUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setAllUsers(data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const currentUser = allUsers.find((user: User) => user.login === session.user.name);
    setBlockedUsers(currentUser ? currentUser.blocked : []);
  }, [allUsers]);

  if (loading) {
    return <Loader />;
  }

  const handleUserBlock = async (currentName: string, userName: string) => {
    setButtonActive(false);
    await blockUser(currentName, userName);
    setBlockedUsers([...blockedUsers, userName]);
    setButtonActive(true);
  };

  const handleUserUnblock = async (currentName: string, userName: string) => {
    setButtonActive(false);
    await unblockUser(currentName, userName);
    setBlockedUsers(blockedUsers.filter((user) => user !== userName));
    setButtonActive(true);
  };

  return (
    <div className="w-full max-w-[1000px] max-h-[calc(100vh-100px)] overflow-y-scroll scrollbar-hide p-8 bg-white rounded-[40px] shadow-container">
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-bold">Список игроков</p>
      </div>
      <div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-start pb-2 w-[40%]">ФИО</th>
              <th className="text-start pb-2 w-[20%]">Статус</th>
              <th className="text-start pb-2 w-[20%]">Создан</th>
              <th className="text-start pb-2 w-[20%]"></th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user: User) => {
              if (user.login === session.user.name) return null;
              const createdDate = new Date(user.created_at)
                .toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
                .replace(" г.", "");
              return (
                <tr
                  key={user.login}
                  className="border-b border-t border-t-gray-200 border-b-gray-200
                 "
                >
                  <td className="py-2">{user.login}</td>
                  <td className="py-2 pr-10">
                    <PlayerStatusCard
                      status={blockedUsers.includes(user.login) ? "Заблокирован" : "Активен"}
                      size="medium"
                    />
                  </td>
                  <td className="py-2">{createdDate}</td>
                  <td className="py-2">
                    {blockedUsers.includes(user.login) ? (
                      <SecondaryButton
                        onClick={() => handleUserUnblock(session.user.name, user.login)}
                        size="small"
                        type="button"
                        active={buttonActive}
                      >
                        Разблокировать
                      </SecondaryButton>
                    ) : (
                      <SecondaryButton
                        onClick={() => handleUserBlock(session.user.name, user.login)}
                        size="small"
                        type="button"
                        active={buttonActive}
                      >
                        <Ban
                          color={"#373745"}
                          size={20}
                          className="inline"
                        />
                        Заблокировать
                      </SecondaryButton>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
