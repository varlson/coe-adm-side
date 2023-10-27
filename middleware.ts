import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "./app/api/auth/[...nextauth]/route";

// export async function middleware(request: NextRequest) {
//   console.log("middleware");
//   console.log(request);
// }

export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/slides/:path*",
    "/posts/:path*",
    "/edit/:path*",
    "/users/:path*",
    "/editais/:path*",
    "/my-account/:path*",
  ],
};
