import AllPlayersPanel from "@/components/allPlayersPanel/allPlayersPanel";

import { auth } from "@/auth";

export default async function PlayersListPage() {
  const session = await auth();
  return (
    <div className="flex justify-center items-center h-[calc(100vh-64px)]">
      <AllPlayersPanel session={session} />
    </div>
  );
}
