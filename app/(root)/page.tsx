"use client";
import CustomButton from "@/components/ui/customButton/customButton";
import { useRouter } from "next/navigation";

export default function GameFieldPage() {
  const router = useRouter();
  return (
    <section className="flex justify-center items-center h-[calc(100vh-64px)]">
      <div className="max-w-[500px] flex flex-col gap-7">
        <CustomButton
          onClick={() => {
            router.push("/game-field");
          }}
          active={true}
          size="medium"
          type="button"
        >
          <span className="text-xl mobile:text-lg">
            Начать <span className="font-bold">одиночную</span> игру
          </span>
        </CustomButton>
        <CustomButton
          onClick={() => {
            router.push("/active-players");
          }}
          active={true}
          size="medium"
          type="button"
        >
          <span className="text-xl mobile:text-lg">
            Начать <span className="font-bold">онлайн</span> игру
          </span>
        </CustomButton>
      </div>
    </section>
  );
}
