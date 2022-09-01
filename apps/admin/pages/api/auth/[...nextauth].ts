import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "Login Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const baseUrl = process.env.SERVER_URL || "";
          const response = await axios.post(`${baseUrl}/api/v1/auth/token/`, {
            email: credentials?.email,
            password: credentials?.password,
          });
          const data = {
            access: response?.data.access,
          };
          if (response.data) {
            return { data };
          } else {
            return null;
          }
        } catch (error: any) {
          const { response } = error;
          const { ...errorObject } = response;
          const errorMessage = errorObject?.data?.detail;
          throw new Error(errorMessage + " &email=" + credentials?.email);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, data }: any) => {
      data && (token.access = data.access);
      return token;
    },
    session: async ({ session, token }: any) => {
      token && (session.access = token.access); // Setting token in session
      return session;
    },
  },
  pages: {
    signIn: "/login", //Need to define custom login page (if using)
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
