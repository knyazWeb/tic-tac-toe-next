"use client";

import Square from "@/components/ui/square/square";
import { useEffect, useState } from "react";
import calculateWinner from "@/helpers/calculateWinner";
import { io } from "socket.io-client";
import StepPanel from "@/components/stepPanel/stepPanel";
import Timer from "@/components/timer/timer";

// const socket = io(`${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
//
// socket.on("connect", () => {
//   console.log("Connected to server");
// });

export default function GameField() {
  const [isCrossNext, setIsCrossNext] = useState(true);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [player, setPlayer] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  // useEffect(() => {
  //   socket.on("roomCreated", (roomId: string) => {
  //     setRoomId(roomId);
  //     setPlayer("X");
  //   });
  //
  //   socket.on("playerJoined", (roomId: string) => {
  //     setMessage(`Player joined the room: ${roomId}`);
  //   });
  //
  //   socket.on("moveMade", (board: (string | null)[]) => {
  //     setBoard(board);
  //     setIsXNext((prev) => !prev);
  //   });
  //
  //   socket.on("error", (errorMessage: string) => {
  //     setMessage(errorMessage);
  //   });
  //
  //   return () => {
  //     socket.off("roomCreated");
  //     socket.off("playerJoined");
  //     socket.off("moveMade");
  //     socket.off("error");
  //   };
  // }, []);
  // const createRoom = () => {
  //   socket.emit("createRoom");
  // };
  //
  // const joinRoom = (roomId: string) => {
  //   socket.emit("joinRoom", roomId);
  //   setPlayer("O");
  // };
  //
  // const makeMove = (index: number) => {
  //   if (board[index] === null && ((isXNext && player === "X") || (!isXNext && player === "O"))) {
  //     socket.emit("makeMove", { roomId, index, player });
  //   }
  // };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-[37px]">{/*<Timer startSeconds={180} />*/}</div>
      <div className="grid gap-1 grid-cols-[minmax(120px,197px)_minmax(120px,197px)_minmax(120px,197px)] grid-rows-[minmax(120px, 197px)_minmax(120px,197px)_minmax(120px,197px)] justify-center shadow-main w-fit rounded-xl">
        {board.map((state, index) => {
          return (
            <Square
              key={index}
              state={state}
              onClick={() => {}}
            />
          );
        })}
      </div>
      <div className="mt-[43px]">
        <StepPanel
          isCross={true}
          name={"Василий Пупкин"}
        />
      </div>
    </div>
  );
}
