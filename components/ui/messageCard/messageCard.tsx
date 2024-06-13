interface MessageCardProps {
  isCross: boolean;
  time: string;
  name: string;
  message: string;
}

export default function MessageCard({ isCross, time, name, message }: MessageCardProps) {
  return (
    <div
      className={`flex flex-col gap-2 shadow-main bg-white p-3 w-full max-w-[350px] ${isCross ? "rounded-r-2xl rounded-tl-2xl self-start" : "rounded-l-2xl rounded-tr-2xl self-end"}`}
    >
      <div className="text-sm flex justify-between">
        <span className={`font-medium ${isCross ? "text-accent" : "text-[#E38BAC]"}`}>{name}</span>
        <span className="text-[#898993]">{time}</span>
      </div>
      <div>{message}</div>
    </div>
  );
}
