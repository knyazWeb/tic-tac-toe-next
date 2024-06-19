"use client";
import PlayerCard from "@/components/ui/playerCard/playerCard";
import CrossS from "/public/crossS.svg";
import ZeroS from "/public/zeroS.svg";
import { useContext } from "react";
import { OnlinePlayContext } from "@/contexts/onlinePlayContext";
import { useSocket } from "@/socket/socket";

export default function PlayersPanel() {
  const active = useContext(OnlinePlayContext);
  const { room } = useSocket();

  return (
    <div className="shadow-container w-full rounded-[20px] p-6 max-w-[500px]">
      <p className="mb-6 font-bold text-2xl">Игроки</p>
      <div className="flex flex-col gap-5">
        <PlayerCard
          image={CrossS}
          name={active ? room.players[0] : "Игрок 1"}
        />
        <PlayerCard
          image={ZeroS}
          name={active ? room.players[1] : "Игрок 2"}
        />
      </div>
    </div>
  );
}
