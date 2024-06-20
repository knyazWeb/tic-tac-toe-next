export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className="flex justify-center items-center w-full h-[calc(100vh-64px)]">{children}</section>;
}
