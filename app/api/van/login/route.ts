import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

const USER = "van";
const PASS = "1";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    username?: string;
    password?: string;
  } | null;
  const username = body?.username?.trim().toLowerCase() ?? "";
  const password = body?.password ?? "";
  if (username !== USER || password !== PASS) {
    return NextResponse.json({ error: "Wrong username or password." }, { status: 401 });
  }

  const session = await getSession();
  session.studio = true;
  session.admitted = true;
  session.policiesAgreed = true;
  await session.save();
  return NextResponse.json({ ok: true });
}
