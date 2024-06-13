import Link from "next/link";

export default function CustomLink({
  active,
  href,
  children,
  ...props
}: {
  active: boolean;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      className={`text-base font-medium leading-6 px-3 py-1 rounded-full ${active ? "bg-accent text-white" : "text-textDark bg-transparent hover:bg-[#EAEAEA] transition-all duration-200 ease-in-out"}`}
      {...props}
      href={href}
    >
      {children}
    </Link>
  );
}
