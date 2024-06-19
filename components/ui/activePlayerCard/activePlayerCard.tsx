"use client";
import PlayerStatusCard from "@/components/ui/playerStatusCard/playerStatusCard";
import CustomButton from "@/components/ui/customButton/customButton";
import { useState } from "react";
import toast from "react-hot-toast";

interface ActivePlayerCardProps {
  name: string;
  status: string;
  inviteUser: (username: string) => void;
}

export default function ActivePlayerCard({ name, status, inviteUser }: ActivePlayerCardProps) {
  const [isInviteAccept, setIsInviteAccept] = useState(true);
  return (
    <div className="w-fill max-w-[715px] h-[70px] flex justify-between items-center">
      <div className="text-ellipsis overflow-hidden whitespace-nowrap">{name}</div>
      <div className="flex justify-between items-center gap-[80px]">
        <div>
          <PlayerStatusCard
            status={status}
            size="medium"
          />
        </div>
        <div>
          <CustomButton
            onClick={() => {
              inviteUser(name);
              toast.success("Приглашение отправлено");
              setIsInviteAccept(false);
              setTimeout(() => {
                setIsInviteAccept(true);
              }, 10000);
            }}
            size="medium"
            type={"button"}
            active={status !== "В игре" && isInviteAccept}
          >
            Позвать играть
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
