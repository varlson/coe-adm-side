import { signIn } from "next-auth/react";
import { Login } from "@/app/util/api";
import NextAuth, { SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@/app/util/apiConsumption";

type screProps = {
  credentials: {
    email: string;
    password: string;
  };
};

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials: screProps, req: any) {
        const resp = await login({
          username: credentials.email,
          password: credentials.password,
        });

        if (resp.success) {
          const user = {
            email: resp.user.username,
            id: resp.user.id,
            access_token: resp.user.accessToken,
          };
          return {
            user,
          };
        }

        throw new Error(resp.msg || "Erro desconhecido de autenticação");
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 2 * 60 * 60,
  },
  pages: {
    error: "/login",
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token as any;
      return session;
    },
    async signIn(user, account, profile) {
      // Personalize as ações que deseja realizar ao efetuar o login
      return true;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
