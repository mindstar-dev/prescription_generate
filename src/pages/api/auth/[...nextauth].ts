import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

const loginUserSchema = z.object({
  id: z.string(),
  password: z.string(),
  user_type: z.string(),
});
const prisma = new PrismaClient();
const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        id: { type: "text", placeholder: "user_id" },
        password: { label: "password", type: "password" },
        user_type: { type: "text", placeholder: "a" },
      },
      async authorize(credentials, req) {
        const { id, password, user_type } = loginUserSchema.parse(credentials);

        const user = await prisma.userData.findUnique({ where: { id: id } });

        if (!user) return null;
        console.log(user);
        const isCredentialsCorrect =
          password === user.password && user_type === user.user_type;

        if (!isCredentialsCorrect) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      session.user.id = token.id as string;
      const userA = await prisma.userData.findUnique({
        where: { id: session.user.id },
      });
      session.user.email = userA?.user_type;

      return session;
    },
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
        token.username = user.id;
        console.log(account.session_state);
      }
      return token;
    },
  },

  pages: {
    // signIn: "/welcome-page",
    // signOut: "/basic-unit",
  },
};

export default NextAuth(authOptions);
