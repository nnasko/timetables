import { login } from "@/lib/auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from '@prisma/client';

const handler = NextAuth({
    providers: [
      CredentialsProvider({
        name: "Credentials",
  
        credentials: {
          username: {
            label: "Username",
            type: "text",
            placeholder: "Username",
          },
          password: { label: "Password", type: "password" },
        },
  
        async authorize(credentials, req) {
          if (!credentials?.username || !credentials?.password) return null;
          const prisma = new PrismaClient();
          try {
          await prisma.$connect()

          const user = await prisma.user.findFirst({
            where: {
              name: credentials.username,
              password: credentials.password,
            },
          });
    
            return user;
          } catch (e) {
            console.error(e);
            return null;
          }
        },
      }),
    ],
    pages: {
      signIn: "/login",
    },
  });
  
  export { handler as GET, handler as POST };