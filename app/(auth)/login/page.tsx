import Image from "next/image";
import dogPng from "/public/dog.png";
import LoginForm from "@/components/forms/loginForm/loginForm";
import Link from "next/link";

export default function Login() {
  return (
    <div className="w-full max-w-[400px] h-fit flex flex-col items-center bg-white rounded-[16px] px-6 py-10 mobile:mx-3">
      <Image
        className="mb-5"
        quality={100}
        width={132}
        height={132}
        priority={true}
        src={dogPng}
        alt=""
      />
      <p className="font-bold text-2xl text-cente mb-5 mobile:text-xl">Войдите в игру</p>
      <LoginForm />
      <p className="mt-3 text-sm">
        Нет аккаунта?{" "}
        <Link
          className="text-accent font-bold hover:text-accentDark transition-colors duration-200 ease-in-out"
          href="/signup"
        >
          Зарегистрируйтесь
        </Link>
      </p>
    </div>
  );
}
