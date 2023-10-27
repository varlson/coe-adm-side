// types/next-auth.d.ts

import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      // Aqui você define os campos do objeto "user" retornado por getSession
      user: {
        id: string;
        name: string;
        email: string;
        access_token: strng;
      };
      // ... outros campos
    };
  }
}
