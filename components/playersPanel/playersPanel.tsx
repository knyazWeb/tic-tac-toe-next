"use client";

import PlayerCard from "@/components/ui/playerCard/playerCard";
import CrossS from "/public/crossS.svg";
import ZeroS from "/public/zeroS.svg";
import { useContext, useEffect, useState } from "react";
import { OnlinePlayContext } from "@/contexts/onlinePlayContext";
import { useSocket } from "@/socket/socket";
import { ChevronUp } from "lucide-react";

export default function PlayersPanel() {
  const active = useContext(OnlinePlayContext);
  const { room } = useSocket();
  const [isOpen, setIsOpen] = useState(true);

  const [rating, setRating] = useState([]);
  const [player1Winrate, setPlayer1Winrate] = useState();
  const [player2Winrate, setPlayer2Winrate] = useState();

  useEffect(() => {
    if(active){
       const fetchUsers = async () => {
         const res = await fetch(`/api/rating`, {
           method: "GET",
         });
         const data = await res.json();
         setRating(data);
       };
       fetchUsers();
    }
   
  }, []);

  useEffect(() => {
    if (rating.length > 0 && active) {
      const player1 = rating.find((user) => user.player === room.players[0]);
      const player2 = rating.find((user) => user.player === room.players[1]);
      setPlayer1Winrate(player1?.PercentageOfWins.toFixed(0));
      setPlayer2Winrate(player2?.PercentageOfWins.toFixed(0));
    }
  }, [rating]);

  return (
    <div
      className={`shadow-container w-full rounded-[20px] p-6 max-w-[500px] mobile:mb-1 mobile:${
        isOpen ? "h-[160px]" : "h-fit"
      } `}
    >
      <div
        className={`font-bold text-2xl mobile:flex mobile:justify-between mobile:text-base mobile:items-center ${
          isOpen ? "mb-6" : "mb-0"
        } `}
      >
        Игроки
        <ChevronUp
          onClick={() => setIsOpen(!isOpen)}
          size={20}
          className={`cursor-pointer hover:text-accent duration-200 ease-in-out transition-all hidden mobile:block ${isOpen ? "" : "rotate-180"}`}
        />
      </div>
      <div className={`flex flex-col gap-5 mobile:text-sm mobile:${isOpen ? "flex" : "hidden"}`}>
        <PlayerCard
          winrate={player1Winrate}
          image={CrossS}
          name={active ? room.players[0] : "Игрок 1"}
        />
        <PlayerCard
          winrate={player2Winrate}
          image={ZeroS}
          name={active ? room.players[1] : "Игрок 2"}
        />
      </div>
    </div>
  );
}
