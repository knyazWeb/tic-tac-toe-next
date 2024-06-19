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
    if (time === 0) {
      stopGame();
    }
  }, [time]);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (!isStopped) {
        setTime((prevTime) => {
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
    <div className="w-full max-w-[140px] bg-[#EDEDED] p-6 font-black text-[34px] rounded-xl mobile:h-fit mobile:text-base mobile:py-2 mobile:px-5">
      {" "}
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}
