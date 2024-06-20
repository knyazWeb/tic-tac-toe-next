import CrossS from "/public/crossS.svg";
import ZeroS from "/public/zeroS.svg";
import Image from "next/image";

interface StepPanelProps {
  isCross: boolean;
  isStopped: boolean;
  name: string;
}

export default function StepPanel({ isCross, isStopped, name }: StepPanelProps) {
  if (isStopped)
    return (
      <div className="w-full max-w-[400px] bg-textDark text-white flex text-[20px] gap-3 rounded-xl items-center py-3 px-[69px] mobile:text-sm ">
        <span>Игра окончена</span>
      </div>
    );
  return (
    <div className="w-full max-w-[400px] bg-textDark text-white flex text-[20px] gap-3 rounded-xl items-center py-3 px-[69px] mobile:text-sm text-nowrap">
      <span>Ходит</span>
      <div>
        <Image
        className="mobile:w-[17px]"
          width={24}
          src={isCross ? CrossS : ZeroS}
          alt=""
        />
      </div>
      <div> {name}</div>
    </div>
  );
}
