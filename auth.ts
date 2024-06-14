import NextAuth, { CredentialsSignin, User } from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import prisma from "@/prisma/prisma";
import { loginSchema } from "@/lib/zod";
import { compare } from "bcrypt-ts";
import { ZodError } from "zod";

interface UserData extends User {
  login: string;
}

async function getUser(login: string) {
  const user = await prisma.user.findUnique({
    where: {
      login: login,
    },
  });
  return user;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      credentials: {
        login: { label: "Login", type: "login" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          let user = null;
          const { login, password } = await loginSchema.parseAsync(credentials);

          user = await getUser(login as string);
          if (!user) {
            throw new CredentialsSignin("No user found with that login");
          }
          const valid = await compare(password, user.password);
          if (!valid) {
            throw new CredentialsSignin("Password is incorrect");
          }
          return user as User;
        } catch (error) {
          if (error instanceof ZodError) {
            throw new CredentialsSignin(error.errors[0].message);
          }
          throw error;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = (user as UserData).login;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/",
  },
});
