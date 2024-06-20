"use server";
import prisma from "@/prisma/prisma";
import { hash } from "bcryptjs";
import { signUpSchema } from "@/lib/zod";
import { signIn } from "@/auth";
import { AuthError, CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";

export async function submitSignupForm(formData: FormData) {
  try {
    const { login, password } = await signUpSchema.parseAsync({
      login: formData.get("login") as string,
      password: formData.get("password") as string,
    });
    const existingUser = await prisma.user.findUnique({
      where: {
        login,
      },
    });
    if (existingUser) {
      throw new Error("Пользователь уже существует");
    }

    const pwHash = await hash(password, 10);
    await prisma.user.create({
      data: {
        login,
        password: pwHash,
      },
    });
  } catch (error) {
    return error.message;
  }
}

export async function submitLoginForm(formData: FormData) {
  const login = formData.get("login");
  const password = formData.get("password");
  try {
    await signIn("credentials", {
      login,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      return error.message;
    } else if (error instanceof AuthError) {
      return error.cause.err.message;
    }
    return "Что-то пошло не так";
  }
  redirect("/");
}

export async function checkAccess(roomId: any, username: string): Promise<boolean> {
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/check-access/${roomId}/${username}`, {
    cache: "no-store",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.access) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      return false;
    });
}

export async function blockUser(name: string, bannedName: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        login: name,
      },
    });

    if (user) {
      const updatedBlockedUsers = [...user.blocked, bannedName];

      await prisma.user.update({
        where: {
          login: name,
        },
        data: {
          blocked: updatedBlockedUsers,
        },
      });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    return error.message;
  }
}

export async function unblockUser(name: string, bannedName: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        login: name,
      },
    });

    if (user) {
      const updatedBlockedUsers = user.blocked.filter((user) => user !== bannedName);

      await prisma.user.update({
        where: {
          login: name,
        },
        data: {
          blocked: updatedBlockedUsers,
        },
      });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    return error.message;
  }
}
