import { OnlinePlayProvider } from "@/contexts/onlinePlayContext";
import PlayersPanel from "@/components/playersPanel/playersPanel";
import Chat from "@/components/chat/chat";
import OnlineGameField from "@/components/onlineGameField/onlineGameField";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <section className="flex justify-between  gap-3 items-start mt-[37px] px-10 mobile:flex-col mobile:items-center mobile:justify-start mobile:mt-[15px] wideScreen:flex-col wideScreen:items-center wideScreen:justify-start wideScreen:mt-[15px]">
      <OnlinePlayProvider value={true}>
        <PlayersPanel />
        <OnlineGameField />
        <Chat />
      </OnlinePlayProvider>
    </section>
  );
}
