"use client";
import PlayerCard from "@/components/ui/playerCard/playerCard";
import CrossS from "/public/crossS.svg";
import ZeroS from "/public/zeroS.svg";
import { useContext } from "react";
import { OnlinePlayContext } from "@/contexts/singlePlayContext";

export default function PlayersPanel() {
  const active = useContext(OnlinePlayContext);
  return (
    <div className="shadow-container w-fit rounded-[20px] p-6 w-full max-w-[500px]">
      <p className="mb-6 font-bold text-2xl">Игроки</p>
      <div className="flex flex-col gap-5">
        {/*TODO: заменить placehodler на данные */}
        <PlayerCard
          image={CrossS}
          name={active ? "placeholder1" : "Игрок 1"}
        />
        <PlayerCard
          image={ZeroS}
          name={active ? "placeholder2" : "Игрок 2"}
        />
      </div>
    </div>
  );
}
