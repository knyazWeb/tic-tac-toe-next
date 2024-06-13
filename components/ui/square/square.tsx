"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Cross from "/public/cross.svg";
import Zero from "/public/zero.svg";

interface SquareProps {
  state?: string;
  isWinning?: boolean;
  onClick?: () => void;
}

export default function Square({ state, onClick, isWinning }: SquareProps) {
  const squareRef = useRef(null);
  const [height, setHeight] = useState("197px");

  useEffect(() => {
    const updateHeight = () => {
      if (squareRef.current) {
        const width = squareRef.current.offsetWidth;
        setHeight(`${width}px`);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);
  return (
    <div
      ref={squareRef}
      style={{ height }}
      onClick={onClick}
      className={`max-w-[197px] ${isWinning ? (state === "cross" ? "bg-[#CFEDE6]" : "bg-pink") : "bg-white hover:bg-[#f7f7f7]"} w-full rounded-xl  transition-all duration-200 ease-in-out ${state === "cross" ? "cursor-default" : state === "zero" ? "cursor-default" : "cursor-pointer"} flex justify-center items-center`}
    >
      {state === "cross" ? (
        <div>
          <Image
            src={Cross}
            alt=""
          />
        </div>
      ) : state === "zero" ? (
        <div>
          <Image
            src={Zero}
            alt=""
          />
        </div>
      ) : null}
    </div>
  );
}
