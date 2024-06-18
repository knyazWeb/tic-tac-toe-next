import GameField from "@/components/gameField/gameField";
import PlayersPanel from "@/components/playersPanel/playersPanel";
import Chat from "@/components/chat/chat";
import { OnlinePlayProvider } from "@/contexts/onlinePlayContext";

export default function GameFieldPage() {
  return (
    <section className="flex justify-between gap-3 items-start mt-[37px] px-10 ">
      <OnlinePlayProvider value={false}>
        <PlayersPanel />
        <GameField />
        <Chat />
      </OnlinePlayProvider>
    </section>
  );
}
