import NextAuth from "next-auth";
import Providers from "next-auth/providers";

// relative
import { signin } from "../../../backend-utils/user-utils";

// ! the handler function is exported when NextAuth is invoked
export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials: any) {
        const res = await signin(credentials.email, credentials.password);
        const data = await res.json();
        if (res.ok && data.user) return data.user;
        throw new Error(data.message);
      },
    }),
  ],
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      console.log(user);

      return token;
    },
  },
});
