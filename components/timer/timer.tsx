"use client";

import { useEffect, useState } from "react";

interface TimerProps {
  startSeconds: number;
}

export default function Timer({ startSeconds }: TimerProps) {
  const [time, setTime] = useState<number>(startSeconds);
  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return (
    <div className="w-full max-w-[140px] bg-[#EDEDED] p-6 font-black text-[34px] rounded-xl">
      {" "}
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}
