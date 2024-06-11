"use client";

interface CustomButtonProps {
  size: "small" | "medium";
  type: "submit" | "button" | "reset";
  children: React.ReactNode;
  active?: boolean;
}

export default function CustomButton({ size, children, active, type }: CustomButtonProps) {
  return (
    <button
      disabled={!active}
      type={type}
      className={`w-full bg-accent rounded-[12px] text-white ${!active ? "opacity-30" : ""} ${size === "small" ? "py-2 px-4 text-sm" : "py-3 px-5 text-base"} `}
    >
      {children}
    </button>
  );
}
