"use client";
import { useEffect, useState } from "react";
import Timer from "@/components/timer/timer";
import calculateWinner from "@/helpers/calculateWinner";
import Square from "@/components/ui/square/square";
import StepPanel from "@/components/stepPanel/stepPanel";
import CustomModal from "@/components/customModal/customModal";
import { useSocket } from "@/socket";
import { useRouter } from "next/navigation";

export default function OnlineGameField() {
  const { socket, room, roomId, players } = useSocket();
  const router = useRouter();
  const [board, setBoard] = useState(room?.board);
  const [turn, setTurn] = useState(room?.turn);
  const [winState, setWinState] = useState(null);
  const [timerState, setTimerState] = useState(room?.timer);

  useEffect(() => {
    if (winState) {
      setTimeout(() => {
        setWinState(null);
        router.push("/active-players");
      }, 10000);
    }
  }, [winState]);

  useEffect(() => {
    socket.on("game_updated", (roomId, room) => {
      setBoard(room.board);
      setTurn(room.turn);
      setTimerState(room.timer);
    });

    socket.on("game_over", (winner) => {
      setWinState(winner);
    });
  }, [socket]);
  const makeMove = (step) => {
    if (board[step]) return;
    socket.emit("make_move", roomId, step);
  };
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="mb-[37px]">
          {
            <Timer
              timerState={false}
              startSeconds={timerState}
              isStopped={winState}
              stopGame={() => {
                console.log("stopGame");
              }}
            />
          }
        </div>
        <div className="grid gap-1 grid-cols-[minmax(120px,197px)_minmax(120px,197px)_minmax(120px,197px)] grid-rows-[minmax(120px, 197px)_minmax(120px,197px)_minmax(120px,197px)] justify-center shadow-main w-fit rounded-xl">
          {board?.map((state, index) => {
            const winInfo = calculateWinner(board);
            const isWinningSquare = winInfo ? winInfo.line.includes(index) : false;

            return (
              <Square
                key={index}
                state={state === room.players[0] ? "cross" : state === room.players[1] ? "zero" : null}
                isWinning={isWinningSquare}
                onClick={() => {
                  makeMove(index);
                }}
              />
            );
          })}
        </div>
        <div className="mt-[43px]">
          <StepPanel
            isStopped={!!winState}
            isCross={turn === room.players[0]}
            name={turn === room.players[0] ? players[0] : players[1]}
          />
        </div>
      </div>
      <CustomModal
        title={winState === "Ничья" ? "Ничья" : `${winState} победил!`}
        resetGame={() => {
          router.push("/active-players");
        }}
        online={true}
        isOpen={!!winState}
        setIsOpen={setWinState}
      />
    </>
  );
}
