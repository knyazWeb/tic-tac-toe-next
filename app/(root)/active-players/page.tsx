import ActivePlayerPanel from "@/components/activePlayerPanel/activePlayerPanel";

export default async function Page() {
  return (
    <section className="flex justify-center items-center h-[calc(100vh-64px)]">
      <ActivePlayerPanel />
    </section>
  );
}
