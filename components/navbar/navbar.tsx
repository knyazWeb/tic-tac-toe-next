"use client";
import CustomLink from "@/components/ui/customLink/customLink";
import { usePathname } from "next/navigation";
import { navbarList } from "@/components/navbar/navbarList";
import Image from "next/image";
import Logo from "/public/logo.svg";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState(false);

  return (
    <nav
      className={`max-w-[1920px] w-full flex justify-between items-center h-[64px] bg-white rounded-b-2xl shadow-main py-4 px-10  tablet:fixed tablet:top-0 ${activeMenu ? "tablet:h-[350px] tablet:grid tablet:grid-cols-[auto_auto] tablet:grid-rows-[auto_1fr] tablet:justify-between tablet:items-center" : ""}`}
    >
      <div>
        <Image
          src={Logo}
          priority={true}
          alt=""
          quality={100}
        />
      </div>
      <ul
        className={`flex gap-4 ${activeMenu ? "tablet:flex" : "tablet:hidden"} tablet:order-3 tablet:self-start tablet:mt-10 tablet:flex-col tablet:gap-3`}
      >
        {navbarList.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              setActiveMenu(false);
            }}
          >
            <CustomLink
              active={pathname === "/game-field" && item.path === "/" ? true : pathname === item.path ? true : false}
              href={item.path}
            >
              {item.title}
            </CustomLink>
          </li>
        ))}
        <li className="hidden tablet:block tablet:flex tablet:items-center tablet:pl-3 tablet:font-medium tablet:gap-2 tablet:cursor-pointer tablet:hover:text-accent tablet:transition-all tablet:duration-200 tablet:ease-in-out">
          Выйти
          <LogOut
            onClick={async () => {
              await signOut();
            }}
            size={20}
          />
        </li>
      </ul>
      <div className="tablet:hidden">
        <LogOut
          onClick={async () => {
            await signOut();
          }}
          size={32}
          color={"#373745"}
          className={"cursor-pointer hover:stroke-accentDark transition-all duration-200 ease-in-out"}
        />
      </div>
      <div className="hidden tablet:block">
        {activeMenu ? (
          <X
            className="cursor-pointer hover:stroke-accentDark transition-all duration-200 ease-in-out"
            onClick={() => {
              setActiveMenu(!activeMenu);
            }}
            size={32}
            color={"#373745"}
          />
        ) : (
          <Menu
            className="cursor-pointer hover:stroke-accentDark transition-all duration-200 ease-in-out"
            onClick={() => {
              setActiveMenu(!activeMenu);
            }}
            size={32}
            color={"#373745"}
          />
        )}
      </div>
    </nav>
  );
}
