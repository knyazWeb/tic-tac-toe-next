"use client";
import SwitchToggle from "@/components/ui/switchToggle/switchToggle";

export default function Loader() {
  return (
    <div className="w-full max-w-[780px] max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-hide p-8 bg-white rounded-[40px] shadow-container mobile:p-4 ">
      <div className="flex justify-between items-center mb-6 mobile:flex-col mobile:gap-4 mobile:overflow-x-auto mobile:min-w-[300px]  scrollbar-hide">
        <p className="text-2xl font-bold mobile:text-xl mobile:self-start">Активные игроки</p>
        <div className="flex gap-3 items-center mobile:text-sm mobile:self-end mr-1">
          Только свободные
          <SwitchToggle
            enabled={false}
            setEnabled={() => {}}
          />
        </div>
      </div>
      <div className="text-center mt-10">Загрузка...</div>
    </div>
  );
}
