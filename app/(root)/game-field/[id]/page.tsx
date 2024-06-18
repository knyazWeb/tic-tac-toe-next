import { OnlinePlayProvider } from "@/contexts/onlinePlayContext";
import PlayersPanel from "@/components/playersPanel/playersPanel";
import Chat from "@/components/chat/chat";
import OnlineGameField from "@/components/onlineGameField/onlineGameField";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <section className="flex justify-between  gap-3 items-start mt-[37px] px-10 ">
      <OnlinePlayProvider value={true}>
        <PlayersPanel />
        <OnlineGameField />
        <Chat />
      </OnlinePlayProvider>
    </section>
  );
}
