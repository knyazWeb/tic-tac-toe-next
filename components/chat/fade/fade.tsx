interface FadeProps {
  position: "top" | "bottom";
}

export default function Fade({ position }: FadeProps) {
  return (
    <div
      className={`absolute -z-10 w-full bg-gradient-to-b from-white/0 to-[#F6F6F6]/100 ${position === "top" ? "h-[100px] left-0 top-0" : "h-[32px] left-0 -top-[32px]"} `}
    ></div>
  );
}
