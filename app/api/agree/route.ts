import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function POST(request: Request) {
  const session = await getSession();
  session.policiesAgreed = true;
  await session.save();
  return NextResponse.redirect(new URL("/enter", request.url), 303);
}
