"use client";

import Square from "@/components/ui/square/square";
import { useEffect, useState } from "react";
import StepPanel from "@/components/stepPanel/stepPanel";
import Timer from "@/components/timer/timer";
import calculateWinner from "@/helpers/calculateWinner";
import CustomModal from "@/components/customModal/customModal";
import { useRouter } from "next/navigation";

export default function GameField() {
  const [squareStates, setSquareStates] = useState(Array(9).fill(null));
  const [isGameStopped, setIsGameStopped] = useState(false);
  const [isCrossNext, setIsCrossNext] = useState(true);
  const [winState, setWinState] = useState(null);
  const [timerState, setTimerState] = useState(false);
  const router = useRouter();

  

  const resetGame = () => {
    setTimerState(true);
    setSquareStates(Array(9).fill(null));
    setIsGameStopped(false);
    setIsCrossNext(true);
    setWinState(null);
    setTimeout(() => {
      setTimerState(false);
    }, 0);
  };

  useEffect(() => {
    let redirectTimeout: NodeJS.Timeout;
    if (winState) {
      redirectTimeout = setTimeout(() => {
        setWinState(null);
        router.push("/");
      }, 3000);
    }

    return () => {
      clearTimeout(redirectTimeout);
    };
  }, [winState]);

  useEffect(() => {
    if (isGameStopped && winState === null) {
      setWinState("Ничья");
    }
  }, [isGameStopped]);
  
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="mb-[37px] mobile:mb-[15px]">
          {
            <Timer
              timerState={timerState}
              startSeconds={120}
              isStopped={isGameStopped}
              stopGame={() => {
                 setIsGameStopped(true);
              }}
            />
          }
        </div>
        <div className="hidden mobile:block mobile:mb-6">
          <StepPanel
            isStopped={isGameStopped}
            isCross={isCrossNext}
            name={isCrossNext ? "Игрок 1" : "Игрок 2"}
          />
        </div>
        <div className="grid gap-1 grid-cols-[minmax(100px,197px)_minmax(100px,197px)_minmax(100px,197px)] grid-rows-[minmax(100px, 197px)_minmax(100px,197px)_minmax(100px,197px)] justify-center shadow-main w-fit rounded-xl ">
          {squareStates.map((state, index) => {
            const winInfo = calculateWinner(squareStates);
            const isWinningSquare = winInfo ? winInfo.line.includes(index) : false;
            return (
              <Square
                key={index}
                state={state}
                isWinning={isWinningSquare}
                onClick={() => {
                  if (state || isGameStopped) return;
                  const newSquareStates = [...squareStates];
                  newSquareStates[index] = isCrossNext ? "cross" : "zero";
                  const winner = calculateWinner(newSquareStates)?.winner;
                  if (winner) {
                    setIsGameStopped(true);
                    if (winner === "cross") {
                      setWinState("Игрок 1");
                    } else if (winner === "zero") {
                      setWinState("Игрок 2");
                    }
                  } else if (!newSquareStates.includes(null)) {
                    setIsGameStopped(true);
                    setWinState("Ничья");
                  }
                  setSquareStates(newSquareStates);
                  setIsCrossNext(!isCrossNext);
                }}
              />
            );
          })}
        </div>
        <div className="mt-[43px] mobile:hidden">
          <StepPanel
            isStopped={isGameStopped}
            isCross={isCrossNext}
            name={isCrossNext ? "Игрок 1" : "Игрок 2"}
          />
        </div>
      </div>
      <CustomModal
        title={winState === "Ничья" ? "Ничья" : `${winState} победил`}
        resetGame={resetGame}
        isOpen={!!winState}
        setIsOpen={setWinState}
      />
    </>
  );
}
