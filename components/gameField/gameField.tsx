"use client";

import Square from "@/components/ui/square/square";
import { useEffect, useState } from "react";
import calculateWinner from "@/helpers/calculateWinner";

export default function GameField() {
  const [squareStates, setSquareStates] = useState(Array(9).fill(null));
  const [isCrossNext, setIsCrossNext] = useState(true);
  useEffect(() => {
    const winner = calculateWinner(squareStates);
    if (winner) {
      setTimeout(() => {
        alert(`${winner} wins!`);
        setSquareStates(Array(9).fill(null));
      }, 100);
    }
  }, [squareStates, isCrossNext]);
  return (
    <div className="grid gap-1 grid-cols-[minmax(120px,197px)_minmax(120px,197px)_minmax(120px,197px)] grid-rows-[minmax(120px, 197px)_minmax(120px,197px)_minmax(120px,197px)] justify-center shadow-main w-fit rounded-xl">
      {squareStates.map((state, index) => {
        return (
          <Square
            key={index}
            state={state}
            onClick={() => {
              if (state) return;
              const newSquareStates = [...squareStates];
              newSquareStates[index] = isCrossNext ? "cross" : "zero";
              setSquareStates(newSquareStates);
              setIsCrossNext(!isCrossNext);
            }}
          />
        );
      })}
    </div>
  );
}
