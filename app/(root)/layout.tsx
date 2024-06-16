import Navbar from "@/components/navbar/navbar";
import { SocketProvider } from "@/socket/socket";
import { auth } from "@/auth";
import { OnlineUsersProvider } from "@/contexts/onlineUsersContext";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <OnlineUsersProvider>
      <SocketProvider session={session}>
        <Navbar />
        <main>{children}</main>
      </SocketProvider>
    </OnlineUsersProvider>
  );
}
