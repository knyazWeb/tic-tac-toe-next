"use client";

import Image from "next/image";

interface SecondaryButtonProps {
  size: "small" | "medium";
  type: "submit" | "button" | "reset";
  children: React.ReactNode;
  blockIcon?: any;
  active?: boolean;

  onClick?: () => void;
}

export default function SecondaryButton({ size, children, active, type, blockIcon, onClick }: SecondaryButtonProps) {
  return (
    <button
      disabled={!active}
      type={type}
      onClick={onClick}
      className={`w-full bg-[#F7F7F7] rounded-[12px] text-textDark ${!active ? "opacity-50" : ""} ${size === "small" ? "py-2 px-4 text-sm" : "py-3 px-5 text-base"}  hover:bg-[#DCDCDF] transition-all duration-200 ease-in-out`}
    >
      {blockIcon && (
        <Image
          src={blockIcon}
          className="mr-2"
          alt=""
        />
      )}
      {children}
    </button>
  );
}
