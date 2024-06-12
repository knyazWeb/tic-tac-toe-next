import GameField from "@/components/gameField/gameField";
import PlayersPanel from "@/components/playersPanel/playersPanel";

export default function GameFieldPage() {
  return (
    <section className="flex justify-between items-start mt-[37px] px-10">
      <PlayersPanel />
      <GameField />
    </section>
  );
}
