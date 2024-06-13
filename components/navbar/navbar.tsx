"use client";
import CustomLink from "@/components/ui/customLink/customLink";
import { usePathname } from "next/navigation";
import { navbarList } from "@/components/navbar/navbarList";
import Image from "next/image";
import Logo from "/public/logo.svg";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className="max-w-[1920px] w-full flex justify-between items-center h-[64px] bg-white rounded-b-2xl shadow-main py-4 px-10">
      <div>
        <Image
          src={Logo}
          priority={true}
          alt=""
          quality={100}
        />
      </div>
      <ul className="flex gap-4">
        {navbarList.map((item, index) => (
          <li key={index}>
            <CustomLink
              active={pathname === "/game-field" && item.path === "/" ? true : pathname === item.path ? true : false}
              href={item.path}
            >
              {item.title}
            </CustomLink>
          </li>
        ))}
      </ul>
      <div>
        <LogOut
          onClick={async () => {
            await signOut();
          }}
          size={32}
          color={"#373745"}
          className={"cursor-pointer hover:stroke-accentDark transition-all duration-200 ease-in-out"}
        />
      </div>
    </nav>
  );
}
