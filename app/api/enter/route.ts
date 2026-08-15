import { NextResponse } from "next/server";
import { getSession, isAtLeast18, isValidEmail } from "@/lib/session";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session.policiesAgreed) {
    return NextResponse.json(
      { error: "Read the Policies and click Agree before the form will open." },
      { status: 403 },
    );
  }

  const body = (await request.json().catch(() => null)) as {
    fullName?: string;
    email?: string;
    dateOfBirth?: string;
    agree?: boolean;
  } | null;

  const fullName = body?.fullName?.trim() ?? "";
  const email = body?.email?.trim() ?? "";
  const dateOfBirth = body?.dateOfBirth ?? "";

  if (fullName.length < 2) {
    return NextResponse.json(
      { error: "A full name is required." },
      { status: 400 },
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "A valid email is required." },
      { status: 400 },
    );
  }
  if (!isAtLeast18(dateOfBirth)) {
    return NextResponse.json(
      { error: "You must be 18 or older to enter." },
      { status: 400 },
    );
  }
  if (!body?.agree) {
    return NextResponse.json(
      { error: "Please confirm that you agree to the Policies." },
      { status: 400 },
    );
  }

  session.fullName = fullName;
  session.email = email;
  session.dateOfBirth = dateOfBirth;
  session.admitted = true;
  await session.save();

  return NextResponse.json({ ok: true });
}
