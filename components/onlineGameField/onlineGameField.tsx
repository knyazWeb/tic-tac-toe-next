"use client";
import { useEffect, useState } from "react";
import Timer from "@/components/timer/timer";
import calculateWinner from "@/helpers/calculateWinner";
import Square from "@/components/ui/square/square";
import StepPanel from "@/components/stepPanel/stepPanel";
import CustomModal from "@/components/customModal/customModal";
import { useSocket } from "@/socket/socket";
import { useRouter } from "next/navigation";
import { IRoom } from "@/socket/interfaces";

export default function OnlineGameField() {
  const { socket, room, roomId } = useSocket();
  const router = useRouter();
  const [board, setBoard] = useState(room.board);
  const [turn, setTurn] = useState(room.turn);
  const [winState, setWinState] = useState(null);
  const [timerState, setTimerState] = useState(room.timer - 1);

  const makeMove = (roomId: string, move: number) => {
    if (board[move]) return;
    socket.emit("make_move", roomId, move);
  };

  useEffect(() => {
    let redirectTimeout: NodeJS.Timeout;
    if (winState) {
      redirectTimeout = setTimeout(() => {
        setWinState(null);
        router.push("/active-players");
      }, 10000);
    }

    return () => {
      clearTimeout(redirectTimeout);
    };
  }, [winState]);

  useEffect(() => {
    socket.on("game_updated", (_roomId: string, room: IRoom) => {
      setBoard(room.board);
      setTurn(room.turn);
      setTimerState(room.timer);
    });

    socket.on("game_over", (winnerUsername: string) => {
      setWinState(winnerUsername);
    });

    socket.on("game_draw", (draw: string) => {
      setWinState(draw);
    });

    return () => {
      socket.off("game_updated");
      socket.off("game_over");
      socket.off("game_draw");
      socket.emit("leave_game", roomId);
    };
  }, [socket]);

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
          {board.map((state, index) => {
            const winInfo = calculateWinner(board);
            const isWinningSquare = winInfo ? winInfo.line.includes(index) : false;

            return (
              <Square
                key={index}
                state={state === room.players[0] ? "cross" : state === room.players[1] ? "zero" : null}
                isWinning={isWinningSquare}
                onClick={() => {
                  makeMove(roomId, index);
                }}
              />
            );
          })}
        </div>
        <div className="mt-[43px]">
          <StepPanel
            isStopped={!!winState}
            isCross={turn === room.players[0]}
            name={turn === room.players[0] ? room.players[0] : room.players[1]}
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
