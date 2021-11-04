import NextAuth, { Session } from "next-auth";
import Providers from "next-auth/providers";

import { verify } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";
const { user } = prisma;

// ! the handler function is exported when NextAuth is invoked
export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials: any) {
        const resUser = await user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!resUser) throw new Error("Invalid credentials");
        var passwordIsValid = await verify(
          credentials.password,
          resUser.password
        );
        if (!passwordIsValid) throw new Error("Invalid credentials");
        return { ...resUser, password: null };
      },
    }),
  ],
  callbacks: {
    async session(session, user) {
      return { user: user.user } as Session;
    },
    async jwt(token, user) {
      user && (token.user = user);
      return token;
    },
  },
});
