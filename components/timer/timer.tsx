"use client";

import { useEffect, useState } from "react";

interface TimerProps {
  startSeconds: number;
  isStopped: boolean;
  timerState: boolean;
  stopGame: () => void;
}

export default function Timer({ startSeconds, isStopped, timerState, stopGame }: TimerProps) {
  const [time, setTime] = useState<number>(startSeconds);

  const resetTimer = () => {
    setTime(startSeconds);
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      if (!isStopped) {
        setTime((prevTime) => {
          if (prevTime === 0) {
            stopGame();
            return prevTime;
          }
          return prevTime - 1;
        });
      }
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [isStopped]);

  useEffect(() => {
    if (timerState) {
      resetTimer();
    }
  }, [timerState]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return (
    <div className="w-full max-w-[140px] bg-[#EDEDED] p-6 font-black text-[34px] rounded-xl">
      {" "}
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}
