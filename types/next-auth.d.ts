import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // ✅ Add ID to the session user type
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string; // ✅ Ensure User has an ID
  }
}
