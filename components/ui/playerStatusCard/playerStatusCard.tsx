interface PlayerStatusCardProps {
  status: string;
  size: "small" | "medium";
}

export default function PlayerStatusCard({ status, size }: PlayerStatusCardProps) {
  return (
    <div
      className={`${size === "small" ? "p-1 text-xs" : "px-3 py-1 "} ${status === "Вне игры" ? "text-textDark" : "text-white"} ${status === "Свободен" ? "bg-lightGreen" : status === "Заблокирован" ? "bg-lightRed" : status === "Играет" ? "bg-lightBlue" : "bg-[#EDEDED]"} rounded-[10px]`}
    >
      {status}
    </div>
  );
}
