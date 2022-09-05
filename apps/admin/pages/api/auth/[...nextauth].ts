import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Login Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";
          const response = await axios.post(`${baseUrl}/api/v1/auth/token/`, {
            email: credentials?.email,
            password: credentials?.password,
          });
          const data = {
            access: response?.data.access,
          };
          if (response.data) {
            return {
              ...data,
              email: credentials?.email,
              name: null,
              image: null,
            };
          } else {
            return null;
          }
        } catch (error: any) {
          const { response } = error;
          const { ...errorObject } = response;
          const errorMessage = errorObject?.data?.detail;
          throw new Error(errorMessage);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.access = user.access;
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.access = token.access;
        delete session.expires;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", //Need to define custom login page (if using)
    error: "/login",
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
};

export default NextAuth(authOptions);
