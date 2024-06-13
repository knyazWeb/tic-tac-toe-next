"use client";

import Image from "next/image";

interface CustomButtonIconProps {
  icon: any;
  type: "submit" | "button" | "reset";
  active?: boolean;
  onClick?: () => void;
}

export default function CustomButtonIcon({ icon, type, active, onClick }: CustomButtonIconProps) {
  return (
    <button
      onClick={onClick}
      disabled={!active}
      type={type}
      className={`p-4 bg-accent hover:bg-accentDark ease-in-out duration-200 transition-all rounded-xl ${!active ? "opacity-30" : ""}`}
    >
      <Image
        width={24}
        src={icon}
        alt=""
      />
    </button>
  );
}
