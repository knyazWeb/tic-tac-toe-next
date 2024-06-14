"use client";
import SwitchToggle from "@/components/ui/switchToggle/switchToggle";
import ActivePlayerCard from "@/components/ui/activePlayerCard/activePlayerCard";

import { useUsers } from "@/contexts/onlineUsersContext";
import { useState } from "react";

export default function ActivePlayerPanel() {
  const { users } = useUsers();
  const [onlyFree, setOnlyFree] = useState(false);
  return (
    <div className="w-full max-w-[780px]  max-h-[855px] overflow-y-scroll scrollbar-hide p-8 bg-white rounded-[40px] shadow-container">
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-bold">Активные игроки</p>
        <div className="flex gap-3 items-center">
          Только свободные
          <SwitchToggle
            enabled={onlyFree}
            setEnabled={setOnlyFree}
          />
        </div>
      </div>
      <div>
        {users.map((user, index) => {
          if (onlyFree && user.gameStatus === "Свободен") {
            return (
              <ActivePlayerCard
                key={index}
                status={user.gameStatus}
                name={user.username}
              />
            );
          } else {
            return (
              <ActivePlayerCard
                key={index}
                status={user.gameStatus}
                name={user.username}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
