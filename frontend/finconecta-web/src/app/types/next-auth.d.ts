// src/types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name?: string | null;
      roles?: string[];
    };
  }

  interface JWT {
    accessToken?: string;
    roles?: string[];
  }
}
