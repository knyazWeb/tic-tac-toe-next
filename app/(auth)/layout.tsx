export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className="flex justify-center items-center w-full h-screen">{children}</section>;
}
