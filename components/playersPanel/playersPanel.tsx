import PlayerCard from "@/components/ui/playerCard/playerCard";
import CrossS from "/public/crossS.svg";
import ZeroS from "/public/zeroS.svg";

export default function PlayersPanel() {
  return (
    <div className="shadow-container w-fit rounded-[20px] p-6 w-full max-w-[500px]">
      <p className="mb-6 font-bold text-2xl">Игроки</p>
      <div className="flex flex-col gap-5">
        {/*TODO: заменить placehodler на данные */}
        <PlayerCard
          image={ZeroS}
          name={"placeholder placeholder placeholder"}
          winrate={63}
        />
        <PlayerCard
          image={CrossS}
          name={"placeholder2 placeholder2 placeholder2"}
          winrate={72}
        />
      </div>
    </div>
  );
}
