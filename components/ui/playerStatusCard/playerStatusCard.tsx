interface PlayerStatusCardProps {
  status: string;
  size: "small" | "medium";
}

export default function PlayerStatusCard({ status, size }: PlayerStatusCardProps) {
  return (
    <div
      className={`${size === "small" ? "p-1 text-xs" : "px-3 py-1 "} ${status === "Вне игры" ? "text-textDark" : "text-white"} ${status === "Свободен" || status === "Активен" ? "bg-lightGreen" : status === "Заблокирован" ? "bg-lightRed" : status === "В игре" ? "bg-lightBlue" : "bg-[#EDEDED]"} text-center rounded-[10px]`}
    >
      {status}
    </div>
  );
}
