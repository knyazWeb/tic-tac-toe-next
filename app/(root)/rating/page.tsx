import { auth } from "@/auth";
import RatingPlayersPanel from "@/components/ratingPlayersPanel/ratingPlayersPanel";

export default async function RatingPage() {
  const session = await auth()
  return (
    <div className="flex justify-center items-center h-[calc(100vh-64px)] px-2">
      <RatingPlayersPanel session={session} />
    </div>
  );
}
