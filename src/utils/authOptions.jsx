import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import bcrypt from "bcrypt";
import dbConnect from "@/utils/dbConnect";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // }),
    CredentialsProvider({
      async authorize(credentials, req) {
        dbConnect();

        const { email, password } = credentials;
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Invalid email or password");
        }
        // if the user has not password
        if (!user?.password) {
          throw new Error("Please login via the method you used to signup");
        }

        const isPasswordMatched = await bcrypt.compare(
          password,
          user?.password
        );

        if (!isPasswordMatched) {
          throw new Error("Invalid email or password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      dbConnect();

      const { email } = user;
      // try to find a user with the provided email
      const dbUser = await User.findOne({ email });
      // if the user does not exist, create one
      if (!dbUser) {
        await User.create({
          email,
          name: user?.name,
          image: user?.image,
        });
      }
      return true;
    },

    jwt: async ({ token, user }) => {
      const userByEmail = await User.findOne({ email: token.email });
      userByEmail.password = undefined;
      userByEmail.resetCode = undefined;
      token.user = userByEmail;
      return token;
    },
    session: async ({ session, token }) => {
      jwt: true;
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/login",
    newUser: "/dashboard/category",
    verifyRequest: "/login",
    newSession: "/login",
    magicLink: "/login",
    callback: "/login",
    notFound: "/login",
    accessDenied: "/login",
    expired: "/login",
    newSession: "/login",
    session: {
      strategy: "jwt",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
  },
};
