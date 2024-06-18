"use client";
import SwitchToggle from "@/components/ui/switchToggle/switchToggle";

export default function Loader() {
  return (
    <div className="w-full max-w-[780px]  max-h-[855px] overflow-y-scroll scrollbar-hide p-8 bg-white rounded-[40px] shadow-container">
      <div className="flex justify-between items-center mb-6">
        <p className="text-2xl font-bold">Активные игроки</p>
        <div className="flex gap-3 items-center">
          Только свободные
          <SwitchToggle
            enabled={false}
            setEnabled={() => {}}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
}
