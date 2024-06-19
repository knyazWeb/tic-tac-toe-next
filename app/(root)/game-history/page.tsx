import { auth } from "@/auth";
import HistoryGamePanel from "@/components/historyGamePanel/historyGamePanel";

export default async function GameHistoryPage() {
  const session = await auth();
  return (
    <div className="flex justify-center items-center h-[calc(100vh-64px)] px-2">
      <HistoryGamePanel session={session} />
    </div>
  );
}
