import { NextResponse } from "next/server";
import { getSession, isValidEmail } from "@/lib/session";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session.admitted) {
    return NextResponse.json({ error: "The gate is still closed." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    name?: string;
    email?: string;
    message?: string;
  } | null;

  const name = body?.name?.trim() ?? "";
  const email = body?.email?.trim() ?? "";
  const message = body?.message?.trim() ?? "";

  if (name.length < 2 || !isValidEmail(email) || message.length < 8) {
    return NextResponse.json(
      { error: "Name, email, and a short message are required." },
      { status: 400 },
    );
  }

  return NextResponse.json({ ok: true });
}
