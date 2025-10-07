import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      roles: string[];
      accessToken: string;
    } & DefaultSession["user"];
    accessToken: string;
  }
  interface User {
    id: string;
    name: string;
    roles: string[];
    accessToken: string;
  }
}
