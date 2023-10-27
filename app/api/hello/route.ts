import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session) {
    return NextResponse.json({
      msg: "You need to be authentocated first",
    });
  }
  return NextResponse.json({
    msg: "Hello world",
    token: session.user.user.access_token,
  });
}
