import ActivePlayerPanel from "@/components/activePlayerPanel/activePlayerPanel";
import { auth } from "@/auth";

export const revalidate = 0;

export default async function Page() {
  const session = await auth();
  return (
    <section className="flex justify-center items-center h-[calc(100vh-64px)]">
      <ActivePlayerPanel session={session} />
    </section>
  );
}
