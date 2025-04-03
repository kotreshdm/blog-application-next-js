import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error("Missing email or password");
          throw new Error("Email and password are required");
        }

        await dbConnect();

        const user = await User.findOne({ email: credentials.email });
        console.log("User found in DB:", user ? user.email : "No user found");

        if (!user) {
          console.error("User not found");
          throw new Error("Invalid email or password");
        }

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        console.log("Password Match:", isMatch);

        if (!isMatch) {
          console.error("Invalid password");
          throw new Error("Invalid email or password");
        }

        console.log("Login successful for:", user.email);

        return {
          id: user._id.toString(), // Ensure it's a string
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("JWT callback - User authenticated:", user.email);
        token.id = "userid"; // ✅ Store user ID in token
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback - User session:", token.email);
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        // session.user.image = token.image;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
    verifyRequest: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
