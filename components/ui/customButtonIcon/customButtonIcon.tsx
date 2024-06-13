"use client";

import Image from "next/image";

interface CustomButtonIconProps {
  icon: any;
  onClick?: () => void;
}

export default function CustomButtonIcon({ icon, onClick }: CustomButtonIconProps) {
  return (
    <button
      onClick={onClick}
      className="p-3 bg-accent hover:bg-accentDark ease-in-out duration-200 transition-all"
    >
      <Image
        width={24}
        src={icon}
        alt=""
      />
    </button>
  );
}
