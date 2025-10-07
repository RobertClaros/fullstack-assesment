import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name?: string | null;
      roles: string[];
    };
  }

  interface User {
    id: string;
    name?: string | null;
    roles: string[];
    accessToken?: string;
  }

  interface JWT {
    accessToken?: string;
    roles?: string[];
  }
}
