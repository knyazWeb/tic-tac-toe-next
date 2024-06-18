"use client";

import { blockUser, unblockUser } from "@/lib/actions";

interface SecondaryButtonProps {
  size: "small" | "medium";
  type: "submit" | "button" | "reset";
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export default function SecondaryButton({
  size,
  children,
  active,
  type,

  onClick,
}: SecondaryButtonProps) {
  return (
    <button
      disabled={!active}
      type={type}
      onClick={onClick}
      className={`w-full bg-[#F7F7F7] rounded-[12px] text-textDark font-medium ${!active ? "opacity-50" : ""} ${size === "small" ? "py-2 px-4 text-sm" : "py-3 px-5 text-base"} flex justify-center items-center gap-2  hover:bg-[#DCDCDF] transition-all duration-200 ease-in-out`}
    >
      {children}
    </button>
  );
}
