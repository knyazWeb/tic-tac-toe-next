"use client";

import { useEffect, useState } from "react";
import Loader from "./loader/loader";
import { Session } from "next-auth";
import WinnerS from "/public/winner.svg";
import Image from "next/image";
import CrossS from "/public/crossS.svg";
import ZeroS from "/public/zeroS.svg";

interface Game {
  player1: string;
  player2: string;
  winner: string;
  time: Date;
  createdAt: Date;
}

export default function HistoryGamePanel({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<Game[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const login = session.user.name;
      const res = await fetch(`/api/games?`, {
        method: "GET",
      });
      const data = await res.json();
      setGames(data.reverse());
      setLoading(false);
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="w-full max-w-[1000px] max-h-[855px] overflow-y-scroll scrollbar-hide p-8 bg-white rounded-[40px] shadow-container">
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-bold">История игр</p>
      </div>
      <div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-start pb-2 w-[25%]">Игроки</th>
              <th className="text-start pb-2 w-[10%]"></th>
              <th className="text-start pb-2 w-[30%]"></th>
              <th className="text-start pb-2 w-[20%]">Дата</th>
              <th className="text-start pb-2 w-[15%]">Время игры</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game: Game, index) => {
              const dateGame = new Date(game.time)
                .toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
                .replace(" г.", "");
              const timeGame = new Date(game.createdAt).toLocaleTimeString("ru-RU", {
                hour: "numeric",
                minute: "numeric",
              });
              return (
                <tr
                  key={index}
                  className="border-b border-t border-t-gray-200 border-b-gray-200"
                >
                  <td className="text-start py-2 ">
                    <div className="flex gap-2 text-ellipsis overflow-hidden whitespace-nowrap">
                      <Image
                        width={20}
                        height={20}
                        src={CrossS}
                        alt=""
                      />
                      {game.player1}
                      {game.winner === game.player1 && (
                        <Image
                          width={20}
                          height={20}
                          src={WinnerS}
                          alt=""
                        />
                      )}
                    </div>
                  </td>
                  <td className="text-start py-2 font-bold">против</td>
                  <td className="text-start py-2 ">
                    <div className="flex gap-2 text-ellipsis overflow-hidden whitespace-nowrap">
                      <Image
                        width={20}
                        height={20}
                        src={ZeroS}
                        alt=""
                      />
                      {game.player2}
                      {game.winner === game.player2 && (
                        <Image
                          width={20}
                        height={20}
                          
                          src={WinnerS}
                          alt=""
                        />
                      )}
                    </div>
                  </td>
                  <td className="text-start py-2 ">{dateGame}</td>
                  <td className="text-start py-2 ">{timeGame}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
